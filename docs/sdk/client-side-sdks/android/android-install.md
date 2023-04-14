---
title: Android SDK Installation
sidebar_label: Installation
sidebar_position: 1
---

## Requirements

This version of the DevCycle Android Client SDK supports a minimum Android API Version 21.

:::info 
 **Proguard/R8:** If minifying your project, DevCycle requires **Android Gradle Plugin 7.1.x or higher**
:::

## Installation

The SDK can be installed into your Android project by adding the following to *build.gradle*:

```yaml
implementation("com.devcycle:android-client-sdk:+")
```
:::info

Refer to the latest version of the SDK on [maven central](https://maven.org/artifact/com.devcycle/android-client-sdk) if you would not prefer gradle to pull the latest version automatically by using `+`

:::

