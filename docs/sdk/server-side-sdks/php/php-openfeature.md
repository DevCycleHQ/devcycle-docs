---
title: PHP OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 4
description: How to implement the OpenFeature Provider
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature Provider

## AI-Powered Install

import MCPInstall from '@site/docs/_partials/mcpInstall.mdx'
import AIPoweredInstall from '@site/src/components/AIPoweredInstall'
import PromptContent from '!!raw-loader!@site/static/ai-prompts/php-openfeature.md'

<MCPInstall />

<AIPoweredInstall promptContent={PromptContent} />

OpenFeature is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works
with DevCycle.

DevCycle provides a PHP implementation of the [OpenFeature](https://openfeature.dev/) Provider interface, if you prefer
to use the OpenFeature API.

## Usage

### Installation

The OpenFeature Provider is included in the DevCycle SDK for PHP natively. It's compatible with both Cloud, and SDK
proxy modes.

[//]: # 'wizard-install-start'

To install the bindings via [Composer](https://getcomposer.org/), add the following to `composer.json`:

```json
{
  "require": {
    "devcycle/php-server-sdk": "*"
  }
}
```

Then run `composer install`

Once the composer install is complete, a `vendor` folder should be generated at the root of your project. Include this at the start of your app index file:

```php
require_once(__DIR__ . '/vendor/autoload.php');
```
[//]: # 'wizard-install-end'


### Getting Started
[//]: # 'wizard-initialize-start'

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
[//]: # 'wizard-initialize-end'

### Evaluate a Variable
[//]: # 'wizard-evaluate-start'

Use a Variable value by setting the EvaluationContext, then passing the Variable key and default value to one of the OpenFeature flag evaluation methods.

```csharp
// Create a new user attribute object that can be used by OpenFeature as part of the flag evaluation process.
$user_attributes = new Attributes(array("user_id" => "my-user"));

// Create a new evaluation context for the feature flag evaluations. This context is used to provide user or environment details for flag evaluations in OpenFeature.
$openfeature_context = new EvaluationContext(attributes: $user_attributes);

// Use the OpenFeature client to get the string value of the "string-flag" feature flag.
$flag_value = $openfeature_client->getStringValue("string-flag", "default", $openfeature_context);

```
[//]: # 'wizard-evaluate-end'


### Required TargetingKey

For DevCycle SDK to work we require either a `targetingKey` or `user_id` to be set on the OpenFeature context.
This is used to identify the user as the `user_id` for a `DevCycleUser` in DevCycle. Setting the `user_id` property
will take priority over `targetingKey`.

### Context properties to DevCycleUser

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to
the `DevCycleUser` object.

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

Context properties that are not known `DevCycleUser` properties will be automatically
added to the `CustomData` property of the `DevCycleUser`.

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will throw an exception.

For example `nested` will be ignored:

```php
$attributes = new Attributes(array("key"=>"value", "number"=>1, "bool"=>true, "nested"=>array("key"=>"value")));
self::$context = new EvaluationContext('user', $attributes);
```
