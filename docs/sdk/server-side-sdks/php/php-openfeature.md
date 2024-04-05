---
title: PHP OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 4
description: How to implement the OpenFeature Provider
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature Provider

OpenFeature is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works
with DevCycle.

DevCycle provides a PHP implementation of the [OpenFeature](https://openfeature.dev/) Provider interface, if you prefer
to use the OpenFeature API.

## Usage

### Installation

The OpenFeature Provider is included in the DevCycle SDK for PHP natively. It's compatible with both Cloud, and SDK
proxy modes.

### Getting Started

Initialize the DevCycle SDK and set the DevCycleProvider as the provider for OpenFeature:

```csharp
$options = new DevCycleOptions(true);
$devCycleClient = new DevCycleClient(
    sdkKey: getenv("DEVCYCLE_SERVER_SDK_KEY"),
    dvcOptions: $options);

$api = OpenFeatureAPI::getInstance();
$api->setProvider($devCycleClient->getOpenFeatureProvider());
$openFeatureClient = $api->getClient();
```

### Required TargetingKey

For DevCycle SDK to work we require either a `targetingKey` or `user_id` to be set on the OpenFeature context. This is
used to identify the user as the `user_id` for a `DevCycleUser` in DevCycle. Setting the `user_id` property will take
priority over `targetingKey`.

### Context properties to DevCycleUser

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the
`DevCycleUser` object.

For example all these properties will be set on the `DevCycleUser`:

```php

$attributes = new Attributes(
    array(
    "user_id" => "test",
    "customData" => array("customkey" => "customValue"),
    "privateCustomData" => array("privateCustomKey" => "privateCustomValue"),
    "email" => "email@email.com",
    "name" => "Name Name",
    "language" => "EN",
    "country" => "CA",
    "appVersion" => "0.0.1",
    "appBuild" => 1,
    "nonSetValueBubbledCustomData" => true,
    "nonSetValueBubbledCustomData2" => "true",
    "nonSetValueBubbledCustomData3" => 1,
    "nonSetValueBubbledCustomData4" => null)
);
$context = new EvaluationContext('user', $attributes);

```

Context properties that are not known `DevCycleUser` properties will be automatically added to the `CustomData` property
of the `DevCycleUser`.

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will throw an exception.

For example `nested` will be ignored:

```php
$attributes = new Attributes(array("key"=>"value", "number"=>1, "bool"=>true, "nested"=>array("key"=>"value")));
self::$context = new EvaluationContext('user', $attributes);
```
