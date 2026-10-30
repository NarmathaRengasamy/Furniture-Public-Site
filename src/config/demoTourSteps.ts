import { DriveStep } from 'driver.js';

/**
 * Ensures header actions and composer action buttons exist inside the widget Shadow DOM
 * so the tour can cleanly highlight every requested feature even if certain capabilities
 * are disabled by default in specific workspace configurations.
 */
const ensureWidgetButtons = (widget: HTMLElement) => {
  const shadow = widget.shadowRoot;
  if (!shadow) return;

  const panel = shadow.querySelector<HTMLElement>('.sa-widget-panel');
  if (!panel) return;

  // 1. Ensure Header Actions: New chat, History, Fullscreen, Close
  const headerActions = panel.querySelector<HTMLElement>('.sa-widget-header-actions');
  if (headerActions) {
    // New chat button
    let newChatBtn = headerActions.querySelector<HTMLElement>(
      '.sa-widget-header-act[title*="New chat" i], button[title*="New chat" i], button[aria-label*="New chat" i]'
    );
    if (!newChatBtn) {
      newChatBtn = document.createElement('button');
      newChatBtn.className = 'sa-widget-header-act';
      newChatBtn.setAttribute('title', 'New chat');
      newChatBtn.setAttribute('aria-label', 'New chat');
      newChatBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/></svg>`;
      headerActions.insertBefore(newChatBtn, headerActions.firstChild);
    }

    // History button
    let historyBtn = headerActions.querySelector<HTMLElement>(
      '.sa-widget-header-act[title*="History" i], button[title*="History" i], button[aria-label*="History" i]'
    );
    if (!historyBtn) {
      historyBtn = document.createElement('button');
      historyBtn.className = 'sa-widget-header-act';
      historyBtn.setAttribute('title', 'History');
      historyBtn.setAttribute('aria-label', 'History');
      historyBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="12" x2="15" y2="14"/></svg>`;
      const fsBtn = headerActions.querySelector('.sa-widget-header-fs');
      if (fsBtn) {
        headerActions.insertBefore(historyBtn, fsBtn);
      } else {
        headerActions.appendChild(historyBtn);
      }
    }
  }

  // 2. Ensure Composer Actions: Record a voice note, Use voice mode, Send
  const inputArea = panel.querySelector<HTMLElement>('.sa-widget-input-area');
  const sendBtn = inputArea?.querySelector<HTMLElement>('.sa-widget-send');
  if (inputArea && sendBtn) {
    // Record a voice note button
    let recordBtn = inputArea.querySelector<HTMLElement>(
      '.sa-widget-record-btn, button[title*="voice note" i], button[aria-label*="voice note" i]'
    );
    if (!recordBtn) {
      recordBtn = document.createElement('button');
      recordBtn.className = 'sa-widget-record-btn';
      recordBtn.setAttribute('title', 'Record a voice note');
      recordBtn.setAttribute('aria-label', 'Record a voice note');
      recordBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`;
      inputArea.insertBefore(recordBtn, sendBtn);
    }

    // Use voice mode button
    let voiceBtn = inputArea.querySelector<HTMLElement>(
      '.sa-widget-voice-btn, button[title*="voice mode" i], button[aria-label*="voice mode" i]'
    );
    if (!voiceBtn) {
      voiceBtn = document.createElement('button');
      voiceBtn.className = 'sa-widget-voice-btn';
      voiceBtn.setAttribute('title', 'Use voice mode');
      voiceBtn.setAttribute('aria-label', 'Use voice mode');
      voiceBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="10" x2="4" y2="14"/><line x1="8" y1="7" x2="8" y2="17"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="16" y1="7" x2="16" y2="17"/><line x1="20" y1="10" x2="20" y2="14"/></svg>`;
      inputArea.insertBefore(voiceBtn, sendBtn);
    }
  }
};

/**
 * Programmatically open the Perfox chat panel and ensure UI buttons exist
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
  if (widget) {
    ensureWidgetButtons(widget);
  }
};

/**
 * Programmatically close the Perfox chat panel when returning to earlier steps
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

/**
 * Applies a glowing outline with subtle pulse to the active control inside Shadow DOM
 */
const highlightShadowElement = (el: HTMLElement | null | undefined) => {
  if (!el) return;
  el.classList.add('tour-active-control-pulse');
  el.style.outline = '2px solid #ff8a2b';
  el.style.boxShadow = '0 0 0 4px rgba(255, 138, 43, 0.4), 0 0 16px rgba(255, 106, 44, 0.35)';
  el.style.borderRadius = el.tagName === 'BUTTON' ? '8px' : '14px';
  el.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
};

