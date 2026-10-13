---
title: Feature Obfuscation
sidebar_position: 4
---

Feature flags are often used to hide upcoming features before release. Normally, not showing the feature on a UI
is enough to conceal it from users. However, in some cases it may be important to ensure that no trace of the feature
can be found in the code that is shipped to users. This is particularly important on the web, where end-users can easily
see all the source code for the page. Even when the code is obfuscated, any strings containing text from
the new feature will still be present in the bundle. From that, intrepid users can often infer the nature of a
feature they can't access, which may lead to sensitive or strategic information being leaked.

To prevent this, DevCycle supports a feature allowing you to obfuscate all the Variable keys used in your code in Web
platforms (React, Next.js, Javascript etc.) to keep their names private. Next.js users can also take advantage of our SDK's
[Conditional Deferred Rendering](/sdk/client-side-sdks/nextjs/nextjs-usage-app#conditional-deferred-rendering-renderifenabled) feature, which will strip out any source code for features the user isn't eligible for,
reducing bundle size while also keeping the feature's details private.

To use this feature, follow the setup guide below:

## Requirements
This feature is only available for web platforms. It is not available for mobile or server-side SDKs.
The following SDKs support obfuscation:
- Javascript
- React
- Next.js

The unobfuscated data will still be available via the mobile and server SDK tokens. If you have a need for obfuscation
on mobile, please [contact us](mailto:support@devcycle.com).

Using the feature requires use of the [DevCycle CLI](https://docs.devcycle.com/cli/). Follow the setup guide in the 
CLI documentation to install it and initialize in your repository.

## Setup

In order to use obfuscation, the first step is to pass the `enableObfuscation` setting in your DevCycle SDK 
initialization options. This process will vary by SDK, but here is an example for React:
```jsx
import { withDevCycleProvider } from '@devcycle/react-client-sdk'
function App() {
    return <TheRestofYourApp />
}
export default withDevCycleProvider({ 
    sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>', 
    // add this setting
    options: { enableObfuscation: true } 
})(
    App,
)
```

With obfuscation enabled, you can use the [DevCycle CLI](https://docs.devcycle.com/cli/) to generate a
set of constants which correspond to your project's Variable keys.

To do so, run the following command:
```bash
dvc generate types --obfuscate
```

If using React or Next.js, add the `--react` flag:
```bash
dvc generate types --obfuscate --react
```

The result will be a generated file containing type definitions and constants for all your project's Variables,
with the keys obfuscated. The obfuscation process is done automatically using a key stored in your project's data, which
is only known to the DevCycle Management API and the DevCycle CLI.

An example of the generated file output you might expect is shown below.:
```typescript
// devcycleTypes.ts

/*
key: my-first-variable
created by: Sally Smith
created on: 2024-03-01
*/
export const MY_FIRST_VARIABLE = 'dvc_obfs_3499747d616cfb0ac00bda26273e3577d5508f1ecaf2f1f07a2546' as ObfuscatedKey<'my-first-variable'>

/*
key: my-second-variable
created by: Joe Shmo
created on: 2024-03-01
*/
export const MY_SECOND_VARIABLE = 'dvc_obfs_359f6c73757fe30a9950ce39333c2329915a900893b3fbf164' as ObfuscatedKey<'my-second-variable'>
```

:::info
The generated file also includes Typescript definitions of each Variable, which allows you to make your DevCycle usage
type-safe by enforcing the correct datatype for each Variable. When using an 
[enum schema](/platform/security-and-guardrails/variable-schemas), 
the types will also enforce that one of the allowed values is used. For more information, see the documentation for 
[Typescript with the Javascript SDK](/sdk/client-side-sdks/javascript/javascript-typescript)
:::

The names of the constants will be automatically determined based on each Variable's key. If two Variable keys resolve
to the same constant name, the CLI will append a number to the end of the constant name to avoid conflicts. The original
Variable key will be preserved in the comment above the constant, so you can identify one constant from another.

Now, in each place where a DevCycle Variable is evaluated, you can use the generated constants in place of direct strings.
The constants have been automatically assigned to the obfuscated keys, so there will be no plain strings containing
your Variable keys in code. For example:

Before:
```jsx
import { useVariableValue } from '@devcycle/react-client-sdk'
function MyComponent() {
    const myFirstVariable = useVariableValue('my-first-variable', false)
    const mySecondVariable = useVariableValue('my-second-variable', false)
    return <div>{myFirstVariable} {mySecondVariable}</div>
}
```

After:
```jsx
import { MY_FIRST_VARIABLE, MY_SECOND_VARIABLE, useVariableValue } from './devcycle'
function MyComponent() {
    const myFirstVariable = useVariableValue(MY_FIRST_VARIABLE, false)
    const mySecondVariable = useVariableValue(MY_SECOND_VARIABLE, false)
    return <div>{myFirstVariable} {mySecondVariable}</div>
}
```

As long as your production build process is set up to uglify your production code, any trace of the original 
DevCycle Variable names will disappear. That's it!

## Requiring Obfuscation
As an extra measure of safety, you can require obfuscation in your DevCycle project settings. This will prevent 
requests for SDK configuration using a client SDK key from obtaining unobfuscated keys, by requiring that the SDK
is initialized with "enableObfuscation". It is recommended to require obfuscation when creating a
new DevCycle project. If you are adding obfuscation to an existing project, you may want to
leave this setting off until you have updated your code to use obfuscated keys, otherwise existing applications
will no longer be able to receive a DevCycle configuration.

## Development Workflow and CI
When using obfuscation, it is necessary to ensure that the generated constants are kept up to date with your project's
set of possible Variable keys. There are different ways to accomplish this depending on your specific workflow, but in
general we recommend committing the generated `devcycleTypes` file to source control and regenerating the file when
a new Variable is added to DevCycle. To accomplish this more automatically, you can run the generator as part of a 
command which builds and runs your code in a local environment. This will ensure that each time you run the local 
code, the file is updated with the latest Variables.

### Archiving Variables
When you archive a Variable in DevCycle, it will no longer appear in the generated output from the CLI. Make sure
that Variables are no longer used in your code before archiving. 


## Conditional Deferred Rendering

Next.js users can take this a step further by also withholding any application source code that won't be used when
a user is ineligible for a feature. This can improve page load performance while also hiding implementation details
of features from users who shouldn't see them.

To use this feature, follow the documentation for [Conditional Deferred Rendering](/sdk/client-side-sdks/nextjs/nextjs-usage-app#conditional-deferred-rendering-renderifenabled).

When passing the Variable key to be evaluated, make sure to pass the obfuscated constant generated by the CLI.


