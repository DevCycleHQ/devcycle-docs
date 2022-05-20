---
title: .NET SDK for Cloud Bucketing
sidebar_position: 7
---

# DevCycle .NET / C# SDK

Welcome to the DevCycle .NET Server SDK, which interfaces with the [DevCycle Bucketing API](https://docs.devcycle.com/bucketing-api/#tag/devcycle).
All requests, including user data are sent to DevCycle servers to ensure the User is bucketed correctly and will receive the correct variation.

## Requirements

### Frameworks supported
- .NET Core >=1.0
- .NET Framework >=4.6
- Mono/Xamarin >=vNext
- UWP >=10.0

### Dependencies
- FubarCoder.RestSharp.Portable.Core >=4.0.8
- FubarCoder.RestSharp.Portable.HttpClient >=4.0.8
- JsonSubTypes >=1.8.0
- Newtonsoft.Json >=13.0.1

## Installation
Download the SDK from Nuget - https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/
and use the namespaces:

```csharp
using DevCycle.SDK.Server.Cloud.Api;
using DevCycle.SDK.Server.Common.Model;
```

## Getting Started

To start, initialize a client using the API key. 

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;


namespace Example
{
    public class Example
    {
        public void main()
        {
            // using ensures REST Client resources are correctly disposed once no longer required.
            using DVCCloudClient dvcClient = (DVCCloudClient) new DVCCloudClientBuilder()
                .SetEnvironmentKey("YOUR SDK KEY")
                .Build();
        }
    }
}
```

## Usage

### User Object
The user object is required for all methods. The only required field in the user object is userId

See the User class in [.NET User model doc](https://github.com/DevCycleHQ/dotnet-server-sdk/blob/main/docs/User.md) for all accepted fields.

```csharp
User user = new User("a_user_id");
```

### Getting All Features
This method will fetch all features for a given user and return them as Dictionary<String, Feature>

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;
using DevCycle.SDK.Server.Common.Model;

namespace Example
{
    public class AllFeaturesExample
    {
        public async Task main()
        {
            // using ensures REST Client resources are correctly disposed once no longer required.
            using DVCCloudClient dvcClient = (DVCCloudClient) new DVCCloudClientBuilder()
                .SetEnvironmentKey("YOUR SDK KEY")
                .Build();
            var user = new User("user_id");

            try
            {
                Dictionary<string, Feature> result = await dvcClient.AllFeaturesAsync(user);
                Debug.WriteLine(result);
            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling dvcClient.AllFeaturesAsync: " + e.Message );
            }
        }
    }
}
```

### Get all Variables

To get values from your Variables, the `value` field inside the variable object can be accessed.

This method will fetch all variables for a given user and returned as Dictionary&lt;String, Feature&gt;

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;
using DevCycle.SDK.Server.Common.Model;

namespace Example
{
    public class AllVariablesExample
    {
        public void main()
        {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCCloudClient dvcClient = (DVCCloudClient) new DVCCloudClientBuilder()
                .SetEnvironmentKey("YOUR SDK KEY")
                .Build();
            var user = new User("user_id"); 

            try
            {
                Dictionary<string, IVariable> result = await dvcClient.AllVariablesAsync(user);

                foreach (var keyValuePair in result)
                {
                    // Casting to use the cloud specific variable features.
                    Debug.WriteLine($"{keyValuePair.Key} : {(Variable)keyValuePair.Value}");
                }
            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling dvcClient.AllVariablesAsync: " + e.Message );
            }
        }
    }
}
```

### Get and use Variable by key

To get values from your Variables, the `value` field inside the variable object can be accessed.

This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return a variable object with the value set to whatever was passed in as the `defaultValue` parameter.

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;
using DevCycle.SDK.Server.Common.Model;
using DevCycle.SDK.Server.Common.Model.Cloud;

namespace Example
{
    public class VariableExample
    {
        public void main()
        {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCCloudClient dvcClient = (DVCCloudClient) new DVCCloudClientBuilder()
                .SetEnvironmentKey("YOUR SDK KEY")
                .Build();
            var user = new User("user_id");

            try
            {
                var key = "YOUR_KEY";
                var defaultValue = true;
                // Casting from IVariable to Variable to get the cloud specific features.
                Variable result = (Variable) await dvcClient.VariableAsync(user, key, defaultValue);
                Debug.WriteLine(result);
            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling dvcClient.VariableAsync: " + e.Message );
            }
        }
    }
}
```

### Track Event
To POST custom event for a user, pass in the user and event object.

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;
using DevCycle.SDK.Server.Common.Model;

namespace Example
{
    public class TrackExample
    {
        public void main()
        {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCCloudClient dvcClient = (DVCCloudClient) new DVCCloudClientBuilder()
                .SetEnvironmentKey("YOUR SDK KEY")
                .Build();

            DateTimeOffset now = DateTimeOffset.UtcNow;
            long unixTimeMilliseconds = now.ToUnixTimeMilliseconds();
            
            var user = new Users("user_id");
            var event = new Event("test event", "test target", unixTimeMilliseconds, 600,  new Dictionary<string, object>(){{"key", "value"}});


            try
            {
                DVCResponse result = await dvcClient.TrackAsync(user, event);
                Debug.WriteLine(result);
            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling dvcClient.GetFeaturesAsync: " + e.Message );
            }
        }
    }
}
```