---
title: Sending DevCycle Data to External Destinations
sidebar_label: Sending Data to External Destinations 
sidebar_position: 11
description: How to send DevCycle Feature data to external destinations such as CDPs, analytics providers, etc. 
sidebar_custom_props: { icon: carbon:data-vis-1 }
---

# Sending DevCycle Data to External Destinations

This topic explains how to send Feature and/or experimentation data to external destinations. 

Some of our users prefer to use their own data warehouse and tools to analyze Feature and experiment data. Given this need, DevCycle provides ways to pipe data to any location of your choice.

In this guide, we provide code examples for the Node.js, Javascript, Android, and iOS SDKs on how to pull Experiment and Variation information from the DevCycle SDK for a given user and pass it to an example data analytics platform, such as Adobe.

While the specifics differ slightly between SDKs, the concept is largely the same. DevCycle has a method called `getAllFeatures` which provides a JSON map of the Features (Experiments) and Variations that a user received. This map can then be passed to an analytics provider in whatever format or context is desired. While the details below provide code specific to each SDK, the general documentation for the `getAllFeatures` method can be found [here](/sdk/features#getting-all-features). 

The format of the `getAllFeatures` response looks like this:

```json
{
 "your-cool-feature": {
   "_id": "123456",
   "key": "your-cool-feature",
   "type": "release",
   "_variation": "333345",
   "variationName": "Some Variation",
   "variationKey": "some-variation"
 },
 "an-experiment": {
   "_id": "234567",
   "key": "an-experiment",
   "type": "experiment",
   "_variation": "444123",
   "variationName": "Treatment",
   "variationKey": "treatment"
 }
}
```
Given DevCycle may be used for experimentation, feature flagging and remote configuration, the “type” field in the response can be used to either filter or augment the data that is being sent to your chosen destination.

**Note**: The details specific to your analytics destination should be reviewed and verified by your team to ensure the accuracy and desired format of the data.


## Code Examples for Adobe


### DevCycle Code for Node.js

```javascript
    const user = { user_id: '123' }
    const features = devcycleClient.allFeatures(user);
    const variations = {};
    Object.values(features).forEach((feature) => {
        variations[feature.key] = feature.variationName;
    })
    Analytics.trackAction("DVC_Features", variations);
```

Link to [Node.js Documentation](/sdk/server-side-sdks/node/node-usage#getting-all-features)

### DevCycle Code for Javascript

```javascript
    const features = devcycleClient.allFeatures();
    let variations = [];
    Object.values(features).forEach((feature) => {
        variations.push(`${feature.key}:${feature.variationName}`);
    })
    omtr.eVarNumber = variations.join(',');
```
Link to [Javascript Documentation](/sdk/client-side-sdks/javascript/javascript-usage#get-all-features) 

### DevCycle Code for Android (Java)

```java
import com.devcycle.sdk.android.model.Feature;

HashMap<String, String> variations = new HashMap<>();
Map<String, Feature> features = devcycleClient.allFeatures();
for (Feature feature : features.values()) {
     variations.put(feature.getKey(), feature.getVariationName());
}

Analytics.trackAction("DVC_Features", variations);
```
Link to [Android Documentation](/sdk/client-side-sdks/android/android-usage#java-example-3)

### DevCycle Code for iOS (Swift)

```swift
var variations: [String: String] = [:]
let features: [String: Feature] = self.devcycleClient!.allFeatures()
for featurekey in features.keys {
    let variation = features[featurekey]?.variationName
    variations[featurekey] = variation
}

MobileCore.track(action: "DVC_Features", data: variations)
```
Link to [iOS Documentation](/sdk/client-side-sdks/ios/ios-usage#get-all-features)

