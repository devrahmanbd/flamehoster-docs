const ANALYTICS_ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
const ANALYTICS_WEBSITE_ID = import.meta.env.VITE_ANALYTICS_WEBSITE_ID as string | undefined;

export function bootstrapAnalytics() {
  if (!ANALYTICS_ENDPOINT || !ANALYTICS_WEBSITE_ID || typeof document === "undefined") return;
  if (document.querySelector("script[data-brick-analytics]")) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = `${ANALYTICS_ENDPOINT.replace(/\/$/, "")}/umami`;
  script.dataset.websiteId = ANALYTICS_WEBSITE_ID;
  script.dataset.brickAnalytics = "true";
  script.dataset.domains = window.location.hostname;
  document.head.appendChild(script);
}
