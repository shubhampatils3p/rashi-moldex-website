export function initGTM(gtmId) {
  if (!gtmId || typeof window === 'undefined') return;
  if (window.dataLayer) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);} 
  gtag('js', new Date());
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
}

export function initGA4(measurementId) {
  if (!measurementId || typeof window === 'undefined') return;
  if (window.gtag) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);} 
  window.gtag = gtag;
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}
