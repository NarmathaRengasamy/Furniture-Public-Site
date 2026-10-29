import { DriveStep } from 'driver.js';

/**
 * Helper to programmatically open the Perfox chat panel
 */
export const openPerfoxChat = () => {
  const w = window as any;
  if (typeof w.Perfox === 'function') {
    try {
      w.Perfox('open');
    } catch (e) {}
  }
  const widget = document.getElementById('perfox-widget');
  const panel = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-panel');
  if (!panel || panel.style.display === 'none') {
    const bubble = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-bubble');
    if (bubble) bubble.click();
  }
};

/**
 * Helper to programmatically close the Perfox chat panel when returning to earlier steps
 */
export const closePerfoxChat = () => {
  const w = window as any;
  if (typeof w.Perfox === 'function') {
    try {
      w.Perfox('close');
    } catch (e) {}
  }
  const widget = document.getElementById('perfox-widget');
  const closeBtn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-close');
  if (closeBtn) {
    closeBtn.click();
  }
};

export const FURNITURE_TOUR_STEPS: DriveStep[] = [
  {
    element: '#tour-explore-chairs',
    onHighlightStarted: () => {
      closePerfoxChat();
    },
    popover: {
      title: '🪑 1. Explore Chairs',
      description:
        'Browse our handcrafted collection of ergonomic easy chairs, solid teak seating, and executive models with real-time category and stock filtering.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '#tour-pdf-catalogue',
    onHighlightStarted: () => {
      closePerfoxChat();
    },
    popover: {
      title: '📥 2. PDF Catalogue Download',
      description:
        'Download the comprehensive RLX India 2026 Factory Catalogue to review detailed product dimensions, technical specifications, and wholesale pricing offline.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    // Step 3: Perfox Autonomous AI Chat
    element: () => {
      closePerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        const bubble =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-bubble') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[title*="Chat" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button');
        if (bubble) {
          bubble.scrollIntoView = () => {};
          return bubble;
        }
      }
      const directBubble = document.querySelector<HTMLElement>('.sa-widget-bubble');
      if (directBubble) {
        directBubble.scrollIntoView = () => {};
        return directBubble;
      }
      return null as any;
    },
    stageRadius: 28,
    stagePadding: 6,
    onHighlightStarted: () => {
      closePerfoxChat();
    },
    popover: {
      title: '⚡ 3. Perfox Autonomous AI Chat',
      description:
        'Engage with our autonomous AI assistant for immediate product consultation, model comparisons, and real-time guidance.',
      side: 'left',
      align: 'end',
      onNextClick: (_el, _step, { driver }) => {
        // Trigger widget opening immediately
        openPerfoxChat();

        // Poll for the chat input area to mount into the shadow DOM before moving next
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          const widget = document.getElementById('perfox-widget');
          const inputArea =
            widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area') ||
            widget?.shadowRoot?.querySelector<HTMLElement>('textarea.sa-widget-input') ||
            widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-panel');

          if (inputArea || attempts > 25) {
            clearInterval(interval);
            driver.moveNext();
          }
        }, 30);
      },
    },
  },
  {
    // Step 4: Real-Time Inquiries & Ordering
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        // 1. Look for the input area container
        const inputArea =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-input-area') ||
          widget.shadowRoot.querySelector<HTMLElement>('textarea.sa-widget-input') ||
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-input');

        if (inputArea) {
          inputArea.scrollIntoView = () => {};
          return inputArea;
        }

        // 2. Look for textarea inside panel
        const panel = widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-panel');
        if (panel) {
          const anyInput = panel.querySelector<HTMLElement>('textarea, input');
          if (anyInput) {
            anyInput.scrollIntoView = () => {};
            return anyInput;
          }
        }
      }

      // 3. Fallback: dedicated fixed proxy placed precisely over the chat input bar
      let proxy = document.getElementById('tour-chat-input-proxy');
      if (!proxy) {
        proxy = document.createElement('div');
        proxy.id = 'tour-chat-input-proxy';
        proxy.style.position = 'fixed';
        proxy.style.bottom = '32px';
        proxy.style.right = '32px';
        proxy.style.width = '360px';
        proxy.style.height = '62px';
        proxy.style.pointerEvents = 'none';
        proxy.style.zIndex = '2147483001';
        document.body.appendChild(proxy);
      }
      proxy.scrollIntoView = () => {};
      return proxy;
    },
    stageRadius: 14,
    stagePadding: 8,
    onHighlightStarted: () => {
      openPerfoxChat();

      // Ensure the window does NOT scroll down under any circumstance
      const savedScrollY = window.scrollY;
      requestAnimationFrame(() => {
        if (window.scrollY !== savedScrollY) {
          window.scrollTo({ top: savedScrollY, behavior: 'instant' });
        }
      });

      // Highlight and focus the input area in Shadow DOM
      const applyShadowHighlight = () => {
        const widget = document.getElementById('perfox-widget');
        const inputArea = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area');
        if (inputArea) {
          inputArea.style.outline = '2px solid #ea580c';
          inputArea.style.boxShadow = '0 0 0 4px rgba(234, 88, 12, 0.35), 0 4px 16px rgba(234, 88, 12, 0.2)';
          inputArea.style.borderRadius = '12px';
          inputArea.style.transition = 'all 0.25s ease';
        }
        const textarea = widget?.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
        if (textarea) {
          textarea.focus();
        }
      };

      // Run immediately and after a short tick to ensure element is ready
      applyShadowHighlight();
      setTimeout(applyShadowHighlight, 100);
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const inputArea = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area');
      if (inputArea) {
        inputArea.style.outline = '';
        inputArea.style.boxShadow = '';
      }
    },
    popover: {
      title: '💬 4. Real-Time Inquiries & Ordering',
      description:
        'Inquire about real-time chair stock, pricing, color variants, and dimensions, or seamlessly place and confirm your furniture orders directly with the assistant.',
      side: 'left',
      align: 'end',
      onPrevClick: (_el, _step, { driver }) => {
        // Clean highlight and close chat before moving back
        const widget = document.getElementById('perfox-widget');
        const inputArea = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area');
        if (inputArea) {
          inputArea.style.outline = '';
          inputArea.style.boxShadow = '';
        }
        closePerfoxChat();
        setTimeout(() => {
          driver.movePrevious();
        }, 120);
      },
    },
  },
];
