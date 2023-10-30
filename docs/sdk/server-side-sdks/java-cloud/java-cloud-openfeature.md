---
title: Java Cloud OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 4
description: How to implement the OpenFeature Provider
sidebar_custom_props: {icon: toggle-off}
---

# OpenFeature Provider

OpenFeature is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides a Java implementation of the [OpenFeature](https://openfeature.dev/) Provider interface, if you prefer to use the OpenFeature API.

[![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/java-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/java-server-sdk)


## Usage

The Provider implementation is built into the Java SDK. See the [Java Cloud Server SDK Installation](https://docs.devcycle.com/sdk/server-side-sdks/java-cloud/java-cloud-install) documentation for more information on how to install and the SDK in your project.

Start by creating and configuring the `DevCycleCloudClient`. Once the DevCycle client is configured, call the `getOpenFeatureProvider()` function to obtain the OpenFeature provider and set it into the OpenFeature API.

```java
import com.devcycle.sdk.server.cloud.api.DevCycleCloudClient;
import com.devcycle.sdk.server.cloud.model.DevCycleCloudOptions;
import dev.openfeature.sdk.*;

public class OpenFeatureExample {
    public static void main(String[] args) {
        // Initialize DevCycle Client
        DevCycleCloudOptions options = DevCycleCloudOptions.builder().build();
        DevCycleCloudClient devCycleClient = new DevCycleCloudClient("DEVCYCLE_SERVER_SDK_KEY", options);
        
        // Set the provider into the OpenFeature API
        OpenFeatureAPI api = OpenFeatureAPI.getInstance();
        api.setProvider(devCycleClient.getOpenFeatureProvider());
                
        // Get the OpenFeature client
        Client openFeatureClient = api.getClient();
        
        // Retrieve a boolean flag from the OpenFeature client
        Boolean variableValue = openFeatureClient.getBooleanValue("boolean-flag", false, new MutableContext("user-1234"));
    }
}
```

### Required Targeting Key

For DevCycle SDK to work we require either a `targeting key` or `user_id` attribute to be set on the OpenFeature context.
This value is used to identify the user as the `user_id` property for a `DevCycleUser` in DevCycle.

### Mapping Context Properties to DevCycleUser

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the `DevCycleUser` object.
[DevCycleUser Java Interface](https://github.com/DevCycleHQ/java-server-sdk/blob/main/src/main/java/com/devcycle/sdk/server/common/model/DevCycleUser.java)

For example all these properties will be set on the `DevCycleUser`:
```java
MutableContext context = new MutableContext("test-1234");
context.add("email", "email@devcycle.com");
context.add("name", "name");
context.add("country", "CA");
context.add("language", "en");
context.add("appVersion", "1.0.11");
context.add("appBuild", 1000);

Map<String,Object> customData = new LinkedHashMap<>();
customData.put("custom", "value");
context.add("customData", Structure.mapToStructure(customData));

Map<String,Object> privateCustomData = new LinkedHashMap<>();
privateCustomData.put("private", "data");
context.add("privateCustomData", Structure.mapToStructure(privateCustomData));
```

Context properties that are not known `DevCycleUser` properties will be automatically added to the `customData` property of the `DevCycleUser`.

DevCycle allows the following data types for custom data values: **boolean**, **integer**, **double**, **float**, and **String**. Other data types will be ignored.

### JSON Flag Limitations

The OpenFeature spec for JSON flags allows for any type of valid JSON value to be set as the flag value.

For example the following are all valid default value types to use with OpenFeature:
```java
// Invalid JSON values for the DevCycle SDK, will return defaults
openFeatureClient.getObjectValue("json-flag", new Value(new ArrayList<String>(Arrays.asList("value1", "value2"))));
openFeatureClient.getObjectValue("json-flag", new Value(610));
openFeatureClient.getObjectValue("json-flag", new Value(false));
openFeatureClient.getObjectValue("json-flag", new Value("string"));
openFeatureClient.getObjectValue("json-flag", new Value());
```

However, these are not valid types for the DevCycle SDK, the DevCycle SDK only supports JSON Objects (as `Map<String,Object>`):

```java

Map<String,Object> defaultJsonData = new LinkedHashMap<>();
defaultJsonData.put("default", "value");
openFeatureClient.getObjectValue("json-flag", new Value(Structure.mapToStructure(defaultJsonData)));
```

This is enforced both for both the flag values and the default values supplied to the `getObjectValue()` method. Invalid types will trigger a `dev.openfeature.sdk.exceptions.TypeMismatchError` exception.