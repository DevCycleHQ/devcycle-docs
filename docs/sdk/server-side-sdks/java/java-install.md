---
title: Java Server SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)

## Requirements

This version of the DevCycle SDK works with Java 11 and above.

Using the Java SDK library requires [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) >= 7.6+ to be installed.

:::info

An x86_64 or aarch64 JDK is required for Local Bucketing with the DevCycle Java SDK.

Currently Supported Platforms are:

| OS          | Arch    |
| ----------- | ------- |
| Linux (ELF) | x86_64  |
| Linux (ELF) | aarch64 |
| Mac OS      | x86_64  |
| Mac OS      | aarch64 |
| Windows     | x86_64  |

In addition, the environment must support GLIBC v2.16 or higher. You can use the following command to check your GLIBC version:

```bash
ldd --version
```

:::

[//]: # 'wizard-install-start'

### Maven

You can use the SDK in your Maven project by adding the following to your _pom.xml_:

```xml
<dependency>
    <groupId>com.devcycle</groupId>
    <artifactId>java-server-sdk</artifactId>
    <version>LATEST</version>
    <scope>compile</scope>
</dependency>
```

:::info

Refer to the latest version of the SDK on [maven central](https://maven.org/artifact/com.devcycle/java-server-sdk) if you would not prefer Maven or Gradle to pull the latest version automatically by using `+`

:::

### Gradle

Alternatively you can use the SDK in your Gradle project by adding the following to _build.gradle_:

```yaml
implementation("com.devcycle:java-server-sdk:+")
```
[//]: # 'wizard-install-end'

## DNS Caching

The JVM, by default, caches DNS for infinity. DevCycle servers are load balanced and dynamic. To address this concern,
setting the DNS cache TTL to a short duration is recommended. The TTL is controlled by this security setting `networkaddress.cache.ttl`.
Recommended settings and how to configure them can be found [here](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/java-dg-jvm-ttl.html).
