---
title: Ruby OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 4
description: How to implement the OpenFeature Provider
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature Provider

OpenFeature is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides a Ruby implementation of the [OpenFeature](https://openfeature.dev/) Provider interface, if you prefer to use the OpenFeature API.

[![GitHub](https://img.shields.io/github/stars/devcyclehq/ruby-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ruby-server-sdk)

## Usage

### Installation
[//]: # (wizard-install-start)

Install the OpenFeature Ruby SDK and DevCycle Provider:

```shell
gem install devcycle-ruby-server-sdk
```

or 

```shell
bundler add devcycle-ruby-server-sdk
```


[//]: # (wizard-install-end)

### Getting Started
[//]: # (wizard-initialize-start)

Initialize the DevCycle SDK and set the DevCycleProvider as the provider for OpenFeature:

```ruby
require 'open_feature/sdk'
require 'devcycle-ruby-server-sdk'

dvc_client = DevCycle::Client.new(ENV['DEVCYCLE_SERVER_SDK_KEY'], DevCycle::Options.new)
OpenFeature::SDK.configure do |config|
    config.set_provider(dvc_client.open_feature_provider)
end
@open_feature_client = OpenFeature::SDK.build_client
```
[//]: # (wizard-initialize-end)

### Evaluate a Variable
Use a Variable value by setting the EvaluationContext, then passing the Variable key and default value to one of the OpenFeature flag evaluation methods.

[//]: # (wizard-evaluate-start)

```ruby
context = OpenFeature::SDK::EvaluationContext.new(user_id:'user_id')
flag_value = @open_feature_client.fetch_integer_value(flag_key: 'flag_key', default_value: 1, evaluation_context: context)
```
[//]: # (wizard-evaluate-end)

### Required Targeting Key

For the DevCycle SDK to work we require either a `targeting_key` or `user_id` to be set on the OpenFeature context.
This is used to identify the user as the `user_id` for a `DevCycleUser` in DevCycle.

### Context properties to DevCycleUser

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the `DevCycleUser` object.
[DevCycleUser Ruby Interface](https://github.com/DevCycleHQ/ruby-server-sdk/blob/main/lib/devcycle-ruby-server-sdk/models/user.rb)

For example all these properties will be set on the `DevCycleUser`:

```ruby
# Pass context when querying values from the OpenFeature client
context = OpenFeature::SDK::EvaluationContext.new(
    user_id: 'user_id',
    email: 'email',
    name: 'name',
    appBuild: 1,
    appVersion: '1.0.0',
    randomField: 'value',
    privateCustomData: { 'secretkey' => 'secretvalue' },
    customData: { 'key' => 'value' })
```

Context properties that are not known `DevCycleUser` properties will be automatically
added to the `customData` property of the `DevCycleUser`.

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will be ignored.

For example `obj` will be ignored:

```ruby
context = OpenFeature::SDK::EvaluationContext.new(
    user_id: 'user_id',
    obj: { 'secretkey' => 'secretvalue' })
```

### JSON Flag Limitations

The OpenFeature spec for JSON flags allows for any type of valid JSON value to be set as the flag value.

For example the following are all valid default value types to use with OpenFeature:

```ruby
# Invalid JSON values for the DevCycle SDK, will return defaults
open_feature_client.fetch_object_value(flag_key: 'json-variable', default_value: 1.0, evaluation_context: context)
open_feature_client.fetch_object_value(flag_key: 'json-variable', default_value: false, evaluation_context: context)
open_feature_client.fetch_object_value(flag_key: 'json-variable', default_value: 'string', evaluation_context: context)
open_feature_client.fetch_object_value(flag_key: 'json-variable', default_value: nil, evaluation_context: context)
```

However, these are not valid types for the DevCycle SDK, the DevCycle SDK only supports JSON Objects:

```ruby
# Valid JSON Object as the default value, will be evaluated by the DevCycle SDK
@client.fetch_object_value(flag_key: 'json-variable', default_value: { 'key' => 'value' }, evaluation_context: context)
```
