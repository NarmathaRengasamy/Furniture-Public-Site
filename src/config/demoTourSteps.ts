import { DriveStep } from 'driver.js';

/**
 * Ensures header actions and composer action buttons exist inside the widget Shadow DOM
 * so the tour can highlight all 9 capabilities.
 * If buttons are absent in the workspace, it creates interactive controls with click feedback.
 */
export const ensureWidgetButtons = (widget: HTMLElement) => {
  const shadow = widget.shadowRoot;
  if (!shadow) return;

  const panel = shadow.querySelector<HTMLElement>('.sa-widget-panel');
  if (!panel) return;

  // 1. Header Actions: New chat, History, Fullscreen, Close
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
      newChatBtn.onclick = (e) => {
        e.stopPropagation();
        const textarea = shadow.querySelector<HTMLTextAreaElement>('textarea');
        if (textarea) {
          textarea.value = '';
          textarea.focus();
        }
      };
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
      historyBtn.onclick = (e) => {
        e.stopPropagation();
        const w = window as any;
        if (typeof w.Perfox === 'function') {
          try {
            w.Perfox('history');
          } catch {}
        }
      };
      const fsBtn = headerActions.querySelector('.sa-widget-header-fs');
      if (fsBtn) {
        headerActions.insertBefore(historyBtn, fsBtn);
      } else {
        headerActions.appendChild(historyBtn);
      }
    }
  }

  // 2. Composer Actions: Record a voice note, Use voice mode, Send
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
      recordBtn.onclick = (e) => {
        e.stopPropagation();
        recordBtn?.classList.toggle('active-recording');
      };
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
      voiceBtn.onclick = (e) => {
        e.stopPropagation();
        voiceBtn?.classList.toggle('active-voice');
      };
      inputArea.insertBefore(voiceBtn, sendBtn);
    }
  }
};

/**
 * Checks whether the Perfox widget panel is currently open
 */
export const isPanelOpen = (widget?: HTMLElement | null): boolean => {
  const w = widget || document.getElementById('perfox-widget');
  const panel = w?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-panel');
  if (!panel) return false;
  const style = window.getComputedStyle(panel);
  return style.display !== 'none' && style.visibility !== 'hidden';
};

/**
 * Programmatically open the Perfox chat panel and ensure UI buttons exist
 */
export const openPerfoxChat = () => {
  const w = window as any;
  if (typeof w.Perfox === 'function') {
    try {
      w.Perfox('open');
    } catch {}
  }
  const widget = document.getElementById('perfox-widget');
  const panel = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-panel');
  if (!panel || window.getComputedStyle(panel).display === 'none') {
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
    } catch {}
  }
  const widget = document.getElementById('perfox-widget');
  const closeBtn = widget?.shadowRoot?.querySelector<HTMLElement>('.sa-widget-header-close');
  if (closeBtn) {
    closeBtn.click();
  }
};

/**
 * Safely queries an element inside the Perfox Shadow DOM.
 * Returns a guaranteed valid HTMLElement, falling back to parent container or fixed proxy.
 */
export const getShadowElement = (
  primarySelector: string,
  fallbackSelectors: string[] = []
): HTMLElement => {
  const widget = document.getElementById('perfox-widget');
  if (widget) {
    ensureWidgetButtons(widget);
  }
  const shadow = widget?.shadowRoot;

  if (shadow) {
    // 1. Primary selector
    const primary = shadow.querySelector<HTMLElement>(primarySelector);
    if (primary) {
      primary.scrollIntoView = () => {};
      return primary;
    }

    // 2. Alternative selectors
    for (const sel of fallbackSelectors) {
      const alt = shadow.querySelector<HTMLElement>(sel);
      if (alt) {
        alt.scrollIntoView = () => {};
        return alt;
      }
    }

    // 3. Fall back to input area or panel
    const panel = shadow.querySelector<HTMLElement>('.sa-widget-panel');
    if (panel) {
      panel.scrollIntoView = () => {};
      return panel;
    }
  }

  // 4. Guaranteed non-null fallback element
  let proxy = document.getElementById('tour-target-fallback-proxy');
  if (!proxy) {
    proxy = document.createElement('div');
    proxy.id = 'tour-target-fallback-proxy';
    proxy.style.cssText =
      'position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;opacity:0;pointer-events:none;z-index:99999;';
    document.body.appendChild(proxy);
  }
  return proxy;
};

/**
 * Applies a glowing outline with subtle pulse to the active control inside Shadow DOM
 */
