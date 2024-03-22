---
title: Nest.js SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nestjs-server-sdk)](https://www.npmjs.com/package/@devcycle/nestjs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## DevCycle Client
With the DevCycleModule imported, the `DevCycleClient` can be injected into your controllers or providers.

The Nest.js SDK is a wrapper for DevCycle's Node.js SDK. For more information about methods available on the DevCycleClient, see the [Node.js Usage documentation](/sdk/server-side-sdks/node/node-usage).

```typescript
import { DevCycleClient } from '@devcycle/nestjs-server-sdk'

export class MyController {
    constructor(
      private readonly devcycleClient: DevCycleClient
    ) {}

    async update() {
      const user = {
        user_id: 'user1@devcycle.com',
        name: 'user 1 name',
        customData: {
          customKey: 'customValue',
        },
      }
      const variable = this.devcycleClient.variable(user, 'test-variable', false)
    }
}
```

## Decorators

DevCycle decorator evaluate variables with the user returned from your [userFactory](/sdk/server-side-sdks/nestjs/nestjs-gettingstarted#user-factory), so you don't need to specify a user each time a decorator is used.

### VariableValue
The `VariableValue` decorator can be used to access variable values directly in your route handlers.

```typescript
async findAll(
  @VariableValue({ key: 'test-variable', default: false }) testValue: boolean,
) {
  if (testValue) {
    // do something
  }
}
```

### RequireVariableValue
The `RequireVariableValue` decorator can be used to guard an endpoint or controller.
If the user is not served the specified value, the request will return a 404 NotFound as though the endpoint does not exist.

```typescript
@RequireVariableValue({
  'test-variable': true
})
async findAll() {
  ...
}
```