---
title: Getting All Features
author: Victor Vucicevich
author_title: Product @ DevCycle
author_url: https://devcycle.com
tags: [sdk]
sidebar_position: 6
---

## Overview

This article serves to explain how to use the SDKs to retrieve all Features for the user. 

### Using Get All Features

The "Get All Features" function in an SDK will return a map of all of the features that the user is currently in based on the information the SDK or API has received. 

The response the following general format of this example, with slight changes depending on the specifics of the SDK:

```json
{
  "your-cool-feature": {
    "_id": "123456",
    "key": "your-cool-feature",
    "type": "release",
    "_variation":"333345"
  },
  "another-feature": {
    "_id": "123456",
    "key": "another-feature",
    "type": "ops",
    "_variation":"444123"
  },...
```

Only Features which the user has been successfully targeted for. [Targeting rules](/docs/home/feature-management/features-and-variables/targeting-users) must be **enabled** for that environment.  

Features which are within the Project that have rules disabled OR the user is not Targeted for will not appear in the response of this function. 

### Client-Side SDK Usage

### **JavaScript SDK**

To grab all the Features returned in the config:

```js
const features = client.allFeatures()
```

If the SDK has not finished initializing, these methods will return an empty object. Read [Waiting for Features](/docs/sdk/client-side-sdks/javascript#waiting-for-features) to mitigate this.

### **React SDK**

Refer to [Javascript SDK](#javascript-sdk)

### **iOS SDK**

To grab all the Features returned in the config:

```swift
let features: [String: Feature] = client.allFeatures()
```

If the SDK has not finished initializing, these methods will return an empty object.

### Grabbing All Features

To grab all the Features returned in the config:

```kotlin
var features: Map<String, Feature>? = dvcClient.allFeatures()
```

If the SDK has not finished initializing, this method will return an empty Map.

### Server-Side SDK Usage

### **Node.js SDK (server-side)**


You can fetch all segmented features for a user:

```javascript
const features = dvcClient.allFeatures(user)
```

### **Python SDK**

```python
    try:
        # Get all features by key for user data
        features = dvc.all_features(user)
        print(features)
    except ApiException as e:
        print("Exception when calling DVCClient->all_features: %s\n" % e)
    
```

### **Go SDK**

This method will fetch all features for a given user and return them in a map of `key: feature_object`

```go
features, err := client.DevcycleApi.AllFeatures(auth, user)
```

### **Ruby SDK**

```ruby
begin
  #Get all features for user data
  result = api_instance.all_features(user_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->all_features: #{e}"
end
```

### **PHP SDK**

```php
try {
    $result = $apiInstance->allFeatures($user_data);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DVCClient->allFeatures: ', $e->getMessage(), PHP_EOL;
}
```

### **Dotnet / C# SDK**

This method will fetch all features for a given user and return them as Dictionary<String, Feature>

```c
using System;
using System.Diagnostics;
using DevCycle.Api;
using DevCycle.Model;

namespace Example
{
    public class AllFeaturesExample
    {
        public async Task main()
        {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCClient dvcClient = new DVCClient("YOUR_API_KEY");
            var user = new User("user_id"); 

            try
            {
                Dictionary<string, Feature> result = await dvcClient.AllFeaturesAsync(user);
                Debug.WriteLine(result);
            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling DVCClient.AllFeaturesAsync: " + e.Message );
            }
        }
    }
}
```

### Java SDK

This method will fetch all features for a given user and return them as Map<String, Feature>

```java
import com.devcycle.sdk.server.api.DVCClient;

public class MyClass {
    
    private DVCClient dvcClient;
    
    public MyClass() {
        dvcClient = new DVCClient("your_server_key");
    }
    
    public void allFeatures() {
        User user = User.builder()
                .userId("a_user_id")
                .country("US")
                .build();

        Map<String, Feature> features = dvcClient.allFeatures(user);
    }
}
```

