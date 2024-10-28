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

The SDK exposes various initialization options which can be set when registering the DevCycleModule:

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
| logger                       | DevCycleLogger | Logger override to replace default logger                                                                                                                                    |
| logLevel                     | String         | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.                                                                      |
| enableCloudBucketing         | Boolean        | Switches the SDK to use Cloud Bucketing (via the DevCycle Bucketing API) instead of Local Bucketing.                                                                         |
| enableEdgeDB                 | Boolean        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing.                                          |
| configPollingIntervalMS      | Number         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| configPollingTimeoutMS       | Number         | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS         | Number         | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds.                                                                               |
| disableAutomaticEventLogging | Boolean        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| disableCustomEventLogging    | Boolean        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| flushEventQueueSize          | Number         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| maxEventQueueSize            | Number         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| apiProxyURL                  | String         | Allows the SDK to communicate with a proxy of DevCycle bucketing API / client SDK API.                                                                                       |
| enableBetaRealtimeUpdates    | Boolean        | Enables the usage of Beta Realtime Updates for DevCycle. This feature is currently in beta.                                                                                  |