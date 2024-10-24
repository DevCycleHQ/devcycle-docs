---
title: React SDK Typescript Usage
sidebar_label: Typescript
sidebar_position: 4
description: SDK features for Typescript users
sidebar_custom_props: {icon: cib:typescript}
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/react-client-sdk)](https://www.npmjs.com/package/@devcycle/react-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

# Typescript Usage

The DevCycle React SDK is written in Typescript and includes a full Typescript interface.

It is also possible to enhance the type safety of the SDK by using the
[Devcycle CLI](https://docs.devcycle.com/tools-and-integrations/cli) to generate a type definition
based on the complete set of variables defined in your project. Using this method, you can ensure that your code
cannot access a variable key that is not defined in DevCycle, or treat a variable as a different type.

For example, if you have a variable with the key `my-variable` which is a `string` type, the following code would
produce a type error:

```typescript
// type error, can't use a boolean default value since we know it's a string
const myVariable = useVariableValue('my-variable', false)

...

// type error, can't use the unknown key 'some-key'
const myVariable = useVariableValue('some-key', 'default-value')

...

// this works, since we know this key exists and is a string
const myVariable = useVariableValue('my-variable', 'default-value')
```

## Usage

To use this enhanced type-safety, you can use the CLI to generate a set of Typescript overrides which will
increase the specificity of the SDK's hooks to check for keys and types specific to your project.

### CLI

To generate the type definitions with the CLI, you can use the `generate types` command like so:

```shell
dvc generate types --react
```

See the [documentation](https://github.com/DevCycleHQ/cli/blob/main/docs/generate.md#dvc-generate-types) for this command

Ensure that the CLI is properly setup and authenticated to your project before running this command. See the [CLI docs](https://docs.devcycle.com/tools-and-integrations/cli)
for further instructions on setting up the CLI.

This command will generate a file called `dvcVariableTypes.ts` in the configured output directory. This file contains
new definitions for the `useVariable` and `useVariableValue` hooks which wrap the original SDK methods in more specific
types. These wrapped methods should now be used in place of the original methods provided by the SDK.

Consider configuring this command to run as part of your build process to keep your type definitions up to date with
the latest configuration from DevCycle.

:::info

Any Variables that are a part of a [Completed Feature](../essentials/status-and-lifecycle#completing-a-feature) will be marked as deprecated in the types output. This is a powerful aid for Variable cleanup, because you can see which Variables need to be cleaned up right in your code.

:::
