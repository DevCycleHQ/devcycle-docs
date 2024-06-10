---
title: Quickstart Tutorial
sidebar_position: 1
---

In this tutorial, we'll introduce some of the core features of DevCycle while showcasing a great use-case for feature flags: **Maintenance Mode in a React application.**

https://www.youtube.com/watch?v=RHpoc9TTR8U

---

## Create a New Account

If you don't have an account with DevCycle, you can [create a completely free account here](https://app.devcycle.com/?isSignUp=true).

We offer an always free tier to start, with pricing that scales with usage as needed. For more details on our pricing, [check it out here](https://devcycle.com/pricing).

## Create a Feature

On the DevCycle Dashboard, access the "Feature Management" page via the `Features` button on the top navbar. Click the blue `+ Create New Feature` button (or select the "+" button in the main navbar) to begin the Feature creation process.

To create a Feature:

1. Click either the "+" button or the "Create new Feature" button.
2. Choose an `Ops Feature` from the options modal. To read more about the Feature types and their uses, see [DevCycle Feature Types](/essentials/features).
3. After choosing a type, name and describe your Feature:
    - **Feature name:** For our example, this will be `Maintenance Mode`.
    - **Feature key:** This key is how the Feature and its Variables will be referenced in code. (A key of `maintenance-mode` will be automatically suggested based on the entered name.)
    - **Initial Variable Key:** Define an initial Variable key that can differ from the new Feature key name. The Feature Key and the Initial Variable Key will mimic the input entered in the Feature Name field formatted in kebab case (e.g., `maintenance-mode`).
    - **Initial Variable Type:** Select `Boolean` for this example.
4. Click "create".

Congratulations! You have now created the `Maintenance Mode` Operational Feature within your project.

## Copy SDK Key

1. Click on the View SDK Keys (i.e., Key Icon) in the top navbar.
2. Copy the first SDK key you see, which should be for the Client in the Development environment.
   ![alt text](/tutorial/tutorial-keys.png)
3. Save this key for later.

---

## Create a New React App

In your terminal, run the following commands to spin up a new React app.

```bash
npx create-react-app my-app
cd my-app
npm start
```

If successful, you should see the following in your terminal:

![alt text](https://cdn.jsdelivr.net/gh/facebook/create-react-app@27b42ac7efa018f2541153ab30d63180f5fa39e0/screencast.svg)

> Image taken from the [Getting Started documentation on create-react-app.dev](https://create-react-app.dev/docs/getting-started)

And if you visit `localhost:3000`, you should see the default React app page:

![alt text](/tutorial/tutorial-default.png)


---

## Implement the DevCycle SDK

Now that you have a Maintenance Mode Feature created, its time to install the SDK and implement your first Variable:

**1. Install the DevCycle SDK via the relevant dependency manager.** 

For this example, the React SDK is installed via npm:

```bash
npm i @devcycle/react-client-sdk
```
or via yarn:

```bash
yarn add @devcycle/react-client-sdk
```

**2. Import DevCycle and initialize it.** 
Depending on which [type of SDK](/sdk/) and which environment you are initializing for, the SDK Key will be different. Read more about [Environments](/essentials/environments) and [keys](/essentials/keys) in the essentials.

To initialize DevCycle, head over to `App.js` and add the following to the import statements at the top of the file"

```javascript
import { withDevCycleProvider } from "@devcycle/react-client-sdk";
```

Next wrap your App component with `withDevCycleProvider`, providing your SDK Key, to allow DevCycle to be used throughout your React app:

```javascript
export default withDevCycleProvider({
  sdkKey: "dvc_client_********_fff1111",
})(App);
```

**3. Access your Variable.** 

Implement the code to evaluate the Variable that is being controlled by the Feature you just created. Read more about Variables [here](/essentials/variables).

To access the variable, you'll first need to import the `useVariableValue` hook at the top of `App.js`


```javascript
import { useVariableValue } from "@devcycle/react-client-sdk";
```

Next you will use the `useVariableValue` hook to access the Maintenance Mode variable you created earlier. Create a new `maintenanceMode` constant inside your `App()` function which calls `useVariableValue` with two parameters: the `maintenance-mode` key and then a default value for this flag, which in your case will be `false`:

```javascript
function App() {
const maintenanceMode = useVariableValue("maintenance-mode", false);
// Additional hooks and logic
}
```

**4. Add Maitenance Mode Page and Set evaluation logic** 
Finally, you will add logic to conditionally render either the maintenance page or the default app content based on the variable's value.

Here is the full code implementing that logic:

```javascript
function App() {
  const maintenanceMode = useVariableValue("maintenance-mode", false);

  if (maintenanceMode) {
    return (
      <div className="App">
        <article>
          <h1>We&rsquo;ll be back soon!</h1>
          <div>
            <p>
              Sorry for the inconvenience but we&rsquo;re performing some
              maintenance at the moment. If you need to you can always{" "}
              <a href="mailto:#">contact us</a>, otherwise we&rsquo;ll be back
              online shortly!
            </p>
            <p>&mdash; The Team</p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
```

## Modify Targeting

Variables deliver different values to different users via Targeting Rules. During the creation process for our "Maintenance Mode" feature, some initial Targeting Rules were set up to serve `Configuration 1` or `true` for your personal email address in the development environment. In this example, we haven't set any User Properties to target, so we'll update these targeting rules to impact All Users, which is generally how you would want to use Maintenance Mode.

**Step 1: Change Definition**

1. Under your targeting rules, locate the rule that targets User Email.
2. Change this rule to target All Users.
3. Click save.

If everything is working, your maintenance mode should now be enabled, and you will see the maintenance mode screen.

![alt text](/tutorial/tutorial-maintenance.png)

For more information on targeting based on user data, see the documentation on [Custom Properties here](/extras/advanced-targeting/custom-properties).

## Toggle Variations

The final step is to toggle between different Variations. 

1. Revisit the `All Users` rule you just updated.
2. Change the variation from `Configuration 1` to `Configuration 2`.
3. Click save.

If everything is working, your maintenance mode should now be disabled, and you will see the normal app screen.

> That's it! You've just set up and toggled a maintenance mode feature flag running in your own app using DevCycle.

