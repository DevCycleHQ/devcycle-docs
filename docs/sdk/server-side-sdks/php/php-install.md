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


