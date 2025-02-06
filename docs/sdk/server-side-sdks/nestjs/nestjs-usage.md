---
title: NestJS SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/nestjs-server-sdk)](https://www.npmjs.com/package/@devcycle/nestjs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## DevCycle Client

[//]: # (wizard-evaluate-start)

With the DevCycleModule imported, the `DevCycleClient` can be injected into your controllers or providers.

The NestJS SDK is a wrapper for DevCycle's Node.js SDK. For more information about methods available on the DevCycleClient, see the [Node.js Usage documentation](/sdk/server-side-sdks/node/node-usage).

```typescript
import { DevCycleClient } from '@devcycle/nestjs-server-sdk'

export class MyController {
  constructor(private readonly devcycleClient: DevCycleClient) {}

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

[//]: # (wizard-evaluate-end)

## DevCycle Service

With the DevCycleModule imported, the `DevCycleService` can be injected into your controllers or providers. The DevCycleService methods evaluate variables with the user returned from your [userFactory](/sdk/server-side-sdks/nestjs/nestjs-gettingstarted#user-factory), so you don't need to specify a user each time a method is called.

```typescript
import { DevCycleService } from '@devcycle/nestjs-server-sdk'

export class MyService {
  constructor(private readonly devcycleService: DevCycleService) {}

  async update() {
    const enabled = this.devcycleService.isEnabled('allow-feature-edits')
    if (enabled) {
      // do something
    }
  }
}
```

### variableValue

The `variableValue` method accepts a variable key and default value, and returns the served value.

```typescript
const value = this.devcycleService.variableValue('variable-key', 'hello world')
```

### isEnabled

The `isEnabled` method accepts a key for a boolean variable. The default value is always `false` when using the `isEnabled` method.

```typescript
const enabled = this.devcycleService.isEnabled('boolean-variable')
```

### getUser

The `getUser` method returns the user object from your [userFactory](/sdk/server-side-sdks/nestjs/nestjs-gettingstarted#user-factory).

```typescript
const devcycleUser = this.devcycleService.getUser()
```

## Decorators

DevCycle decorators evaluate variables with the user returned from your [userFactory](/sdk/server-side-sdks/nestjs/nestjs-gettingstarted#user-factory), so you don't need to specify a user each time a decorator is used.

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

## Realtime Updates

This feature reduces the number of polling requests that are made to the DevCycle Config CDN, and instead will
use a long-lived HTTP connection (Server Sent Events) to receive updates when there is a new config available.
This reduces outbound network traffic, as well as optimizes the SDK for efficiency.

To disable realtime updates, pass in the `disableRealtimeUpdates` option to the SDK initialization:

```typescript
import { DevCycleModule } from '@devcycle/nestjs-server-sdk'

DevCycleModule.forRoot({
  key: '<DEVCYCLE_SERVER_SDK_KEY>',
  options: {
    disableRealtimeUpdates: true,
  },
})
```
