import { useEffect, useRef } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { FURNITURE_TOUR_STEPS } from '../config/demoTourSteps';

export function useDemoTour() {
  const driverRef = useRef<Driver | null>(null);

  const startTour = () => {
    // Re-instantiate driver to avoid stale references
    driverRef.current = driver({
      showProgress: true,
      animate: true,
      overlayColor: 'rgba(18, 16, 24, 0.82)',
      stagePadding: 8,
      stageRadius: 14,
      popoverClass: 'perfox-tour-popover',
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      doneBtnText: 'Finish Tour ✨',
      steps: FURNITURE_TOUR_STEPS,
      onDestroyed: () => {
        localStorage.setItem('perfox_furniture_tour_seen', 'true');
        // Clean proxy element if created
        const proxy = document.getElementById('tour-chat-input-proxy');
        if (proxy) proxy.remove();
        // Clean highlight on input area
        const widget = document.getElementById('perfox-widget');
        const inputArea = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area');
        if (inputArea) {
          inputArea.style.outline = '';
          inputArea.style.boxShadow = '';
        }
      },
    });
    driverRef.current.drive();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shouldStart = params.get('tour') === 'true' || params.get('ref') === 'sandbox';

    if (shouldStart) {
      const timer = setTimeout(() => {
        startTour();
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete('tour');
        cleanUrl.searchParams.delete('ref');
        window.history.replaceState({}, '', cleanUrl.pathname + cleanUrl.search);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, []);

  return { startTour };
}
