---
title: Getting Started - A Beginner's Guide
sidebar_position: 1
---

# A Beginner's Guide to Implementing Your First Feature Flag

Feature flags are one of the safest methods for rolling out new features, so effectively managing your flags is essential to efficient deployment. DevCycle is a feature management tool that provides a simple interface for managing your flags. In this step-by-step beginner’s guide, we’ll introduce you to the basics of DevCycle using React. Follow along to get started on your first feature flag!

## Step 1: Creating Your First Feature
The first thing you need to set up DevCycle is an account. Once you’ve created your account, you can get started with your first feature. On your DevCycle Dashboard, **click the “+” button in the header bar, or the “Create New Feature” button** on the Feature Management page.

![Create New Feature](/june-2022-create-feature.png)

Next, a screen will appear allowing you to choose a Feature Template. These options determine the default state of your feature, which can always be modified as you work on your feature.

![Feature Templates](/june-2022-feature-templates.png)

Let’s say we’re making a new feature for our application and we want to separate it from deployment until it’s ready for release. So in our case, we’ll **choose the “Release” feature template**. You can read more about our other feature templates on our docs [here](/docs/home/feature-management/getting-started/feature-types).

After choosing our feature template, we’ll be prompted to give our feature a descriptive name and a unique key. The key is how we will reference our feature and its variables in code. (DevCycle automatically suggests a key based on the entered name.) **Let’s name our feature “first feature”** and give it a little description.
![Naming our first feature](/june-2022-first-feature-name.png)

**Hit “Create Feature”** and you’ve just created your first feature!

## Step 2: Variables and Targeting Rules

Next up, we can give our flag some variables and targeting rules. DevCycle has a unique “Remote Variables” section that allows users to create multiple variables for one feature. Additionally, you can add variations to that variable for use cases like Personalization, Experimentation, and restrictions based on billing, permissions, or preferences. However, since we want to create a simple release flag in this example, we’ll stick with the two default variations: Variation On and Variation Off. 

![Remote Variables Section](/june-2022-remote-variables.png)

Once we’ve set up our variables, we can define our Targeting. DevCycle allows you to target different users for each environment all on the same page, making it quick and easy to manage who can see your feature in each stage of development. Let’s say that for our new feature release, we only want our Internal QA Users to be able to see it when it’s in development. So let’s name our targeting rule “Internal QA Users.” To set up the rule, we select a property in the “Definition” dropdown that targets our QA Users, such as their email. For this example, **let’s set our Targeting definition to User Emails containing “@devcycle.com”**

![Feature Targeting QA Users at DevCycle](/june-2022-targeting-rule-devcycle.png)

We can also customize other aspects of our flag. The “Serve” dropdown allows us to choose which variation will apply to our targeting rule. In our case, we’ll keep it set to “Variation On” for our QA Users. The “Scheduling” dropdown allows us to schedule the release for later. We’ll leave the Scheduling set to “None.”

Since targeting rules are specific to each environment in a project, we can provide different rules for each stage of our feature’s deployment. For this tutorial we’ll just be working in the Development environment, so we can leave the targeting rules for Staging and Production environments as is. 

Now that we’ve set up our targeting, we’re ready to implement our feature into our code.

