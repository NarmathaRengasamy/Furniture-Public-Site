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
  return `<div class="perfox-tour-robot-mascot robot--celebrate" aria-hidden="true">
  <!-- Warm ambient reactor glow matching hero scene -->
  <div class="robot-ambient-glow"></div>

  <!-- Curved glowing energy trail linking robot to card -->
  <div class="robot-energy-beam-connector">
    <svg viewBox="0 0 40 30" width="40" height="30" fill="none">
      <path d="M4 8 Q20 2 36 20" stroke="url(#connectorBeamGrad)" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <defs>
        <linearGradient id="connectorBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffb347" stop-opacity="0.9" />
          <stop offset="60%" stop-color="#ff6a2c" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#ff3d6e" stop-opacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
    <div class="robot-energy-pulse-dot"></div>
  </div>

  <!-- Robot Mascot SVG Vector Art -->
  <svg viewBox="0 0 100 115" class="robot-vector-art">
    <defs>
      <!-- Glossy white spherical head gradient -->
      <radialGradient id="chassisGrad" cx="38%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="55%" stop-color="#f1f3f9" />
        <stop offset="85%" stop-color="#d9dfea" />
        <stop offset="100%" stop-color="#b0b9ca" />
      </radialGradient>

      <!-- Glossy white torso gradient -->
      <radialGradient id="bodyGrad" cx="35%" cy="32%" r="65%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#ebedf5" />
        <stop offset="100%" stop-color="#b8c0d2" />
      </radialGradient>

      <!-- Antenna golden orb glow -->
      <radialGradient id="antennaOrb" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#fff4df" />
        <stop offset="45%" stop-color="#ffb347" />
        <stop offset="100%" stop-color="#ff6a2c" />
      </radialGradient>

      <!-- Eye glow filter -->
      <filter id="eyeGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Core reactor glow -->
      <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Floating Thruster Base & Energy Rings -->
    <g class="robot-thruster">
      <ellipse cx="50" cy="92" rx="9" ry="4" fill="#1e1a29" />
      <ellipse cx="50" cy="96" rx="6" ry="2.5" fill="#ff8a2b" opacity="0.9" filter="url(#coreGlow)" />
      <ellipse cx="50" cy="100" rx="3.5" ry="1.5" fill="#ffe2b8" opacity="0.8" />
    </g>

    <!-- Torso Chassis -->
    <g class="robot-torso">
      <ellipse cx="50" cy="76" rx="19" ry="16" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.5)" stroke-width="0.8" />
      <!-- Chest Core Reactor (Pulsing warm ember) -->
      <circle cx="50" cy="75" r="4.5" fill="#ff6a2c" filter="url(#coreGlow)" />
      <circle cx="50" cy="75" r="2.2" fill="#fff5eb" />
    </g>

    <!-- Left Arm (Waving gesture) -->
    <g class="robot-arm-left">
      <ellipse cx="28" cy="74" rx="4" ry="7" fill="url(#bodyGrad)" transform="rotate(22 28 74)" />
    </g>

    <!-- Right Arm (Pointing / Guiding gesture) -->
    <g class="robot-arm-right">
      <ellipse cx="72" cy="74" rx="4" ry="7" fill="url(#bodyGrad)" transform="rotate(-22 72 74)" />
    </g>

    <!-- Robot Head Group (Tilts and turns toward target component) -->
    <g class="robot-head">
      <!-- Neck Ring -->
      <rect x="43" y="60" width="14" height="4.5" rx="2" fill="#251f33" />

      <!-- Head Chassis (Glossy White Sphere) -->
      <ellipse cx="50" cy="38" rx="30" ry="26" fill="url(#chassisGrad)" stroke="rgba(255,255,255,0.7)" stroke-width="1" />

      <!-- Antenna Stem & Glowing Orb -->
      <line x1="28" y1="30" x2="16" y2="12" stroke="#ff8a2b" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="15" cy="11" r="5" fill="url(#antennaOrb)" filter="url(#eyeGlow)" />

      <!-- Ear Cushions / Audio pods -->
      <ellipse cx="20" cy="38" rx="4.5" ry="9" fill="#1e1a29" stroke="#ff8a2b" stroke-width="1.2" />
      <ellipse cx="80" cy="38" rx="4.5" ry="9" fill="#1e1a29" stroke="#ff8a2b" stroke-width="1.2" />

      <!-- Obsidian Visor Screen -->
      <rect x="29" y="27" width="42" height="23" rx="10" fill="#0d0b14" stroke="#251f33" stroke-width="1.5" />

      <!-- Smiling Blinking Arch Eyes -->
      <g class="robot-eye">
        <path d="M37 39 Q42 31 47 39" stroke="#ff9a3c" stroke-width="3" stroke-linecap="round" fill="none" filter="url(#eyeGlow)" />
        <path d="M53 39 Q58 31 63 39" stroke="#ff9a3c" stroke-width="3" stroke-linecap="round" fill="none" filter="url(#eyeGlow)" />
      </g>
    </g>
  </svg>
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
          existingMascot.className = "perfox-tour-robot-mascot robot--celebrate";
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
