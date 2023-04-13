---
title: DevCycle PHP Server SDK Installation
sidebar_label: Installation
sidebar_position: 1
---

Requires PHP 7.3 and later.

## Composer Installation

To install the bindings via [Composer](https://getcomposer.org/), add the following to `composer.json`:

```json
{
  "require": {
    "devcycle/php-server-sdk": "*"
  }
}
```

Then run `composer install`

## Manual Installation

Download the files and include `autoload.php`:

```php
<?php
require_once('/path/to/DevCycle/vendor/autoload.php');
```
