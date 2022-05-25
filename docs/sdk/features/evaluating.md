---
title: Evaluating Features & Using Variables
sidebar_position: 2
---

## Overview

This article explains how to use retrieve the Variables of a Feature as well as use their values. For information on setting up a Feature for use, read [Variables and Variations](/docs/home/feature-management/features-and-variables/creating-variables-and-variations) and [Targeting Users](/docs/home/feature-management/features-and-variables/targeting-users)

If there is an error reaching DevCycle, or if the requested variable does not exist, OR if the user has not been Targeted for the requested feature, the SDKs will return the default value provided to the SDK in code. In that case, the variable returned from the function will not contain the `_id` or `type` fields.

### Client-Side SDK Usage

### **JavaScript SDK**

To get values from your Features, `.variable` is used to fetch variable values using the identifier `key` coupled with a default value. The default value can be of type string, boolean, number, or object.

```js
const variable = dvcClient.variable('YOUR_VARIABLE_KEY', 'default value')
```

To grab the value, there is a property on the object returned to grab the value:

```js
const value = variable.value
```

If the value is not ready, it will return the default value passed in the creation of the variable. To get notified when the variable is loaded:

```js
variable.onUpdate((value) => {
    // value returned when the value of the variable changes
})
```

### React SDK

Use this hook to access the value of your DevCycle variables inside your components.
It takes in your variable key as well as a default value and returns a DVCVariable object.

```js
import { useVariable } from '@devcycle/devcycle-react-sdk'

const DVCFeaturePage = () => {
    const variableKey = 'my-feature'
    const defaultValue = 'false'
    const featureVariable = useVariable(variableKey, defaultValue)

    return (
        <div>
        { featureVariable?.value ? <div>Variable on!</div> : <div>Variable off</div> }
        </div>
    )
}
```

#### Via UseDVCClient

Use this hook to access the DevCycle client. This allows you to call any of the methods provided by the DevCycle JavaScript SDK . 
To learn more, visit the DevCycle JS SDK docs. 

```js
import { useDVCClient } from '@devcycle/devcycle-react-sdk'

const DVCFeaturePage = () => {
    const newUser = {
      user_id: 'new_user_id'
    }
    const dvcClient = useDVCClient()

   const identifyUser = () => {
      dvcClient.identifyUser(newUser)
        .then((variables) => console.log('Updated Variables:', variables))
    }

    return (
    <>
      <button onClick={() => identifyUser()}>Identify new user</button>
    </>
    )
}
```

### **iOS SDK**

To get values from your Features, the `variable()` method is used to fetch variable values using
the variable's identifier `key` coupled with a default value. The default value can be of type
string, boolean, number, or JSONObject:

```swift
let strVariable: DVCVariable<String> = dvcClient.variable(key: "str_key", defaultValue: "default")
let boolVariable: DVCVariable<Bool> = dvcClient.variable(key: "bool_key", defaultValue: false)
let numVariable: DVCVariable<Int> = dvcClient.variable(key: "num_key", defaultValue: 4)
let jsonVariable: DVCVariable<[String:Any]> = dvcClient.variable(key: "json_key", defaultValue: [:])
```

To grab the value, there is a property on the object returned to grab the value:

```swift
if (boolVariable.value == true) {
    // Run Feature Flag Code
} else {
    // Run Default Code
}
```

If the value is not ready, it will return the default value passed in the creation of the variable.

### **Android SDK**

To get values from your Features, the `variable()` method is used to fetch variable values using
the variable's identifier `key` coupled with a default value. The default value can be of type
string, boolean, number, or JSONObject:

```kotlin
var strVariable: Variable<String> = dvcClient.variable("str_key", "default")
var boolVariable: Variable<Boolean> = dvcClient.variable("bool_key", false)
var numVariable: Variable<Number> = dvcClient.variable("num_key", 0)
var jsonVariable: Variable<JSONObject> = dvcClient.variable("json_key", JSONObject("{ \"key\": \"value\" }"))
```

To grab the value, there is a property on the object returned to grab the value:

```kotlin
if (boolVariable.value == true) {
    // run feature flag code
} else {
    // run default code
}
```

If the value is not ready, it will return the default value passed in the creation of the variable.

### **Node.js SDK (server-side)**

To get values from your Variables, `dvcClient.variable()` is used to fetch variable values using the user data, 
variable `key`, coupled with a default value for the variable. The default variable will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable 
to be fetched from DevCycle's CDN. 

The default value can be of type string, boolean, number, or object.

```javascript
const variable = dvcClient.variable(user, 'YOUR_VARIABLE_KEY', false)
if (variable.value) {
    // Feature Flag on
}
```

### **Python SDK**

To get values from your Variables, `variable()` is used to fetch variable values using the identifier `key` coupled with a default value. The default value can be of type string, boolean, number, or object.

```python
    key = 'key-test' # str | Variable key
    
    try:
        # Get variable by key for user data
        api_response = dvc.variable(user, key, 'default-value')
        print(api_response)
    except ApiException as e:
         print("Exception when calling DVCClient->variable: %s\n" % e)
```

### **Go SDK**

This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return
a variable object with the value set to whatever was passed in as the `defaultValue` parameter.

```go
variable, err := dvcClient.DevcycleApi.Variable(auth, user, "variable-key", "default_value")
```


### **Ruby SDK**

```ruby
begin
  # Get value of given variable by key, using default value if segmentation is not passed or variable does not exit
  result = api_instance.variable("variable-key", user_data, true)
  p "Received value for #{result.key}: #{result.value}"
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->variable: #{e}"
end
```

### **PHP SDK**

```php
try {
    $result = $apiInstance->variable($user_data, "my-key", "default");
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DVCClient->variable: ', $e->getMessage(), PHP_EOL;
}
```

### **.NET / C# SDK**

This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return a variable object with the value set to whatever was passed in as the `defaultValue` parameter.

To get values from your Variables, the `value` field inside the variable object can be accessed.

```c
using System;
using System.Diagnostics;
using DevCycle.Api;
using DevCycle.Model;

namespace Example
{
    public class VariableExample
    {
        public void main()
        {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCClient dvcClient = new DVCClient("YOUR_API_KEY");
            var user = new User("user_id"); 

            try
            {
                var key = "YOUR_KEY";
                Variable result = await dvcClient.VariableAsync(user, key);
                Debug.WriteLine(result);
            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling DVCClient.VariableAsync: " + e.Message );
            }
        }
    }
}
```

### **Java SDK**

This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return a variable object with the value set to whatever was passed in as the `defaultValue` parameter.


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
