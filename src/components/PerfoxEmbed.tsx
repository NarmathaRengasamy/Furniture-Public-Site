import { useEffect } from 'react';

declare global {
  interface Window {
    Perfox?: any;
  }
}

/**
 * Loads the official Perfox AI Assistant widget script onto the public site
 * and automatically injects custom brand styling (Theme colors & input highlights)
 * directly into the widget's Shadow DOM.
 */
export function PerfoxEmbed() {
  useEffect(() => {
    // Apply brand styling directly into Perfox Shadow DOM
    const applyBrandStyles = () => {
      const widget = document.getElementById('perfox-widget');
      if (widget && widget.shadowRoot) {
        let style = widget.shadowRoot.querySelector('#perfox-brand-styles') as HTMLStyleElement | null;
        if (!style) {
          style = document.createElement('style');
          style.id = 'perfox-brand-styles';
          widget.shadowRoot.appendChild(style);
        }

        style.textContent = `
          /* 1. Header, Bubble, and User Message Colors */
          .sa-widget-bubble { background: #B85D43 !important; }
          .sa-widget-header { background: #B85D43 !important; }
          .sa-msg-user { background: #B85D43 !important; color: #ffffff !important; }

          /* 2. Send Button - Terracotta background with white paper airplane icon */
          .sa-widget-send {
            background: #B85D43 !important;
            color: #ffffff !important;
          }
          .sa-widget-send svg {
            color: #ffffff !important;
            stroke: #ffffff !important;
            fill: none !important;
          }

          /* 3. Input Area Highlighting (Border & Glow Ring on Focus) */
          .sa-widget-input-area:focus-within {
            border-color: #B85D43 !important;
            box-shadow: 0 0 0 3px rgba(184, 93, 67, 0.25) !important;
          }
        `;
      }
    };

    const styleInterval = setInterval(applyBrandStyles, 100);
    const observer = new MutationObserver(applyBrandStyles);
    observer.observe(document.body, { childList: true, subtree: true });

    // Load widget script
    const widgetUrl = import.meta.env.VITE_PERFOX_WIDGET_URL;
    const siteKey = import.meta.env.VITE_PERFOX_SITE_KEY;

    if (widgetUrl && siteKey && !document.querySelector('script[data-perfox]')) {
      const w = window;
      if (!w.Perfox) {
        w.Perfox = function (...args: any[]) {
          (w.Perfox.q = w.Perfox.q || []).push(args);
        };
      }

      const s = document.createElement('script');
      s.src = widgetUrl;
      s.dataset.site = siteKey;
      s.defer = true;
      s.dataset.perfox = '1';
      document.body.appendChild(s);
    }

    return () => {
      clearInterval(styleInterval);
      observer.disconnect();
    };
  }, []);

  return null;
}