## Step 3: Creating A React App
In this step, we are going to create a new React app where we will implement our feature flag. If you have already created a project, skip to [Step 4: Implementation.](#step-4:-implementation) 

We will create our React app using the terminal (if this is your first time, you can [view the React docs here](https://reactjs.org/docs/create-a-new-react-app.html). **Open your computer’s terminal**, and using the `cd` command, **open the directory where you would like to create your app**. Now enter the following command:
```jsx
npx create-react-app getting-started-devcycle
```
This will make a new React project called “getting-started-devcycle”

Now open the directory of the new React app, and start the development server on your local device.
```jsx
cd getting-started-devcycle
```
```jsx
npm start
```
The command should open the React app in your browser:

![Blank React App](/june-2022-new-react-app.jpeg)

Now we can edit our app using VSCode. If you haven’t already, first **install the `shell` command**. To do this, open VSCode and hit <kbd>CMD ⌘</kbd>+<kbd>P</kbd>. Type in `> shell` and click on `Shell Command: Install 'code' command in PATH`. This allows us to open VSCode from the terminal.

**Open a new window of your terminal** (make sure to keep open the window that is running your React app). `**cd` into the directory where you created your React app** and open your project:
```jsx 
cd getting-started-devcycle 
```
```jsx
code .
```
This will open our app on VSCode.

In VSCode **open the `App.js` file under the `src` folder**. The code that appears should look like this:

![Blank React App Code](/june-2022-blank-react-app-code.png)

We can **delete `import logo from '.logo.svg'` on line 1** as we don’t need it for this example.  
Now that we have our app, we’re ready to implement our DevCycle feature flag!

## Step 4: Implementation
To implement our feature flag, we need to set up the proper SDK—in this case, the React Client. For more information about our other SDKs types, [check out our documentation here](https://docs.devcycle.com/docs/home/feature-management/getting-started/setting-up-sdk).

To install the React SDK, run the following command on your terminal 
```jsx
npm install --save @devcycle/devcycle-react-sdk
```

Next, we import DevCycle and initialize it. An example usage of our feature flag is conveniently located in the “Example Usage” section on our feature’s DevCycle page. This gives us the code we need to import and initialize DevCycle. **Under the drop-downs in the “Example Usage” section, select:**
- the environment we’re initializing for (**Development**)
- the variable we’re using (**first-feature**)
- and the SDK we’re initializing it with (**Client - React**)

![Example usage on DevCycle Dashboard](/june-2022-example-usage-dashboard.jpeg)

DevCycle then provides you with the code you need, along with your unique SDK Key, to access your feature flag in your application. The provided code for your  feature flag will look like this, with `YOUR_CLIENT_KEY_HERE` replaced with your actual client key:

```jsx
import { asyncWithDVCProvider, useVariable } from '@devcycle/devcycle-react-sdk'

(async () => {
  const user = {
      user_id: 'my_user_id'
  }
  const DVCProvider = await asyncWithDVCProvider({ envKey: 'YOUR_CLIENT_KEY_HERE', user })

  render(
      <DVCProvider>
          <App />
      </DVCProvider>
  )
})();

const App = () => {
    const variableKey = 'first-feature'
    const defaultValue = false
    const featureVariable = useVariable(variableKey, defaultValue)

    return (
        <div>
          {featureVariable?.value ? <div>Variable on!</div> : <div>Variable off</div>}
        </div>
    )
}
```

Copy the code above (or the one provided in the “Example Usage” section of your feature flag’s page), and use it to replace the whole `function App () {...}` section in VSCode. **Replace `YOUR_CLIENT_KEY_HERE` with your client key** found in the “Example Usage” section. You can also find your keys from **Profile → Settings → Environments & Keys** in DevCycle.

![Environments & Keys Page](/june-2022-sdk-keys.png)
For more information about SDK keys, [head to our docs here](https://docs.devcycle.com/docs/home/feature-management/organizing-your-flags-and-variables/api-and-sdk-keys).

Once you’ve pasted your client key, you should now have something that looks like this in VSCode:

![Pasted from example usage](/june-2022-example-usage-code-react.jpeg)

Notice how line 8 includes your client key. **A good practice is to use a constant variable instead whenever you use your key.** That way, we avoid any typo errors as we use our key throughout the code. After line 4, add the following:

```jsx
const ENV_KEY = 'YOUR_KEY_HERE'
```

**Replace `YOUR_KEY_HERE` with your client key**, and **use the new `ENV_KEY` variable** whenever you need to access your key.

There are a few more things we need to modify if we're using React 18. **Add the following to the beginning of your code:**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
```
Now **replace the `render(...)` section of your code** with the following:
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<DVCProvider>
			<App />
		</DVCProvider>
    </React.StrictMode>,
	document.getElementById('root')
)
```
The resulting code should look like this:

![Modified code from example usage](/june-2022-example-usage-code-react-2.jpeg)

## Step 5: Our Flag in Action

One way we can see our flag in action is to edit our user’s properties in our code. Since we have “Variation On” for all users with a DevCycle email, if we do not have our user email set to something containing ‘@devcycle.com’, we won’t see our feature. To see this in action, **save your code and open the tab where your React app is running.**

![Variable Off in React App](/june-2022-variable-off.png)

We can see that our app is running the code telling us our variable is off. This is because our code does not contain an email field for our user. Let’s create one now!

**Add an `email` field to your `user` object**, and give it a DevCycle email as shown below:
```jsx
const user = { 
	user_id: 'my_user_id' , 
	email: 'user@devcycle.com' 
}
```

**Save your code and return to your React app** (you may need to refresh it).

![Variable On in React App](/june-2022-variable-on.png)  
Hooray! Our Internal QA users can now see our feature!

Another way to see our flag working is to toggle the Targeting switch on the feature page in DevCycle. Go into DevCycle and edit the ‘first feature’ flag we created. **Turn off the toggle we had set for the Development stage and save it.**

![Targeting Toggle Off](/june-2022-targeting-toggle.gif)

Now we won’t be able to see our feature regardless of our email address. If we return to our React app, we’ll see that the variable is off.

And now we have our first working Feature Flag! We can easily switch our Targeting toggle on and off as necessary. Now that you know how to use DevCycle, it's time to put these skills to work! Check out our [GitHub repository here](https://github.com/DevCycleHQ/getting-started-with-devcycle) to explore our code for this tutorial. Leverage DevCycle today to improve your feature flag management and enable continuous deployment.
