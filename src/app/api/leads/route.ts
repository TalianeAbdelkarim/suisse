import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendPaymentLinkEmail, sendAdminNotification } from '@/lib/resend';
import { PLANS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, plan_id, plan_name, locale = 'fr' } = body;

    // Validate required fields
    if (!name || !email || !phone || !plan_id || !plan_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get client info
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Find the plan to get price and duration
    const plan = PLANS.find((p) => p.id === plan_id);
    const planPrice = plan ? formatPrice(plan.price) : '0';
    const planDuration = plan?.duration || 0;
    let paymentLink = plan?.payment_link || '';

    let leadId = crypto.randomUUID();

    // ─── Save to Supabase ────────────────────────────────
    try {
      const supabase = createServerClient();

      // Check DB settings for a payment link override
      const { data: settingRow } = await supabase
        .from('settings')
        .select('value')
        .eq('key', `payment_link_${plan_id}`)
        .single();

      if (settingRow?.value) {
        paymentLink = settingRow.value;
      }
      const { data, error } = await supabase
        .from('leads')
        .insert({
          plan_name,
          customer_name: name,
          email,
          phone,
          locale,
          status: 'pending',
          payment_link: paymentLink,
          ip_address: ip,
          user_agent: userAgent,
        })
        .select('id')
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        // Continue even if DB fails — still send email
      } else if (data) {
        leadId = data.id;
      }
    } catch (dbError) {
      console.error('Supabase connection error:', dbError);
      // Continue — don't block the flow
    }

    // ─── Send Emails ─────────────────────────────────────
    const emailData = {
      customerName: name,
      email,
      phone,
      planName: plan_name,
      planPrice,
      planDuration,
      paymentLink,
      locale,
      leadId,
    };

    try {
      // Send payment link email to customer
      const emailResult = await sendPaymentLinkEmail(emailData);

      if (emailResult.success) {
        // Update lead status to email_sent
        try {
          const supabase = createServerClient();
          await supabase
            .from('leads')
            .update({ status: 'email_sent', email_sent_at: new Date().toISOString() })
            .eq('id', leadId);
        } catch {
          // Non-blocking
        }
      }

      // Send admin notification (non-blocking)
      sendAdminNotification(emailData).catch(() => {});
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Lead is saved, email failed — that's okay
    }

    return NextResponse.json(
      { success: true, message: 'Lead captured successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
