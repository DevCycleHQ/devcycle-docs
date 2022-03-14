---
title: Dotnet SDK
sidebar_position: 7
---

# DevCycle Dotnet / C# SDK

Welcome to the DevCycle Dotnet Server SDK, which interfaces with the [DevCycle Bucketing API](https://docs.devcycle.com/bucketing-api/#tag/devcycle). 

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
Download the SDK from Nuget - https://nuget.info/packages/DevCycle/1.0.0
and use the namespaces:
```csharp
using DevCycle.Api;
using DevCycle.Model;
using DevCycle.Model;
```

## Getting Started

To start, initialize a client using the API key. 

```c
using System;
using System.Diagnostics;
using DevCycle.Api;
using DevCycle.Client;
using DevCycle.Model;

namespace Example
{
    public class Example
    {
        public void main()
        {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCClient dvcClient = new DVCClient("YOUR_API_KEY");
        }
    }
}
```

## Usage

### User Object
The user object is required for all methods. The only required field in the user object is userId

See the User class in [Dotnet User model doc](https://github.com/DevCycleHQ/dotnet-server-sdk/blob/main/docs/User.md) for all accepted fields.

```c
User user = new User("a_user_id");
```

### Getting All Features
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

### Get all Variables

To get values from your Variables, the `value` field inside the variable object can be accessed.

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

### Get and use Variable by key

To get values from your Variables, the `value` field inside the variable object can be accessed.

This method will fetch a specific variable by key for a given user. It will return the variable
object from the server unless an error occurs or the server has no response. In that case it will return a variable object with the value set to whatever was passed in as the `defaultValue` parameter.

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
                var defaultValue = true;
                Variable result = await dvcClient.VariableAsync(user, key, defaultValue);
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

### Track Event
To POST custom event for a user, pass in the user and event object.

```c
using System;
using System.Diagnostics;
using DevCycle.Api;
using DevCycle.Model;

namespace Example
{
    public class TrackExample
    {
        public void main()
        {
            // Ensure REST Client resources are correctly disposed once no longer required
            using DVCClient dvcClient = new DVCClient("YOUR_API_KEY");

            DateTimeOffset now = DateTimeOffset.UtcNow;
            long unixTimeMilliseconds = now.ToUnixTimeMilliseconds();
            
            var user = new Users("user_id");
            var events = new List<Event>();
            events.Add(new Event("test event", "test target", unixTimeMilliseconds, 600));
            var userAndEvents = new UserAndEvents(events, user); 

            try
            {
                DVCResponse result = await dvcClient.TrackAsync(userAndEvents);
                Debug.WriteLine(result);
            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling DVCClient.GetFeaturesAsync: " + e.Message );
            }
        }
    }
}
```