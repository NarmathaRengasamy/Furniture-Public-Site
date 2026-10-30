import { useEffect, useRef } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { FURNITURE_TOUR_STEPS } from '../config/demoTourSteps';

/**
 * Builds the interactive vector robot mascot with personality layers:
 * - Animated tilting head & smiling blinking arch eyes
 * - Waving left arm & pointing right arm
 * - Pulsing core reactor & thruster energy
 * - Curved glowing energy trail linking robot head to speech card
 */
function getRobotMascotHtml(): string {
  return `<div class="perfox-tour-robot-mascot perfox-3d-robot" aria-hidden="true">
  <!-- 1. Hologram Energy Portal Pedestal (From Image 1) -->
  <div class="hologram-portal-base">
    <svg viewBox="0 0 140 50" class="portal-svg-rings">
      <defs>
        <radialGradient id="portalDiscGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffe6b0" stop-opacity="0.95" />
          <stop offset="35%" stop-color="#ff8a2b" stop-opacity="0.8" />
          <stop offset="70%" stop-color="#ff3d6e" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#ff3d6e" stop-opacity="0" />
        </radialGradient>
        <filter id="portalGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <!-- Inner glowing solid orbital ring -->
      <ellipse cx="70" cy="25" rx="46" ry="13" class="portal-ring-inner" filter="url(#portalGlow)" />
      <!-- High-intensity core energy ellipse -->
      <ellipse cx="70" cy="25" rx="30" ry="8" fill="url(#portalDiscGlow)" />
      <!-- Central vertical beam anchor -->
      <ellipse cx="70" cy="25" rx="14" ry="4" fill="#ffffff" opacity="0.9" filter="blur(1px)" />
    </svg>
    <!-- Vertical luminous light column rising to the robot -->
    <div class="portal-light-beams"></div>
    <!-- Floating ember sparks rising from the portal -->
    <span class="portal-spark s1"></span>
    <span class="portal-spark s2"></span>
    <span class="portal-spark s3"></span>
    <span class="portal-spark s4"></span>
    <span class="portal-spark s5"></span>
  </div>

  <!-- 2. Warm Ambient Glow behind Robot -->
  <div class="robot-ambient-glow"></div>

  <!-- 3. Curved glowing energy trail linking robot to speech card -->
  <div class="robot-energy-beam-connector">
    <svg viewBox="0 0 40 30" width="40" height="30" fill="none">
      <path d="M4 8 Q20 2 36 20" stroke="url(#connectorBeamGrad)" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <defs>
        <linearGradient id="connectorBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffb347" stop-opacity="0.95" />
          <stop offset="60%" stop-color="#ff6a2c" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#ff3d6e" stop-opacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
    <div class="robot-energy-pulse-dot"></div>
  </div>

  <!-- 4. The 3D Robot Avatar with Floating Animation & Orbital Halo -->
  <div class="robot-3d-avatar-wrapper">
    <img 
      src="/assets/tour-mascot-3d.png" 
      alt="Perfox AI Assistant" 
      class="robot-3d-avatar-img" 
      loading="eager"
    />
  </div>
</div>`;
}

