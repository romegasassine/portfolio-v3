const STORAGE_KEY = 'welcome-notification-v1';
const SELECTOR = '[data-welcome-wrapper]:not([data-welcome-ready])';

const safeHasSeen = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const safeMarkSeen = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    /* ignore */
  }
};

const applyVisibleStyles = (wrapper, overlay, notification) => {
  wrapper.style.opacity = '1';
  wrapper.style.visibility = 'visible';
  wrapper.style.pointerEvents = 'auto';
  if (overlay) {
    overlay.style.opacity = '1';
  }
  notification.style.opacity = '1';
  notification.style.transform = 'none';
};

const showNotification = (wrapper, overlay, notification) => {
  wrapper.classList.remove('opacity-0', 'pointer-events-none', 'invisible');
  requestAnimationFrame(() => {
    overlay?.classList.remove('opacity-0');
    notification.classList.remove('opacity-0', '-translate-y-3', 'scale-95');
    applyVisibleStyles(wrapper, overlay ?? null, notification);
  });
};

const hideNotification = (wrapper, overlay, notification) => {
  notification.classList.add('opacity-0', '-translate-y-3', 'scale-95');
  overlay?.classList.add('opacity-0');
  wrapper.classList.add('pointer-events-none');
  wrapper.style.pointerEvents = 'none';
  setTimeout(() => wrapper.remove(), 250);
};

const init = () => {
  const wrapper = document.querySelector(SELECTOR);
  if (!wrapper) {
    return false;
  }

  wrapper.dataset.welcomeReady = 'true';

  const notification = wrapper.querySelector('[data-welcome-notification]');
  if (!notification) {
    wrapper.remove();
    return true;
  }

  const overlay = wrapper.querySelector('[data-welcome-overlay]');
  const dismissButton = wrapper.querySelector('[data-welcome-dismiss]');

  if (safeHasSeen()) {
    wrapper.remove();
    return true;
  }

  showNotification(wrapper, overlay, notification);

  const dismiss = () => {
    safeMarkSeen();
    hideNotification(wrapper, overlay, notification);
  };

  dismissButton?.addEventListener('click', dismiss, { once: true });
  overlay?.addEventListener('click', dismiss, { once: true });

  return true;
};

const boot = () => {
  const attemptInit = () => init();

  if (attemptInit()) {
    return;
  }

  // Wait for the DOM node when Astro swaps or streams content in.
  const observer = new MutationObserver(() => {
    if (attemptInit()) {
      observer.disconnect();
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  setTimeout(() => observer.disconnect(), 5000);
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  document.addEventListener('astro:after-swap', boot);
}
