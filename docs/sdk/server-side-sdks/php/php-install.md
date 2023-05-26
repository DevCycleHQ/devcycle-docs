---
title: PHP Server SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: hidden
sidebar_custom_props: {icon: screwdriver-wrench}
---

[![Packagist](https://badgen.net/packagist/v/devcycle/php-server-sdk/latest)](https://packagist.org/packages/devcycle/php-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/php-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/php-server-sdk)


Requires PHP 7.3 and later.


<!--tabs-->

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
<?php
require_once('/path/to/DevCycle/vendor/autoload.php');
```


### Local Bucketing Proxy

Due to complexities with the PHP application lifecycle and state management, local bucketing functionality requires a different approach compared to the other server SDKS.

To access this functionality in PHP, DevCycle provides a **proxy** process that can run alongside your PHP application or on a separate host in your environment. This proxy mimics the Cloud Bucketing API but provides for higher speed variable evaluations due to the reduction of network latency and config caching; all powered by DevCycle's high performance Go Server SDK.

The local bucketing proxy can be downloaded as a binary or package from here: https://github.com/DevCycleHQ/local-bucketing-proxy/releases

#### Proxy Configuration

Once the proxy is downloaded and installed, it can be configured via either environment variables or command line arguments. See the [README](https://github.com/DevCycleHQ/local-bucketing-proxy#options) for the configuration options.

At a minimum, you will need set the `DVC_LB_PROXY_SDK_KEY` environment variable to activate the proxy. This should be set to your SDK key for your PHP application.
The rest of the values can be left unchanged for basic operation. This will default to starting an HTTP server on port 8080.


#### Running the Proxy

The proxy can be started by just executing the binary:

```bash

$ local-bucketing-proxy

HTTP server started on port 8080

```

At this point the proxy is live and ready to accept requests from the PHP SDK.

##### OS Packaged Version
If you have installed an OS packaged version of the proxy - the binary will be installed to `/usr/bin/local-bucketing-proxy`.

You will need to configure a separate supervisor/orchestrator such as `systemd` or `upstart` if no you need to create a long-lived process.

#### PHP SDK Configuration
Once the local bucketing proxy is up and running, you will need to update the configuration for your PHP SDK to point at the proxy host.

The default configuration of the proxy will start run at `localhost:8080` and the PHP SDK would be setup as follows:

```php
$config = DevCycle\Configuration::getDefaultConfiguration()
    ->setApiKey('Authorization', $_ENV["DVC_SERVER_SDK_KEY"])
    ->setHost("http://localhost:8080");
```

No other configuration is necessary. Ensure that the local bucketing proxy process is running before the PHP application makes a request to it.




