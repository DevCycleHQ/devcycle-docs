export function onRouteDidUpdate({ location, previousLocation }) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (
    location.pathname !== previousLocation?.pathname &&
    typeof window !== 'undefined'
  ) {
    window.rudderanalytics.track('Loaded a Page', { url: location.pathname })
  }
}
