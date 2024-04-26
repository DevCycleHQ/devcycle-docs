---
title: Android SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/android-client-sdk)](https://search.maven.org/artifact/com.devcycle/android-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/android-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/android-client-sdk)

## Requirements

This version of the DevCycle Android Client SDK supports a minimum Android API Version 23.

:::info
**Proguard/R8:** If minifying your project, DevCycle requires **Android Gradle Plugin 7.1.x or higher**
:::

## Installation

[//]: # (wizard-install-start)

The SDK can be installed into your Android project by adding the following to _build.gradle_:

```yaml
implementation("com.devcycle:android-client-sdk:+")
```
[//]: # (wizard-install-end)

:::info

Refer to the latest version of the SDK on [maven central](https://maven.org/artifact/com.devcycle/android-client-sdk) if you would not prefer gradle to pull the latest version automatically by using `+`

:::
