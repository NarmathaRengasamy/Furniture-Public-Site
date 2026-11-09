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
          .sa-widget-bubble { background: #181716 !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; }
          .sa-widget-header { background: #181716 !important; color: #FAF8F5 !important; }
          .sa-msg-user { background: #634F42 !important; color: #FAF8F5 !important; }

          /* 2. Send Button - Deep Charcoal/Bronze */
          .sa-widget-send {
            background: #181716 !important;
            color: #FAF8F5 !important;
          }
          .sa-widget-send svg {
            color: #FAF8F5 !important;
            stroke: #FAF8F5 !important;
            fill: none !important;
          }

          /* 3. Input Area Highlighting */
          .sa-widget-input-area:focus-within {
            border-color: #634F42 !important;
            box-shadow: 0 0 0 2px rgba(99, 79, 66, 0.2) !important;
          }

          /* 4. Active Tour Point Pulse inside Shadow DOM */
          .tour-active-control-pulse {
            outline: 2px solid #634F42 !important;
            box-shadow: 0 0 0 3px rgba(99, 79, 66, 0.25), 0 2px 8px rgba(24, 23, 22, 0.12) !important;
            border-radius: 8px !important;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
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
