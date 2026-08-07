---
title: Flutter SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Pub](https://img.shields.io/pub/v/devcycle_flutter_client_sdk)](https://img.shields.io/pub/v/devcycle_flutter_client_sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/flutter-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/flutter-client-sdk)

## AI-Powered Install

import MCPInstall from '@site/docs/_partials/mcpInstall.mdx'
import AIPromptCopyButton from '@site/src/components/AIPromptCopyButton'
import PromptContent from '!!raw-loader!@site/static/ai-prompts/flutter.md'

<MCPInstall />

<AIPromptCopyButton promptContent={PromptContent} />

## Requirements

This version of the DevCycle Flutter Client SDK requires Flutter 2.5.0 or later (Dart 2.14.0), iOS 12.0 or later, and Android API 23 or later.

## Installation

Checkout [DevCycle Flutter Client SDK Releases](https://github.com/DevCycleHQ/flutter-client-sdk/releases) for the latest versions of the SDKs.

[//]: # 'wizard-install-start'

### Flutter CLI

The SDK can be installed into your Flutter project by running `flutter pub add devcycle_flutter_client_sdk`.

[//]: # 'wizard-install-end'

### Pub Spec

The SDK can be installed into your Flutter project by adding the following to your `pubspec.yaml`:

```dart
devcycle_flutter_client_sdk: ^1.11.7
```

Then, run `flutter pub get`.
