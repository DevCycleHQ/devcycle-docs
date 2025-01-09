---
title: Rollbar

---

Rollbar is a tool used for error logging and real-time performance tracking for your applications. Rollbar provides you with the ability to capture detailed information on errors to help diagnose and resolve issues faster. Enrich your logs further by including DevCycle Feature data into your error logging.

The DevCycle Rollbar integration enhances error tracking by adding feature configuration data directly to your Rollbar error logs. By sending DevCycle Feature and Variable data from the DevCycle SDKs to Rollbar, developers can gain valuable insights into the specific feature configuration that was delivered to a user during an error.

## Configuration

### Including DevCycle Features in your Rollbar Config

Include DevCycle Feature data to the initialization of Rollbar to allow all Rollbar errors to be populated with the specific DevCycle feature configuration at that time of the error. The exact DevCycle data and format that you pass to Rollbar can be easily configured, so feel free to experiment with the data that's available on your SDK.

In our example below, we supply all Features and Variables that the user/device received to the Rollbar config.

**Steps**:
1. Get all Features and/or all Variables from the DevCycle SDK.
2. Create a custom field called `devCycleSettings` within your Rollbar config payload.
3. Add your Features and Variables to the `devCycleSettings` object.

```jsx
import { Provider, useRollbar } from '@rollbar/react
import { 
  useDevCycleClient, useIsDevCycleInitialized, useVariableValue, withDevCycleProvider 
} from '@devcycle/react-client-sdk'
...
function MyComponent() {
  const devCycleClient = useDevCycleClient()
  const devCycleFeatures = devCycleClient.allFeatures()
  const devCycleVariables = devCycleClient.allVariables()
  const rollbarConfig = {
    accessToken: 'YOUR_ROLLBAR_CLIENT_ACCESS_TOKEN',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
    payload: {
      custom: {
        devCycleSettings: {
          features: devCycleFeatures, // this will send all DevCycle features in the error payload to Rollbar
          variables: devCycleVariables // this will send all DevCycle variables in the error payload to Rollbar
        }
      }
    }
  }
  
  return (
    <Provider config={rollbarConfig} >
      <TestError />
    </Provider>
}

function App() {
  const devcycleReady = useIsDevCycleInitialized()

  if (!devcycleReady) return <div><h1>DevCycle is not ready! Loading State...</h1></div>
  
  return (
    <>
      <div>
        <Router>
          <Routes>
              <Route path="/" element={<MyComponent />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default withDevCycleProvider({
  sdkKey: 'YOUR_DEVCYCLE_SDK_KEY', 
  user: { user_id: 'USER_ID', isAnonymous: false } 
})(App)

```

---

### Including DevCycle Features on Specific Errors

Rollbar allows you to define extra properties for an error. Instead of providing all Feature data on initialization, you may want to supply DevCycle Feature data to specific errors of you choice. 

In our example below, we're using DevCycle to determine whether a user should receive a new Feature with new behavior or the existing old behavior. If there is an error running any of those behaviors, we're logging an error to Rollbar and supplying all DevCycle Features to the error as an extra property.

**Steps**:
1. Get all Features and/or all Variables from the DevCycle SDK.
2. In your `rollbar.error` properties, add a custom field (ex: `devCycleFeature`) containing your Feature or Variable data.

Example:
```jsx
const rollbar = useRollbar();
const variableValue = useVariableValue('variable_key', false)

try {
  if (variableValue) {
    testNewBehavior()
  } else {
    oldBehavior()
  }
} catch(error) {
  if (variableValue) {
    const devcycleClient = useDevCycleClient()
    const features = devcycleClient.allFeatures()

    rollbar.error(error, { devCycleFeature: { 
      name: 'New Feature',
      id: features['feature-key']['_id']
    }})
  }
}

```

---

## Service Links

Rollbar service links allow you to create links that connect directly with DevCycle, to provide easy access to Features and Variables from the Rollbar interface.

![Screenshot of Service Link from Rollbar](/integrations/rollbar/rollbar-service-link.png)

To learn how to create service links for DevCycle, visit the Rollbar docs [here](https://docs.rollbar.com/docs/service-links#devcycle).