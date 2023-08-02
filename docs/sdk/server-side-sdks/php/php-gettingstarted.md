---
title: PHP Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: {icon: rocket}
---
[![Packagist](https://badgen.net/packagist/v/devcycle/php-server-sdk/latest)](https://packagist.org/packages/devcycle/php-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/php-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/php-server-sdk)

Please follow the [installation procedure](/sdk/server-side-sdks/php/php-install) and then run the following:

## Initializing SDK 

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

use DevCycle\DevCycleConfiguration;
use DevCycle\Api\DevCycleClient;
use DevCycle\Model\DevCycleOptions;
use DevCycle\Model\DevCycleUser;

// Configure API key authorization: bearerAuth
$config = DevCycleConfiguration::getDefaultConfiguration()->setApiKey(
    "Authorization", 
    getenv("DEVCYCLE_SERVER_SDK_KEY")
);

$devcycleClient = new DevCycleClient(
    $config,
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
);
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
