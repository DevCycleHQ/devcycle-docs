---
title: PHP Server SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Packagist](https://badgen.net/packagist/v/devcycle/php-server-sdk/latest)](https://packagist.org/packages/devcycle/php-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/php-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/php-server-sdk)

## AI-Powered Install

import MCPInstall from '@site/docs/_partials/mcpInstall.mdx'
import AIPromptCopyButton from '@site/src/components/AIPromptCopyButton'
import PromptContent from '!!raw-loader!@site/static/ai-prompts/php.md'

<MCPInstall />

<AIPromptCopyButton promptContent={PromptContent} />

Requires PHP 7.3 and later.

### Composer Installation
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

## SDK Proxy

Due to complexities with the PHP application lifecycle and state management,
local bucketing functionality requires a different approach compared to the other server SDKS.

To access this functionality in PHP, DevCycle provides a **proxy** process that can run alongside your PHP application
or on a separate host in your environment. This proxy mimics the Cloud Bucketing API but provides for higher speed
variable evaluations due to the reduction of network latency and config caching;
all powered by DevCycle's high performance Go Server SDK.

See the [SDK Proxy](../../sdk-proxy/index.md) section for more information.
