---
title: Android SDK Installation
sidebar_label: Installation
sidebar_position: 1
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/android-client-sdk)](https://search.maven.org/artifact/com.devcycle/android-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/android-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/android-client-sdk)


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

