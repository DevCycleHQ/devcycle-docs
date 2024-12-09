---
title: Rollbar

---

The DevCycle Rollbar integration enhances error tracking by adding feature configuration data directly to your Rollbar error logs. By sending DevCycle Feature and Variable data from the DevCycle SDKs to Rollbar, developers can gain valuable insights into the specific feature configuration that was delivered to a user during an error.

## Configuration

### Including DevCycle Features in your Rollbar Config

Supply Feature and/or Variable data to all errors by adding them to the Rollbar config.

**Steps**:
1. Get all Features and/or all Variables from the DevCycle SDK.
2. Create a custom field called `devCycleSettings` within your Rollbar config payload.
3. Add your Features and Variables to the `devCycleSettings` object.

Example:

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

Provide Feature and/or Variable data to specific errors that you log to Rollbar. 

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

To learn how to create service links in Rollbar, visit [here](https://docs.rollbar.com/docs/service-links#devcycle)