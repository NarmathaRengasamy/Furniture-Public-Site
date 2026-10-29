import { useEffect } from 'react';

declare global {
  interface Window {
    Perfox?: any;
  }
}

/**
 * Loads the official Perfox AI Assistant widget script onto the public site.
 * The widget injects #perfox-widget and its violet floating bubble button into the DOM.
 */
export function PerfoxEmbed() {
  useEffect(() => {
    const widgetUrl = import.meta.env.VITE_PERFOX_WIDGET_URL;
    const siteKey = import.meta.env.VITE_PERFOX_SITE_KEY;

    if (!widgetUrl || !siteKey) return;
    if (document.querySelector('script[data-perfox]')) return;

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
  }, []);

  return null;
}
