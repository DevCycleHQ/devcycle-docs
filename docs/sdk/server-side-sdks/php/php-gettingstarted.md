---
title: PHP Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![Packagist](https://badgen.net/packagist/v/devcycle/php-server-sdk/latest)](https://packagist.org/packages/devcycle/php-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/php-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/php-server-sdk)

Please follow the [installation procedure](/sdk/server-side-sdks/php/php-install) and then run the following:

## Initializing SDK
[//]: # (wizard-initialize-start)

```php
require_once(__DIR__ . '/vendor/autoload.php');

use DevCycle\Api\DevCycleClient;
use DevCycle\Model\DevCycleOptions;
use DevCycle\Model\DevCycleUser;

$options = new DevCycleOptions();
$devCycleClient = new DevCycleClient(
    sdkKey: getenv("DEVCYCLE_SERVER_SDK_KEY"),
    dvcOptions: $options);
$user_data = new DevCycleUser(array(
  "user_id"=>"my-user"
));

try {
    $result = $devcycleClient->allFeatures($user_data);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DevCycleClient->allFeatures: ', $e->getMessage(), PHP_EOL;
}
```
[//]: # (wizard-initialize-end)

## Initialization Options

The SDK exposes various initialization options which can be set when creating a new devCycleClient:

```php
$options = new DevCycleOptions();
$devCycleClient = new DevCycleClient(
    sdkKey: getenv("DEVCYCLE_SERVER_SDK_KEY"),
    dvcOptions: $options);
$user_data = new DevCycleUser(array(
  "user_id"=>"my-user"
));
```

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enableEdgeDB                 | bool        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing.                                          |
| bucketingApiHostname    | string        | Insert Description.                           |
| unixSocketPath    | string        | Contact DevCycle support for instructions on how to configure this option.                           |
| httpOptions    | array        | Contact DevCycle support for instructions on how to configure this option.                           |
