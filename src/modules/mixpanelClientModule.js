import mixpanel from 'mixpanel-browser'
mixpanel.init('a31a8987dc6ba699cbca6728fa482473', { debug: false })

export function onRouteDidUpdate({ location, previousLocation }) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (location.pathname !== previousLocation?.pathname) {
    mixpanel.track('Page View', { url: location.pathname })
  }
}
