const analyticsConfig = {
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
  plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN || '',
};

let initialized = false;

function appendScript(src, attributes = {}) {
  const script = document.createElement('script');
  script.src = src;

  Object.entries(attributes).forEach(([name, value]) => {
    if (typeof value === 'boolean') {
      if (value) script.setAttribute(name, '');
      return;
    }

    script.setAttribute(name, value);
  });

  document.head.appendChild(script);
}

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;

  initialized = true;

  if (analyticsConfig.gaMeasurementId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    appendScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsConfig.gaMeasurementId)}`,
      { async: true },
    );
    window.gtag('js', new Date());
    window.gtag('config', analyticsConfig.gaMeasurementId, { send_page_view: false });
  }

  if (analyticsConfig.metaPixelId) {
    window.fbq = window.fbq || function fbq() {
      window.fbq.callMethod
        ? window.fbq.callMethod.apply(window.fbq, arguments)
        : window.fbq.queue.push(arguments);
    };
    window.fbq.queue = window.fbq.queue || [];
    window.fbq.loaded = true;
    window.fbq.version = '2.0';

    appendScript('https://connect.facebook.net/en_US/fbevents.js', { async: true });
    window.fbq('init', analyticsConfig.metaPixelId);
  }

  if (analyticsConfig.plausibleDomain) {
    window.plausible = window.plausible || function plausible() {
      window.plausible.q = window.plausible.q || [];
      window.plausible.q.push(arguments);
    };

    appendScript('https://plausible.io/js/script.manual.js', {
      defer: true,
      'data-domain': analyticsConfig.plausibleDomain,
    });
  }
}

export function trackPageView(path, title) {
  if (typeof window === 'undefined') return;

  initAnalytics();

  if (analyticsConfig.gaMeasurementId && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    });
  }

  if (analyticsConfig.metaPixelId && window.fbq) {
    window.fbq('track', 'PageView');
  }

  if (analyticsConfig.plausibleDomain && window.plausible) {
    window.plausible('pageview');
  }
}
