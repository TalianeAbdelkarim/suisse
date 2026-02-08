'use client';

import { useEffect } from 'react';

// ─── Crisp Live Chat Widget ─────────────────────────────────
// Sign up at https://crisp.chat and get your Website ID
// Set it in .env.local as NEXT_PUBLIC_CRISP_WEBSITE_ID
// ─────────────────────────────────────────────────────────────

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

export default function CrispChat() {
  useEffect(() => {
    const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    if (!crispId) return;

    // Prevent double-loading
    if (window.$crisp) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = crispId;

    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount (unlikely for layout-level component)
      try {
        document.head.removeChild(script);
      } catch {
        // ignore
      }
    };
  }, []);

  return null; // Crisp injects its own UI
}
