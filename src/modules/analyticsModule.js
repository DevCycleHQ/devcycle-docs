const RudderAnalytics = require('@rudderstack/rudder-sdk-node');

const client = new RudderAnalytics("2U4ReRYBAsyeoBkDlIW9P4CitLU", {
  dataPlaneUrl: "https://analytics.devcycle.com",
});

export function onRouteDidUpdate({ location, previousLocation }) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (location.pathname !== previousLocation?.pathname) {
    client.track('Page View', { url: location.pathname })
  }
}
