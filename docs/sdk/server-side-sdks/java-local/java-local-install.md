---
title: DevCycle Java Local Server SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: hidden
sidebar_custom_props: {icon: screwdriver-wrench}
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)

## Requirements

This version of the DevCycle SDK works with Java 8 and above.

Using the Java SDK library requires [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) >= 5.6.4 to be installed.

:::info

An x64 JDK is required for Local Bucketing with the DevCycle Java SDK.

:::


<Tabs>

<TabItem value="maven" label="Maven" default>

 You can use the SDK in your Maven project by adding the following to your *pom.xml*:

```xml
<dependency>
    <groupId>com.devcycle</groupId>
    <artifactId>java-server-sdk</artifactId>
    <version>LATEST</version>
    <scope>compile</scope>
</dependency>
```

:::info

Refer to the latest version of the SDK on [maven central](https://maven.org/artifact/com.devcycle/android-client-sdk) if you would not prefer Maven or Gradle to pull the latest version automatically by using `+`

:::

  </TabItem>
<TabItem value="gradle" label="Gradle">

Alternatively you can use the SDK in your Gradle project by adding the following to *build.gradle*:

```yaml
implementation("com.devcycle:java-server-sdk:+")
```

  </TabItem>
  
</Tabs>

## DNS Caching
The JVM, by default, caches DNS for infinity. DevCycle servers are load balanced and dynamic. To address this concern,
setting the DNS cache TTL to a short duration is recommended. The TTL is controlled by this security setting `networkaddress.cache.ttl`.
Recommended settings and how to configure them can be found [here](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/java-dg-jvm-ttl.html).