const highlightShadowElement = (el: HTMLElement | null | undefined) => {
  if (!el || el.id === 'tour-target-fallback-proxy') return;
  el.classList.add('tour-active-control-pulse');
  el.style.outline = '2px solid #634F42';
  el.style.boxShadow = '0 0 0 3px rgba(99, 79, 66, 0.25), 0 2px 8px rgba(24, 23, 22, 0.08)';
  el.style.borderRadius = el.tagName === 'BUTTON' ? '8px' : '12px';
  el.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
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
    element: (): HTMLElement => {
      closePerfoxChat();
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
      title: '<span class="tour-step-badge">Studio assistant</span> Furniture inquiry concierge',
      description:
        'Click this beacon anytime to explore timber specifications, verify workshop inventory, or request custom finishes.',
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
    element: (): HTMLElement => {
      openPerfoxChat();
      return getShadowElement('.sa-widget-input-area', ['textarea.sa-widget-input']);
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
      title: '<span class="tour-step-badge">Composer</span> Live inquiries and quotes',
      description:
        'Ask about dimensions, wood finishes, warranty coverage, or delivery schedules. Live quotes and specifications are calculated directly.',
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
    element: (): HTMLElement => {
      openPerfoxChat();
      return getShadowElement('.sa-widget-record-btn', [
        'button[title*="voice note" i]',
        'button[aria-label*="voice note" i]',
        '.sa-widget-input-area',
      ]);
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
      title: '<span class="tour-step-badge">Audio</span> Record hands-free voice notes',
      description:
        'Tap the microphone icon to record a spoken inquiry. The assistant transcribes the recording and provides specifications immediately.',
      side: 'left',
      align: 'end',
    },
  },

  // ── Step 4: Use Voice Mode ───────────────────────────────────────────────
  {
    element: (): HTMLElement => {
      openPerfoxChat();
      return getShadowElement('.sa-widget-voice-btn', [
        'button[title*="voice mode" i]',
        'button[aria-label*="voice mode" i]',
        '.sa-widget-input-area',
      ]);
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
      title: '<span class="tour-step-badge">Interactive</span> Real-time voice mode',
      description:
        'Engage in a live verbal conversation with our studio assistant for hands-free specification checks and material advice.',
      side: 'left',
      align: 'end',
    },
  },

  // ── Step 5: Send Message ─────────────────────────────────────────────────
  {
    element: (): HTMLElement => {
      openPerfoxChat();
      return getShadowElement('.sa-widget-send', [
        'button[title*="Send" i]',
        'button[aria-label*="Send" i]',
        '.sa-widget-input-area',
      ]);
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
      title: '<span class="tour-step-badge">Action</span> Direct dispatch',
      description:
        'Submit inquiries or press enter to retrieve inventory counts and pricing for dining sets, lounge chairs, and bespoke desks.',
      side: 'left',
      align: 'end',
    },
  },

  // ── Step 6: New Chat ─────────────────────────────────────────────────────
  {
    element: (): HTMLElement => {
      openPerfoxChat();
      return getShadowElement('.sa-widget-header-act[title*="New chat" i]', [
        'button[title*="New chat" i]',
        'button[aria-label*="New chat" i]',
        '.sa-widget-header',
      ]);
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
      title: '<span class="tour-step-badge">Session</span> Start a fresh inquiry',
      description:
        'Reset context when transitioning between rooms or requesting wholesale contract pricing.',
      side: 'left',
      align: 'start',
    },
  },

  // ── Step 7: Chat History ─────────────────────────────────────────────────
  {
    element: (): HTMLElement => {
      openPerfoxChat();
      return getShadowElement('.sa-widget-header-act[title*="History" i]', [
        'button[title*="History" i]',
        'button[aria-label*="History" i]',
        '.sa-widget-header',
      ]);
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
      title: '<span class="tour-step-badge">Memory</span> Revisit past recommendations',
      description:
        'Review previous dimension comparisons and custom finish quotes whenever needed.',
      side: 'left',
      align: 'start',
    },
  },

  // ── Step 8: Fullscreen View ──────────────────────────────────────────────
  {
    element: (): HTMLElement => {
      openPerfoxChat();
      return getShadowElement('.sa-widget-header-fs', [
        'button[title*="Fullscreen" i]',
        'button[aria-label*="Fullscreen" i]',
        '.sa-widget-header',
      ]);
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
      title: '<span class="tour-step-badge">Display</span> Expand inspection view',
      description:
        'Expand the dialog for full-width technical specification reviews and side-by-side dimension analysis.',
      side: 'left',
      align: 'start',
    },
  },

  // ── Step 9: Close Assistant / Celebration ────────────────────────────────
  {
    element: (): HTMLElement => {
      openPerfoxChat();
      return getShadowElement('.sa-widget-header-close', [
        'button[title*="Close" i]',
        'button[aria-label*="Close" i]',
        '.sa-widget-header',
      ]);
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
      title: '<span class="tour-step-badge">Overview</span> Minimize or begin inquiry',
      description:
        'Dock the panel into the corner anytime, or begin inquiring directly with the atelier assistant.',
      side: 'left',
      align: 'start',
    },
  },
];

// Helper export
export function buildVerifiedTourSteps(): DriveStep[] {
  return FURNITURE_TOUR_STEPS;
}