export function useDemoTour() {
  const driverRef = useRef<Driver | null>(null);

  const startTour = () => {
    // Re-instantiate driver to avoid stale references
    driverRef.current = driver({
      showProgress: true,
      smoothScroll: false,
      allowScroll: false,
      animate: true,
      overlayColor: 'rgba(18, 16, 24, 0.82)',
      stagePadding: 8,
      stageRadius: 14,
      popoverClass: 'perfox-tour-popover',
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      doneBtnText: 'Start Chatting ✨',
      steps: FURNITURE_TOUR_STEPS,
      onPopoverRender: (popover, { state }) => {
        if (!popover || !popover.wrapper) return;

        const currentStep = (state.activeIndex ?? 0) + 1;
        const totalSteps = FURNITURE_TOUR_STEPS.length;

        // 1. Determine robot behavior based on step
        let behaviorClass = 'robot--explain';
        if (currentStep === 1) {
          behaviorClass = 'robot--wave'; // Step 1: Wave at visitor
        } else if (currentStep >= 2 && currentStep <= 8) {
          behaviorClass = 'robot--point'; // Steps 2-8: Turn and point toward control
        } else if (currentStep === 9) {
          behaviorClass = 'robot--celebrate'; // Step 9: Celebrate!
        }

        // 2. Attach or update the standing robot companion
        const existingMascot = popover.wrapper.querySelector('.perfox-tour-robot-mascot');
        if (existingMascot) {
          existingMascot.className = "perfox-tour-robot-mascot perfox-3d-robot";
        } else {
          const botHolder = document.createElement('div');
          botHolder.innerHTML = getRobotMascotHtml();
          const mascot = botHolder.firstElementChild;
          if (mascot) {
            popover.wrapper.appendChild(mascot);
          }
        }

        // 3. Inject Slim Gradient Progress Bar into popover
        let progressContainer = popover.wrapper.querySelector('.tour-progress-container');
        if (!progressContainer) {
          progressContainer = document.createElement('div');
          progressContainer.className = 'tour-progress-container';
          progressContainer.innerHTML = `<div class="tour-progress-track">
            <div class="tour-progress-bar" style="width: ${(currentStep / totalSteps) * 100}%;"></div>
          </div>`;

          const desc = popover.wrapper.querySelector('.driver-popover-description');
          if (desc && desc.parentNode) {
            desc.parentNode.insertBefore(progressContainer, desc.nextSibling);
          }
        } else {
          const bar = progressContainer.querySelector<HTMLElement>('.tour-progress-bar');
          if (bar) {
            bar.style.width = `${(currentStep / totalSteps) * 100}%`;
          }
        }

        // 4. On Step 9: Add Confetti & Celebration Invite Banner
        const existingBanner = popover.wrapper.querySelector('.tour-celebration-banner');
        if (currentStep === 9) {
          if (!existingBanner) {
            const banner = document.createElement('div');
            banner.className = 'tour-celebration-banner';
            banner.innerHTML = `<div class="tour-celebration-banner-icon">🎉</div>
              <div class="tour-celebration-banner-text">
                <strong>You're all set!</strong> Try asking me about custom teak stains, volvo chair cushion thickness, or showroom delivery!
              </div>`;
            const footer = popover.wrapper.querySelector('.driver-popover-footer');
            if (footer && footer.parentNode) {
              footer.parentNode.insertBefore(banner, footer);
            }
          }

          // Add floating sparkles around robot
          const mascotEl = popover.wrapper.querySelector('.perfox-tour-robot-mascot');
          if (mascotEl && !mascotEl.querySelector('.celebration-sparkle')) {
            const sparkles = [
              { color: '#ffb347', x: '-20px', y: '-30px', delay: '0s' },
              { color: '#ff3d6e', x: '25px', y: '-45px', delay: '0.4s' },
              { color: '#fff4df', x: '-15px', y: '25px', delay: '0.8s' },
              { color: '#ff8a2b', x: '35px', y: '15px', delay: '1.2s' },
            ];
            sparkles.forEach((s) => {
              const sp = document.createElement('div');
              sp.className = 'celebration-sparkle';
              sp.style.backgroundColor = s.color;
              sp.style.boxShadow = `0 0 6px ${s.color}`;
              sp.style.setProperty('--tx', s.x);
              sp.style.setProperty('--ty', s.y);
              sp.style.animationDelay = s.delay;
              mascotEl.appendChild(sp);
            });
          }
        } else if (existingBanner) {
          existingBanner.remove();
        }
      },
      onDestroyed: () => {
        localStorage.setItem('perfox_furniture_tour_seen', 'true');
        // Clean proxy element if created
        const proxy = document.getElementById('tour-launcher-proxy');
        if (proxy) proxy.remove();
        // Clean highlight on input area
        const widget = document.getElementById('perfox-widget');
        const inputArea = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area');
        if (inputArea) {
          inputArea.style.outline = '';
          inputArea.style.boxShadow = '';
          inputArea.classList.remove('tour-active-control-pulse');
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