/**
 * Clears the glowing outline from an element inside Shadow DOM
 */
const clearShadowElement = (el: HTMLElement | null | undefined) => {
  if (!el) return;
  el.classList.remove('tour-active-control-pulse');
  el.style.outline = '';
  el.style.boxShadow = '';
};

/**
 * Zero-scroll protector
 */
const preventScrollJump = () => {
  const y = window.scrollY;
  requestAnimationFrame(() => {
    if (window.scrollY !== y) {
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
};

export const FURNITURE_TOUR_STEPS: DriveStep[] = [
  // ── Step 1: Launcher Bubble ───────────────────────────────────────────────
  {
    element: () => {
      closePerfoxChat();
      // Ensure fixed proxy attached directly to document.body over the bubble
      let proxy = document.getElementById('tour-launcher-proxy');
      if (!proxy) {
        proxy = document.createElement('div');
        proxy.id = 'tour-launcher-proxy';
        document.body.appendChild(proxy);
      }
      proxy.style.cssText =
        'position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;pointer-events:none;z-index:99999;';
      return proxy;
    },
    onHighlightStarted: () => {
      closePerfoxChat();
      preventScrollJump();
    },
    popover: {
      title: '<span class="tour-step-badge">AI Guide</span> 24/7 Furniture Assistant',
      description:
        'Hi there! I am your 24/7 furniture assistant. Click this floating beacon anytime to explore chair ergonomics, verify warehouse stock, or customize finishes.',
      side: 'left',
      align: 'end',
      onNextClick: (_el, _step, { driver }) => {
        openPerfoxChat();
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          const widget = document.getElementById('perfox-widget');
          if (widget) ensureWidgetButtons(widget);
          const input = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area');
          if (input || attempts > 25) {
            clearInterval(interval);
            driver.moveNext();
          }
        }, 30);
      },
    },
  },

  // ── Step 2: Message Input Area ───────────────────────────────────────────
  {
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        ensureWidgetButtons(widget);
        const inputArea =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-input-area') ||
          widget.shadowRoot.querySelector<HTMLElement>('textarea.sa-widget-input');
        if (inputArea) {
          inputArea.scrollIntoView = () => {};
          return inputArea;
        }
      }
      return null as any;
    },
    onHighlightStarted: () => {
      openPerfoxChat();
      preventScrollJump();
      const widget = document.getElementById('perfox-widget');
      const inputArea = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area');
      highlightShadowElement(inputArea);
      const textarea = widget?.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
      if (textarea) textarea.focus();
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const inputArea = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-input-area');
      clearShadowElement(inputArea);
    },
    popover: {
      title: '<span class="tour-step-badge">Composer</span> Live Inquiries & Quotes',
      description:
        'Ask about recline angles, solid teak frame durability, or shipping timelines across Madurai. I compute live quotes and specs instantly.',
      side: 'left',
      align: 'end',
      onPrevClick: (_el, _step, { driver }) => {
        closePerfoxChat();
        setTimeout(() => driver.movePrevious(), 120);
      },
    },
  },

  // ── Step 3: Record a Voice Note ───────────────────────────────────────────
  {
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        ensureWidgetButtons(widget);
        const btn =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-record-btn') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[title*="voice note" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[aria-label*="voice note" i]');
        if (btn) {
          btn.scrollIntoView = () => {};
          return btn;
        }
      }
      return null as any;
    },
    onHighlightStarted: () => {
      openPerfoxChat();
      preventScrollJump();
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-record-btn');
      highlightShadowElement(btn);
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-record-btn');
      clearShadowElement(btn);
    },
    popover: {
      title: '<span class="tour-step-badge">Audio</span> Record Hands-Free Voice Notes',
      description:
        'Prefer speaking? Tap the microphone icon to record a quick audio inquiry. I will transcribe your voice note and answer right away.',
      side: 'left',
      align: 'end',
    },
  },

  // ── Step 4: Use Voice Mode ───────────────────────────────────────────────
  {
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        ensureWidgetButtons(widget);
        const btn =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-voice-btn') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[title*="voice mode" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[aria-label*="voice mode" i]');
        if (btn) {
          btn.scrollIntoView = () => {};
          return btn;
        }
      }
      return null as any;
    },
    onHighlightStarted: () => {
      openPerfoxChat();
      preventScrollJump();
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-voice-btn');
      highlightShadowElement(btn);
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-voice-btn');
      clearShadowElement(btn);
    },
    popover: {
      title: '<span class="tour-step-badge">Interactive</span> Real-Time Two-Way Voice Mode',
      description:
        'Have a live verbal conversation with me like talking to an in-store craftsman. Perfect for multitasking or hands-free shopping.',
      side: 'left',
      align: 'end',
    },
  },

  // ── Step 5: Send Message ─────────────────────────────────────────────────
  {
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        ensureWidgetButtons(widget);
        const btn =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-send') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[title*="Send" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[aria-label*="Send" i]');
        if (btn) {
          btn.scrollIntoView = () => {};
          return btn;
        }
      }
      return null as any;
    },
    onHighlightStarted: () => {
      openPerfoxChat();
      preventScrollJump();
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-send');
      highlightShadowElement(btn);
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-send');
      clearShadowElement(btn);
    },
    popover: {
      title: '<span class="tour-step-badge">Action</span> Instant Direct Dispatch',
      description:
        'Hit Send or press Enter. I instantly pull real-time inventory and pricing for easy chairs, dining sets, and custom cushions.',
      side: 'left',
      align: 'end',
    },
  },

  // ── Step 6: New Chat ─────────────────────────────────────────────────────
  {
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        ensureWidgetButtons(widget);
        const btn =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-header-act[title*="New chat" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[title*="New chat" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[aria-label*="New chat" i]');
        if (btn) {
          btn.scrollIntoView = () => {};
          return btn;
        }
      }
      return null as any;
    },
    onHighlightStarted: () => {
      openPerfoxChat();
      preventScrollJump();
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-act[title*="New chat" i]');
      highlightShadowElement(btn);
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-act[title*="New chat" i]');
      clearShadowElement(btn);
    },
    popover: {
      title: '<span class="tour-step-badge">Session</span> Start a Fresh Inquiry',
      description:
        'Want to discuss another room or explore wholesale orders? Reset the context anytime with one clean tap.',
      side: 'left',
      align: 'start',
    },
  },

  // ── Step 7: Chat History ─────────────────────────────────────────────────
  {
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        ensureWidgetButtons(widget);
        const btn =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-header-act[title*="History" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[title*="History" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[aria-label*="History" i]');
        if (btn) {
          btn.scrollIntoView = () => {};
          return btn;
        }
      }
      return null as any;
    },
    onHighlightStarted: () => {
      openPerfoxChat();
      preventScrollJump();
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-act[title*="History" i]');
      highlightShadowElement(btn);
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-act[title*="History" i]');
      clearShadowElement(btn);
    },
    popover: {
      title: '<span class="tour-step-badge">Memory</span> Revisit Past Recommendations',
      description:
        'Never lose your dimension comparisons or custom quotes. Review earlier chat logs whenever you need them.',
      side: 'left',
      align: 'start',
    },
  },

  // ── Step 8: Fullscreen View ──────────────────────────────────────────────
  {
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        ensureWidgetButtons(widget);
        const btn =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-header-fs') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[title*="Fullscreen" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[aria-label*="Fullscreen" i]');
        if (btn) {
          btn.scrollIntoView = () => {};
          return btn;
        }
      }
      return null as any;
    },
    onHighlightStarted: () => {
      openPerfoxChat();
      preventScrollJump();
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-fs');
      highlightShadowElement(btn);
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-fs');
      clearShadowElement(btn);
    },
    popover: {
      title: '<span class="tour-step-badge">Display</span> Expand for Roomy Inspection',
      description:
        'Expand the dialog to full screen for reading detailed technical specs and side-by-side chair dimensions comfortably.',
      side: 'left',
      align: 'start',
    },
  },

  // ── Step 9: Close Assistant / Celebration ────────────────────────────────
  {
    element: () => {
      openPerfoxChat();
      const widget = document.getElementById('perfox-widget');
      if (widget?.shadowRoot) {
        ensureWidgetButtons(widget);
        const btn =
          widget.shadowRoot.querySelector<HTMLElement>('.sa-widget-header-close') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[title*="Close" i]') ||
          widget.shadowRoot.querySelector<HTMLElement>('button[aria-label*="Close" i]');
        if (btn) {
          btn.scrollIntoView = () => {};
          return btn;
        }
      }
      return null as any;
    },
    onHighlightStarted: () => {
      openPerfoxChat();
      preventScrollJump();
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-close');
      highlightShadowElement(btn);
    },
    onDeselected: () => {
      const widget = document.getElementById('perfox-widget');
      const btn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-close');
      clearShadowElement(btn);
    },
    popover: {
      title: '<span class="tour-step-badge">Ready!</span> Minimize or Start Exploring',
      description:
        'You can dock me back into the corner anytime, or leave this panel open to start chatting right away!',
      side: 'left',
      align: 'start',
    },
  },
];
