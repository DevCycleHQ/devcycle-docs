---
title: .NET / C# Cloud SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: hidden
sidebar_custom_props: {icon: toggle-on}
---

[![Nuget](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)

## User Object
The user object is required for all methods. The only required field in the user object is userId

See the User class in [.NET User model doc](https://github.com/DevCycleHQ/dotnet-server-sdk/blob/main/docs/User.md) for all accepted fields.

```csharp
User user = new User("a_user_id");
```

## Get and use Variable by key

This method will fetch a specific variable value by key for a given user. It will return the variable
value from the server unless an error occurs or the server has no response.
In that case it will return a variable value with the value set to whatever was passed in as the `defaultValue` parameter.

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;
using DevCycle.SDK.Server.Common.Model;
using DevCycle.SDK.Server.Common.Model.Cloud;

namespace Example {
    public class VariableExample {
        public void main() {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCCloudClient dvcClient = new DVCCloudClientBuilder()
                .SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .Build();
            var user = new User("user_id");

            try {
                Boolean result = await dvcClient.VariableValueAsync(user, "YOUR_KEY", true);
                Debug.WriteLine(result);
            } catch (Exception e) {
                Debug.Print("Exception when calling dvcClient.VariableValueAsync: " + e.Message);
            }
        }
    }
}
```

The default value can be of type `String`, `Boolean`, `Number`, or `Object`.

If you would like to get the full Variable object you can use `VariableAsync()` instead. This contains fields such as:
`key`, `value`, `type`, `defaultValue`, `isDefaulted`.

## Getting All Variables

To get values from your Variables, the `value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and return as DictionaryString, Feature;

```csharp
namespace Example {
    public class AllVariablesExample {
        public void main() {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCCloudClient dvcClient = new DVCCloudClientBuilder()
                .SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .Build();
            var user = new User("user_id"); 

            try {
                Dictionary<string, IVariable> result = await dvcClient.AllVariablesAsync(user);

                foreach (var keyValuePair in result) {
                    // Casting to use the cloud specific variable features.
                    Debug.WriteLine($"{keyValuePair.Key} : {(Variable)keyValuePair.Value}");
                }
            } catch (Exception e) {
                Debug.Print("Exception when calling dvcClient.AllVariablesAsync: " + e.Message);
            }
        }
    }
}
```

## Getting All Features
This method will fetch all features for a given user and return them as Dictionary<String, Feature>

```csharp
...

namespace Example {
    public class AllFeaturesExample {
        public async Task main() {
            // using ensures REST Client resources are correctly disposed once no longer required.
            using DVCCloudClient dvcClient = new DVCCloudClientBuilder()
                .SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .Build();
            var user = new User("user_id");

            try {
                Dictionary<string, Feature> result = await dvcClient.AllFeaturesAsync(user);
                Debug.WriteLine(result);
            } catch (Exception e) {
                Debug.Print("Exception when calling dvcClient.AllFeaturesAsync: " + e.Message);
            }
        }
    }
}
```

## Track Event
To POST custom event for a user, pass in the user and event object.

```csharp
...

namespace Example {
    public class TrackExample {
        public void main() {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCCloudClient dvcClient = new DVCCloudClientBuilder()
                .SetSDKKey("<DVC_SERVER_SDK_KEY>")
                .Build();

            DateTimeOffset now = DateTimeOffset.UtcNow;
            long unixTimeMilliseconds = now.ToUnixTimeMilliseconds();
            
            var user = new Users("user_id");
            var event = new Event("test event", "test target", unixTimeMilliseconds, 600, new Dictionary<string, object>(){{"key", "value"}});

            try {
                DVCResponse result = await dvcClient.TrackAsync(user, event);
                Debug.WriteLine(result);
            } catch (Exception e) {
                Debug.Print("Exception when calling dvcClient.GetFeaturesAsync: " + e.Message);
            }
        }
    }
}
```

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. 
Read more about [EdgeDB](/home/feature-management/edgedb/what-is-edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```csharp
DVCCloudOptions options = new DVCCloudOptions(true);
DVCCloudClient api = new DVCCloudClientBuilder()
                            .SetSDKKey("<DVC_SERVER_SDK_KEY>")
                            .SetOptions(options)
                            .Build();
var user = new User("test_user", "example@example.com");
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, email is associated to the user `test_user`. In your next identify call for the same `userId`, 
you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.
