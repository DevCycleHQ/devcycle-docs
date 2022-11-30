---
title: Getting All Variables
author: Victor Vucicevich
author_title: Product @ DevCycle
author_url: https://devcycle.com
tags: [sdk]
sidebar_position: 3
---

## Overview

This article serves to explain how to use the SDKs to retrieve all Features for the user. 

### Using Get All Variables

The "Get All Variables" function in an SDK will return a map of all of the Variables that the user has received from the DevCycle server in based on the information the SDK or API has received. 

The response the following general format of this example, with slight changes depending on the specifics of the SDK:

```json
{
  "my-feature-variable": {
    "_id": "617c19199db63239d2d17025",
    "key": "my-feature-variable",
    "type": "Boolean",
    "value": false
  },
  "some-string-variable": {
    "_id": "61828f25c1c23bc6ae1366e9",
    "key": "some-string-variable",
    "type": "String",
    "value": "this is a string variable value"
  },
```

Only Variables in Features which the user has been successfully targeted for will be part of the response to this SDK. [Targeting rules](/docs/home/feature-management/features-and-variables/targeting-users) must be **enabled** for the environment this SDK is being called on.  

Features which are within the Project that have rules disabled OR the user is not Targeted for will not have their variables appear in the response of this function. 

## Client-Side SDK Usage

### **JavaScript SDK**

To grab all the Features returned in the config:

```js
const variables = dvcClient.allVariables()
```

If the SDK has not finished initializing, these methods will return an empty object. Read [Waiting for Features](/docs/sdk/client-side-sdks/javascript#waiting-for-features) to mitigate this.

### **React SDK**

Refer to [Javascript SDK](#javascript-sdk)

### **iOS SDK**

To grab all the Variables returned in the config:

```swift
let variables: [String: Variable] = dvcClient.allVariables()
```

If the SDK has not finished initializing, these methods will return an empty object.

### **Android SDK**

To grab all the Variables returned in the config:

**Kotlin**

```kotlin
var variables: Map<String, Variable<Any>>? = dvcClient.allVariables()
```

**Java**

```java
Map<String, Variable<Object>> variables = dvcClient.allVariables();
```

If the SDK has not finished initializing, these methods will return an empty Map.


## Server-Side SDK Usage

### **Node.js SDK (server-side)**

You can wait on the features to be loaded from our servers by using `getVariables()` function. It returns a promise that you can use to wait until features are ready to be used:

To grab all the segmented variables for a user:

```javascript
const variables = dvcClient.allVariables(user)
```


### **Python SDK**

```python
    try:
        # Get all variables for user data
        variables = dvc.all_variables(user)
        print(variables)
    except ApiException as e:
        print("Exception when calling DVCClient->all_variables: %s\n" % e)
```

### **Go SDK**

This method will fetch all variables for a given user and return them in a map of `key: variable_object`

```go
variables, err := dvcClient.DevcycleApi.AllVariables(auth, user)
```

### **Ruby SDK**

```ruby
begin
  #Get all variables for user data
  result = api_instance.all_variables(user_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->all_variables: #{e}"
end
```

### **PHP SDK**

```php
try {
    $result = $apiInstance->allVariables($user_data);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DVCClient->allVariables: ', $e->getMessage(), PHP_EOL;
}
```

### **Dotnet / C# SDK**

This method will fetch all variables for a given user and returned as Dictionary&lt;String, Feature&gt;

```c
using System;
using System.Diagnostics;
using DevCycle.Api;
using DevCycle.Model;

namespace Example
{
    public class AllVariablesExample
    {
        public void main()
        {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCClient dvcClient = new DVCClient("YOUR_API_KEY");
            var user = new User("user_id"); 

            try
            {
                Dictionary<string, Variable> result = await dvcClient.AllVariablesAsync(user);
                Debug.WriteLine(result);
            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling DVCClient.AllVariablesAsync: " + e.Message );
            }
        }
    }
}
```


### **Java SDK**

This method will fetch all variables for a given user and returned as Map&lt;String, Feature&gt;

To get values from your Variables, the `value` field inside the variable object can be accessed.


```java
import com.devcycle.sdk.server.api.DVCClient;

public class MyClass {

    private DVCClient dvcClient;

    public MyClass() {
        dvcClient = new DVCClient("your_server_key");
    }

    public void allVariables() {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();
        
        Map<String, Variable> variables = dvcClient.allVariables(user);
    }
}
```
