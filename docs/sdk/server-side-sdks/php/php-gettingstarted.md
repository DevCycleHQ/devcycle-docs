---
title: DevCycle PHP Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---


Please follow the [installation procedure](/sdk/server-side-sdks/php/php-install) and then run the following:

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure API key authorization: bearerAuth
$config = DevCycle\Configuration::getDefaultConfiguration()->setApiKey('Authorization', '<DVC_SERVER_SDK_KEY>');

$apiInstance = new DevCycle\Api\DVCClient(
    $config,
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
);
$user_data = new \DevCycle\Model\UserData(array(
  "user_id"=>"my-user"
)); // \DevCycle\Model\UserData

try {
    $result = $apiInstance->allFeatures($user_data);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DVCClient->allFeatures: ', $e->getMessage(), PHP_EOL;
}

```