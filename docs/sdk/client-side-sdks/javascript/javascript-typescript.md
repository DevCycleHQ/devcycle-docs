---
title: Javascript SDK Typescript Usage
sidebar_label: Typescript
sidebar_position: 4
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/js-client-sdk)](https://www.npmjs.com/package/@devcycle/js-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

# Typescript Usage

The DevCycle JS SDK is written in Typescript and includes a full Typescript interface.

It is also possible to enhance the type safety of the SDK by using the
[Devcycle CLI](https://docs.devcycle.com/tools-and-integrations/cli) to generate a type definition
based on the complete set of variables defined in your project. Using this method, you can ensure that your code
cannot access a variable key that is not defined in DevCycle, or treat a variable as a different type.

For example, if you have a variable with the key `my-variable` which is a `string` type, the following code would
produce a type error:

```typescript
// type error, can't use a boolean default value since we know it's a string
const myVariable = devcycleClient.variable('my-variable', false)

...

// type error, can't use the unknown key 'some-key'
const myVariable = devcycleClient.variable('some-key', 'default-value')

...

// this works, since we know this key exists and is a string
const myVariable = devcycleClient.variable('my-variable', 'default-value')
```

## Usage

To use this enhanced type-safety, you can pass a type definition containing the variable keys and types
to the `initializeDevCycle` function:

```typescript
type VariableTypes = {
  'my-variable': string
}

const user = { user_id: 'my_user' }
const dvcOptions = { logLevel: 'debug' }
const devcycleClient = initializeDevCycle<VariableTypes>(
  '<DEVCYCLE_CLIENT_SDK_KEY>',
  user,
  dvcOptions,
)
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

Ensure that the CLI is properly setup and authenticated to your project before running this command. See the [CLI docs](https://docs.devcycle.com/tools-and-integrations/cli)
for further instructions on setting up the CLI.

This command will generate a file called `dvcVariableTypes.ts` in the configured output directory.
You can then import the generated types from this file, and pass them to the generic arg of the `initializeDevCycle` call as
described above.

Consider configuring this command to run as part of your build process to keep your type definitions up to date with
the latest configuration from DevCycle.
