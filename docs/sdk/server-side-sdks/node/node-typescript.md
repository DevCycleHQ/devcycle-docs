---
title: Node.js SDK Typescript Usage
sidebar_label: Typescript
sidebar_position: 4
description: SDK features for Typescript users
sidebar_custom_props: {icon: cib:typescript}
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nodejs-server-sdk)](https://www.npmjs.com/package/@devcycle/nodejs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

# Typescript Usage

The DevCycle Node.js SDK is written in Typescript and includes a full Typescript interface.

It is also possible to enhance the type safety of the SDK by using the
[Devcycle CLI](/cli) to generate a type definition
based on the complete set of variables defined in your project. Using this method, you can ensure that your code
cannot access a variable key that is not defined in DevCycle, or treat a variable as a different type.

For example, if you have a variable with the key `my-variable` which is a `string` type, the following code would
produce a type error:

```typescript
const user = { user_id: 'my_user' }

// type error, can't use a boolean default value since we know it's a string
const myVariableValue = devcycleClient.variableValue('my-variable', user,  false)

...

// type error, can't use the unknown key 'some-key'
const myVariableValue = devcycleClient.variableValue('some-key', user, 'default-value')

...

// this works, since we know this key exists and is a string
const myVariableValue = devcycleClient.variableValue('my-variable', user, 'default-value')
```

## Usage
To use this enhanced type-safety, you can define a type containing the variable keys and their types

```typescript
type VariableTypes = {
  'my-variable': string
}
````

You can then use `declare module` interface merging to augment the types the SDK uses:
```typescript
declare module '@devcycle/types' {
  interface CustomVariableDefinitions extends VariableTypes {}
}
```

You can alternatively pass the definition as a generic argument to the `initializeDevCycle` function:

```typescript
const dvcOptions = { logLevel: 'debug' }
const devcycleClient = await initializeDevCycle<VariableTypes>(
  '<DEVCYCLE_SERVER_SDK_KEY>',
  dvcOptions,
).onClientInitialized()
```

The keys of `VariableTypes` must match the keys of the variables defined in DevCycle, and the values must match the
expected type of the variable.

You can write this definition manually, but it's recommended to generate it automatically as part of your build process
by using the CLI.

### CLI

To generate the type definitions with the CLI, you can use the `generate types` command like so:

```shell
dvc generate types
```

See the [documentation](https://github.com/DevCycleHQ/cli/blob/main/docs/generate.md#dvc-generate-types) for this command

Ensure that the CLI is properly setup and authenticated to your project before running this command. See the [CLI docs](/cli)
for further instructions on setting up the CLI.

This command will generate a file called `dvcVariableTypes.ts` in the configured output directory.
The generated output will contain the `declare module` statement to automatically augment the SDK's types.

Consider configuring this command to run as part of your build process to keep your type definitions up to date with
the latest configuration from DevCycle.
