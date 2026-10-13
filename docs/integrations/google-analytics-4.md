---
title: "Sending DevCycle Data as a Custom Event to Google Analytics 4 (GTM Specific)"
sidebar_position: 1
---

### Transition from Google Optimize

This guide enables you to integrate DevCycle feature flags with Google Analytics 4 (GA4) for A/B testing and experimentation using Google Tag Manager (GTM). If you are a former Google Optimize customer transitioning to GA4, this guide is specific to GTM implementations.

### GTM Elements: Tags, Variables, and Triggers

Below is a description of Google Tag Manager's tags, variables, and triggers. For more in-depth understanding, consult [Google's official documentation](https://support.google.com/tagmanager/answer/6102821).

- Tags execute specified functionality, such as sending data to GA4 or initializing DevCycle. 
- Variables serve as placeholders for predefined values, which in this guide store the feature and variation data.
- Triggers are conditions that, when met, execute actions defined in Tags.

## Google Tag Manager (GTM) Configuration

### Step 1: Create a New Tag for DevCycle Initialization and Feature Flag Configuration Values

1. Navigate to your GTM workspace and access the "Tags" section.
2. Create a new tag and name it "DevCycle Initialization & Feature Flag Configuration Values".
3. Choose "Custom HTML" for "Tag Configuration".
4. Insert a script to push a custom event named `set_user_properties` (or any name of your choosing) to the dataLayer with the parameters: `featureName: {{featureName}}` and `variation: {{variation}}`. This script can be found below. 

```js
<script>
    let user = { isAnonymous: true };
    let devcycleOptions = { logLevel: "debug" };
    let devcycleClient = DevCycle.initializeDevCycle(
        "<SDK_KEY>",  // Replace with your specific DevCycle SDK Key
        user,
        devcycleOptions
    );

    devcycleClient.onClientInitialized().then(function () {
        let features = devcycleClient.allFeatures();
        pushData(features);
    });
    function pushData(featuresConfig) {
        let arr = [];

        // JSON to Array
        for (let i in featuresConfig) {
            arr.push([i, featuresConfig[i]]);
        }

        // Push to dataLayer
        for (let j = 0; j < arr.length; j++) {
            let featureName = arr[j][0].replaceAll("-", "_");
            let currentVariation = arr[j][1][
                "variationName"
            ].replaceAll("-", "_");
            window.dataLayer.push({
                event: "set_user_properties", // Can be any event name you want
                featureName: featureName,
                variationName: currentVariation,
            });
        }
    }
</script>
```
5. For “Triggering", select the “Window Loaded” option as the firing trigger.

![Tag Configuration](/sept-13-2023-ga4-4.png)

### Step 2: Configure GTM Variables

1. Navigate to the “Variable” section.
2. In “User-Defined Variables", create a new variable.
3. Choose “Data Layer Variable” for "Variable Type".
4. Enter “featureName” for "Data Layer Variable Name".
5. Repeat to create another variable and name it “variationName".

![Tag Configuration](/sept-13-2023-ga4-1.png)


![Tag Configuration](/sept-13-2023-ga4-2.png)

### Step 3: Create Tag to Send Custom Events

**Option 1: Setup via Google Tag**

1. In your GTM workspace, navigate to "Tags" and create a new one.
2. Name it "GA4_Custom_User_Properties".
3. Select "Google Tag" for "Tag Configuration".
4. Provide your Tag ID for your Google Analytics instance.
5. Under "Shared event settings", add a new Parameter with the `featureName` variable you created as the "Event Parameter", and your `variationName` variable as the "value".

![Tag Configuration](/google-tag-configuration.png)

**Option 2: Send Custom Events to Google Analytics 4**

1. In your GTM workspace, navigate to "Tags" and create a new one.
2. Name it "GA4_Custom_User_Properties".
3. Select "GA4 Event" for "Tag Configuration."
4. In "Configuration Tag", choose your existing GA4 Configuration Tag.
5. Input `set_user_properties` for "Event Name" (or the event name you chose).

![Tag Configuration](/sept-13-2023-ga4-3.png)

### Step 4: Define Trigger for the new Tag

1. Within the tag you just setup, create a new "Firing Trigger" in "Triggering".
2. Create a new trigger and set the trigger type to "Custom Event" or to another trigger of your choice.
3. Name the event (if applicable) as `set_user_properties` (Or the event name you chose in your custom HTML). 

### Step 5: Publish Changes

Before hitting "Submit", it's crucial to validate that your configurations are working as intended. Use GTM's "Preview" mode for this.

**How to Validate your setup with GTM's Preview Mode** 

1. Click on "Preview" at the top right of the GTM interface.
2. This will open a new browser tab, where you'll navigate to your website.
3. Perform actions that should trigger the tag you've configured. 
4. Check the GTM Preview pane that appears at the bottom of your website. It should show the tags that are fired upon your actions.
5. Specifically, confirm that your DevCycle feature and variation data is correctly passed to GA4 tags.

When you've confirmed that your data is being passed in correctly, publish your changes by clicking on "Submit"!

## Google Analytics 4 Configuration

### Reporting in Google Analytics 4

1. Navigate to "Reports" > "Library" > "New Report".
2. Choose the metric for analysis under "Event Metric".
3. Select the feature property under "Dimension," e.g., **`DevCycle_featureNameA`**.
   - If the dimension doesn't exist:
      1. Go to "Admin" > "Custom definitions" > "Create custom dimension".
      2. Set the scope to `Event` and name the event parameter according to your feature.

<details>
  <summary>
 <b><i className="fas fa-arrows-alt"></i> Contributing to DevCycle or Creating a New Integration:</b>
  </summary>
  <div>     
    <p>
    DevCycle's tools and integrations are open source and can be found on the <a href="https://github.com/devcycleHQ">DevCycle GitHub repository</a>.
</p>
<p>
 For new integrations, refer to <a href="/management-api/">DevCycle's Management API</a> and <a href="/bucketing-api/">DevCycle Bucketing API</a>.
  </p>
  </div>
</details>
