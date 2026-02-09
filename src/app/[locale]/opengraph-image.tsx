import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'IPTV Suisse - Meilleur Service IPTV en Suisse';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const isFr = locale === 'fr';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}
      >
        {/* Red accent bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#E31937',
          }}
        />

        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: '#E31937',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              +
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: 48, fontWeight: 900, color: '#111827' }}>IPTV</span>
            <span style={{ fontSize: 48, fontWeight: 900, color: '#E31937' }}>SUISSE</span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: '#111827',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          {isFr
            ? 'Meilleur Service IPTV en Suisse'
            : 'Bester IPTV-Service in der Schweiz'}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 800,
            marginBottom: 32,
          }}
        >
          {isFr
            ? '+15\'000 chaînes HD/4K • 40\'000+ films • Replay & VOD • Support 24/7'
            : '+15\'000 HD/4K-Kanäle • 40\'000+ Filme • Replay & VOD • 24/7 Support'}
        </div>

        {/* Price badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#E31937',
            color: 'white',
            padding: '12px 32px',
            borderRadius: 12,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {isFr ? 'Dès 35.99 CHF' : 'Ab 35.99 CHF'}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            fontSize: 16,
            color: '#9ca3af',
          }}
        >
          iptvsuisse.co
        </div>
      </div>
    ),
    { ...size }
  );
}
