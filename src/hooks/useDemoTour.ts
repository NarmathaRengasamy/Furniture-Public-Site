import { useEffect, useRef } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { FURNITURE_TOUR_STEPS } from '../config/demoTourSteps';

export interface TourProgressState {
  status: 'completed' | 'dismissed';
  reason?: string;
  lastStep: number;
  totalSteps: number;
  completedAt?: string;
  dismissedAt?: string;
}

export function getTourProgress(): TourProgressState | null {
  try {
    const raw = localStorage.getItem('perfox_furniture_tour_state');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

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
          <stop offset="0%" stop-color="#FAF8F5" stop-opacity="0.95" />
          <stop offset="35%" stop-color="#D8D2C6" stop-opacity="0.8" />
          <stop offset="70%" stop-color="#8A7865" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#8A7865" stop-opacity="0.4" />
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

  <!-- 3. The 3D Robot Avatar with Floating Animation -->
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
  const isCompletedRef = useRef<boolean>(false);
  const activeStepRef = useRef<number>(1);
  const totalSteps = FURNITURE_TOUR_STEPS.length;

  const startTour = () => {
    // 1. Clean up any existing active driver instance or orphaned proxies
    if (driverRef.current) {
      try {
        driverRef.current.destroy();
      } catch {}
    }
    const oldLauncherProxy = document.getElementById('tour-launcher-proxy');
    if (oldLauncherProxy) oldLauncherProxy.remove();
    const oldFallbackProxy = document.getElementById('tour-target-fallback-proxy');
    if (oldFallbackProxy) oldFallbackProxy.remove();

    isCompletedRef.current = false;

    // 2. Instantiate driver with all 9 steps
    driverRef.current = driver({
      showProgress: true,
      smoothScroll: false,
      allowScroll: false,
      animate: true,
      overlayColor: 'rgba(24, 23, 22, 0.75)',
      stagePadding: 8,
      stageRadius: 14,
      popoverClass: 'perfox-tour-popover',
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      doneBtnText: 'Start chatting',
      steps: FURNITURE_TOUR_STEPS,
      onPopoverRender: (popover, { state }) => {
        if (!popover || !popover.wrapper) return;

        const currentStep = (state.activeIndex ?? 0) + 1;
        activeStepRef.current = currentStep;

        // 1. Structure the Warm Stone Speech Bubble
        let speechBubble = popover.wrapper.querySelector<HTMLElement>('.tour-speech-bubble');
        if (!speechBubble) {
          speechBubble = document.createElement('div');
          speechBubble.className = 'tour-speech-bubble';

          const tail = document.createElement('div');
          tail.className = 'tour-speech-tail';
          speechBubble.appendChild(tail);

          const closeBtn = popover.wrapper.querySelector('.driver-popover-close-btn');
          const titleEl = popover.wrapper.querySelector('.driver-popover-title');
          const descEl = popover.wrapper.querySelector('.driver-popover-description');

          if (closeBtn) speechBubble.appendChild(closeBtn);
          if (titleEl) speechBubble.appendChild(titleEl);
          if (descEl) speechBubble.appendChild(descEl);

          popover.wrapper.insertBefore(speechBubble, popover.wrapper.firstChild);
        }

        // 2. Format Title & Category Badge cleanly
        const titleEl = speechBubble.querySelector<HTMLElement>('.driver-popover-title');
        if (titleEl) {
          const stepObj = FURNITURE_TOUR_STEPS[state.activeIndex ?? 0];
          const rawTitle = typeof stepObj?.popover?.title === 'string' ? stepObj.popover.title : (titleEl.textContent || '');
          const badgeMatch = rawTitle.match(/<span[^>]*class="tour-step-badge"[^>]*>(.*?)<\/span>/i);
          const badgeText = badgeMatch ? badgeMatch[1] : '';
          const cleanTitle = rawTitle.replace(/<span[^>]*>.*?<\/span>/gi, '').trim();

          titleEl.innerHTML = `
            ${badgeText ? `<div class="tour-badge-pill"><span class="tour-badge-dot"></span><span>${badgeText}</span></div>` : ''}
            <div class="tour-title-row">
              <span class="tour-step-num font-mono text-[#8A7865] mr-1.5 tabular-nums">${currentStep}.</span>
              <span class="tour-step-heading">${cleanTitle}</span>
            </div>
          `;
        }

        // 3. Remove old progress bar if present
        const oldProgress = popover.wrapper.querySelector('.tour-progress-container');
        if (oldProgress) oldProgress.remove();

        // 4. Attach or update the 3D robot companion
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

        // 5. Update footer progress text: "2 of 9"
        const progressText = popover.wrapper.querySelector('.driver-popover-progress-text');
        if (progressText) {
          progressText.textContent = `${currentStep} of ${totalSteps}`;
        }

        // 6. Set button texts: "← Back" and "Next →" / "Start chatting"
        const prevBtn = popover.wrapper.querySelector<HTMLElement>('.driver-popover-prev-btn');
        if (prevBtn) {
          prevBtn.textContent = '← Back';
        }
        const nextBtn = popover.wrapper.querySelector<HTMLElement>('.driver-popover-next-btn');
        if (nextBtn) {
          if (currentStep === totalSteps) {
            nextBtn.textContent = 'Start chatting';
            nextBtn.onclick = () => {
              isCompletedRef.current = true;
              const progress: TourProgressState = {
                status: 'completed',
                lastStep: totalSteps,
                totalSteps,
                completedAt: new Date().toISOString(),
              };
              try {
                localStorage.setItem('perfox_furniture_tour_state', JSON.stringify(progress));
                localStorage.setItem('perfox_furniture_tour_seen', 'true');
              } catch {}
              driverRef.current?.destroy();
            };
          } else {
            nextBtn.textContent = 'Next →';
            nextBtn.onclick = null;
          }
        }

        // 7. Step 9: Confetti sparkles celebration
        if (currentStep === totalSteps) {
          const mascotEl = popover.wrapper.querySelector('.perfox-tour-robot-mascot');
          if (mascotEl && !mascotEl.querySelector('.celebration-sparkle')) {
            const sparkles = [
              { color: '#8A7865', x: '-20px', y: '-30px', delay: '0s' },
              { color: '#634F42', x: '25px', y: '-45px', delay: '0.4s' },
              { color: '#D8D2C6', x: '-15px', y: '25px', delay: '0.8s' },
              { color: '#A09485', x: '35px', y: '15px', delay: '1.2s' },
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
        }
      },
      onDestroyed: (_el, _step, opts) => {
        if (!isCompletedRef.current) {
          const reason = (opts as any)?.reason || (opts as any)?.state?.__destroyReason || 'dismissed';
          const progress: TourProgressState = {
            status: 'dismissed',
            reason: String(reason),
            lastStep: activeStepRef.current,
            totalSteps,
            dismissedAt: new Date().toISOString(),
          };
          try {
            localStorage.setItem('perfox_furniture_tour_state', JSON.stringify(progress));
            localStorage.setItem('perfox_furniture_tour_seen', 'true');
          } catch {}
        }

        // Clean proxy elements if created
        const proxy = document.getElementById('tour-launcher-proxy');
        if (proxy) proxy.remove();
        const fallbackProxy = document.getElementById('tour-target-fallback-proxy');
        if (fallbackProxy) fallbackProxy.remove();

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
