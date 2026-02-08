import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';
import { sendPaymentLinkEmail, sendAdminNotification } from '@/lib/resend';

async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return false;
  try {
    const [payloadB64, hmac] = token.split('.');
    const crypto = await import('crypto');
    const payload = Buffer.from(payloadB64, 'base64').toString();
    const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const expectedHmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (hmac !== expectedHmac) return false;
    const data = JSON.parse(payload);
    return data.exp > Date.now();
  } catch {
    return false;
  }
}

// POST — Send payment email to a specific lead
export async function POST(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { leadId } = await request.json();
  if (!leadId) return NextResponse.json({ error: 'Lead ID required' }, { status: 400 });

  const supabase = createServerClient();

  // Get lead details
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (leadError || !lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  if (!lead.payment_link) {
    return NextResponse.json({ error: 'No payment link set for this lead\'s plan' }, { status: 400 });
  }

  // Send payment email
  const result = await sendPaymentLinkEmail({
    customerName: lead.customer_name,
    email: lead.email,
    phone: lead.phone,
    planName: lead.plan_name,
    planPrice: lead.payment_link ? '—' : '—',
    planDuration: 0,
    paymentLink: lead.payment_link,
    locale: lead.locale || 'fr',
    leadId: lead.id,
  });

  if (result.success) {
    // Update lead status
    await supabase
      .from('leads')
      .update({ status: 'email_sent', email_sent_at: new Date().toISOString() })
      .eq('id', leadId);

    return NextResponse.json({ success: true, emailId: result.id });
  } else {
    return NextResponse.json({ error: 'Failed to send email', details: result.error }, { status: 500 });
  }
}
