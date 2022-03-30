---
title: Java SDK
sidebar_position: 6
---

# DevCycle Java Server SDK

Welcome to the DevCycle Java SDK, which interfaces with the [DevCycle Bucketing API](https://docs.devcycle.com/bucketing-api/#tag/devcycle). 

## Requirements

This version of the DevCycle SDK works with Java 8 and above.

Using the Java SDK library requires [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) >= 5.6.4 to be installed.

## Installation

### Maven

You can use the SDK in your Maven project by adding the following to your *pom.xml*:

```xml
<dependency>
    <groupId>com.devcycle</groupId>
    <artifactId>java-server-sdk</artifactId>
    <version>1.0.3</version>
    <scope>compile</scope>
</dependency>
```

### Gradle
Alternatively you can use the SDK in your Gradle project by adding the following to *build.gradle*:

```yaml
implementation("com.devcycle:java-server-sdk:1.0.3")
```

## DNS Caching
The JVM, by default, caches DNS for infinity. DevCycle servers are load balanced and dynamic. To address this concern,
setting the DNS cache TTL to a short duration is recommended. The TTL is controlled by this security setting `networkaddress.cache.ttl`.
Recommended settings and how to configure them can be found [here](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/java-dg-jvm-ttl.html).

## Getting Started

To use the DevCycle Java SDK, initialize a client object. 

```java
import com.devcycle.sdk.server.api.DVCClient;

public class MyClass {
    
    private DVCClient dvcClient;
    
    public MyClass() {
        dvcClient = new DVCClient("your_server_key");
    }
}
```

## Usage

### User Object
The user object is required for all methods. The only required field in the user object is userId

See the User class in [Java User model doc](https://github.com/DevCycleHQ/java-server-sdk/blob/main/docs/User.md) for all accepted fields.

```java
User user = User.builder()
    .userId("a_user_id")
    .build();
```

### Getting All Features
This method will fetch all features for a given user and return them as Map<String, Feature>

```java
import com.devcycle.sdk.server.api.DVCClient;
import com.devcycle.sdk.server.exception.DVCException;
import com.devcycle.sdk.server.model.Feature;
import com.devcycle.sdk.server.model.User;

public class MyClass {
    
    private DVCClient dvcClient;
    
    public MyClass() {
        dvcClient = new DVCClient("your_server_key");
    }
    
    public void allFeatures() throws DVCException {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();

        Map<String, Feature> features = dvcClient.allFeatures(user);
    }
}
```

### Getting All Variables
This method will fetch all variables for a given user and returned as Map&lt;String, Feature&gt;

To get values from your Variables, the `value` field inside the variable object can be accessed.

```java
import com.devcycle.sdk.server.api.DVCClient;
import com.devcycle.sdk.server.exception.DVCException;
import com.devcycle.sdk.server.model.User;
import com.devcycle.sdk.server.model.Variable;

public class MyClass {

    private DVCClient dvcClient;

    public MyClass() {
        dvcClient = new DVCClient("your_server_key");
    }

    public void allVariables() throws DVCException {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();
        
        Map<String, Variable> variables = dvcClient.allVariables(user);
    }
}
```

### Get and Use Variable By Key
This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return a variable object with the value set to whatever was passed in as the `defaultValue` parameter.

To get values from your Variables, the `value` field inside the variable object can be accessed.


```java
import com.devcycle.sdk.server.api.DVCClient;
import com.devcycle.sdk.server.exception.DVCException;
import com.devcycle.sdk.server.model.User;
import com.devcycle.sdk.server.model.Variable;

public class MyClass {

    private DVCClient dvcClient;

    public MyClass() {
        dvcClient = new DVCClient("your_server_key");
    }

    public void setFlag() throws DVCException {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();

        String key = "turn_on_super_cool_feature";
        Boolean defaultValue = true;
        Variable variable = dvcClient.variable(user, key, defaultValue);

        if ((Boolean) variable.getValue()) {
            // New Feature code here
        } else {
            // Old code here
        }
    }
}
```

### Track Event

To POST custom event for a user, pass in the user and event object.

```java
import com.devcycle.sdk.server.api.DVCClient;
import com.devcycle.sdk.server.exception.DVCException;
import com.devcycle.sdk.server.model.DVCResponse;
import com.devcycle.sdk.server.model.Event;
import com.devcycle.sdk.server.model.User;

public class MyClass {

    private DVCClient dvcClient;

    public MyClass() {
        dvcClient = new DVCClient("your_server_key");
    }

    public void addAnEvent() throws DVCException {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();

        Event event = Event.builder()
                .date(Instant.now().toEpochMilli())
                .target("test target")
                .type("test event")
                .value(new BigDecimal(600))
                .build();

        DVCResponse response = dvcClient.track(user, event);
    }
}
```