---
title: PHP Server SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: {icon: screwdriver-wrench}
---

[![Packagist](https://badgen.net/packagist/v/devcycle/php-server-sdk/latest)](https://packagist.org/packages/devcycle/php-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/php-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/php-server-sdk)


Requires PHP 7.3 and later.


### Composer Installation

  To install the bindings via [Composer](https://getcomposer.org/), add the following to `composer.json`:

```json
{
  "require": {
    "devcycle/php-server-sdk": "*"
  }
}
```

Then run `composer install`

### Manual Installation

Download the files and include `autoload.php`:

```php
require_once('/path/to/DevCycle/vendor/autoload.php');
```

## SDK Proxy

Due to complexities with the PHP application lifecycle and state management, 
local bucketing functionality requires a different approach compared to the other server SDKS.

To access this functionality in PHP, DevCycle provides a **proxy** process that can run alongside your PHP application 
or on a separate host in your environment. This proxy mimics the Cloud Bucketing API but provides for higher speed 
variable evaluations due to the reduction of network latency and config caching; 
all powered by DevCycle's high performance Go Server SDK.

See the [SDK Proxy](../../sdk-proxy/index.md) section for more information.





