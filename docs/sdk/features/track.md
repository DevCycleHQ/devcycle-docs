---
title: Tracking Custom Events
author: Victor Vucicevich
author_title: Product @ DevCycle
author_url: https://devcycle.com
tags: [sdk]
sidebar_position: 6
---

## Overview

This article serves to explain how to use the SDKs to send up custom events to DevCycle. 

### Using the Track function

The Track function in the DevCycle SDKs allows you to send up custom events which can later be used for your own data analysis on enabled Features, and for metrics on A/B tests and experiments within the DevCycle dashboard.

### Client-Side SDK Usage

### **JavaScript SDK**


To track events, pass in an object with at least a `type` key:

```js
const event = {
    type: 'my_event_type', // this is required
    date: new Date(),
    target: 'my_target',
    value: 5,
    metaData: {
        key: 'value'
    }
}
dvcClient.track(event)
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

```js
await dvcClient.flushEvents()

// or 

dvcClient.flushEvents(() => {
    // called back after flushed events
})
```

### React SDK

Please refer to [Javascript SDK](#javascript-sdk)

### **iOS SDK**

To track events, pass in an object with at least a `type` key:

```swift
let event = try DVCEvent.builder()
                        .type("my_event")
                        .target("my_target")
                        .value(3)
                        .metaData([ "key": "value" ])
                        .clientDate(Date())
                        .build()
dvcClient.track(event)
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

```swift
dvcClient.flushEvents()
```

### Server-Side SDK Usage

### **Node.js SDK (server-side)**

You can wait on the features to be loaded from our servers by using `getVariables()` function. It returns a promise that you can use to wait until features are ready to be used:

```js
    const events = [
        {
            "type": "customEvent",
            "customType": "your_event_type_here",
            "target": "somevariable.key",
            "date": Date.now()
        }
    ]

    await instance.postEvents({ events, user })
```
### **Android SDK**

To track events, pass in an object with at least a `type` key:

```kotlin
var event = DVCEvent.builder()
                .withType("custom_event_type")
                .withTarget("custom_event_target")
                .withValue(BigDecimal(10.0))
                .withMetaData(mapOf("custom_key" to "value"))
                .build()
dvcClient.track(event)
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

```kotlin
dvcClient.flushEvents()
```

### **Python SDK**

To POST a custom event for a User

```python
    # event needs to be an instance of the Event class
    event = Event(
        type="customEvent",
        target="somevariable.key"
    )
   
    try:
        # Post events to DevCycle for user
        api_response = dvc.track(user, event)
        print(api_response)
    except ApiException as e:
        print("Exception when calling DVCClient->track: %s\n" % e)
```

### **Go SDK** 

To POST custom event for a user, pass in the user and event object.

```go
event := devcycle.Event{
    Type_: "customEvent",
    Target: "somevariable.key"}

response, err := dvcClient.DevcycleApi.Track(auth, user, event)
```

### **Ruby SDK**

```ruby

event_data = DevCycle::Event.new({
  type: "my-event",
  target: "some_event_target",
  value: 12,
  meta_data: {
    myKey: "my-value"
  }
})

begin
  # Post events for given user data
  result = api_instance.track(user_data, event_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->track: #{e}"
end
```

### **PHP SDK**

```php
$event_data = new \DevCycle\Model\Event(array(
  "type"=>"my-event"
));

try {
    $result = $apiInstance->track($user_data, $event_data);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DVCClient->track: ', $e->getMessage(), PHP_EOL;
}
```

### **Dotnet / C# SDK**
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
                Debug.Print("Exception when calling DVC.GetFeaturesAsync: " + e.Message );
            }
        }
    }
}
```

### **Java SDK**

To POST custom event for a user, pass in the user and event object.

```java
import com.devcycle.sdk.server.api.DVCClient;

public class MyClass {

    private DVCClient dvcClient;

    public MyClass() {
        dvcClient = new DVCClient("your_server_key");
    }

    public void addAnEvent() {
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




