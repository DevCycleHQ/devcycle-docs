---
title: "Sending DevCycle Data as a Custom Event to GA4"
sidebar_position: 1
---

:::tip
**As of September 2023 [Google has announced a much simpler approach to this setup will be released shortly](https://support.google.com/tagmanager/answer/13543899).** At the moment, the setup between GTM and GA4 is longer than the previous methods of UA and Optimize. DevCycle will update this guide as soon as Google releases the new methods to GTM.
:::

### Coming from Google Optimize

This document provides a comprehensive guide on how to integrate DevCycle feature flags with Google Analytics 4 (GA4) for A/B testing through Google Tag Manager (GTM). If you are are a former Google Optimize customer and must change to GA4, this aims to allow for setting up a/b test analysis in GA4 while serving the randomized variations from DevCycle


### [GTM] Tags, Variables, and Triggers

- Tags let us perform some form of functionality (i.e. send data to GA4, initialize DVC)
- Variables are placeholders for values that we define (i.e. setting a variable in the dataLayer and referencing it’s value). We will use this to store the feature and variation data.
- Triggers are conditions that perform an action when met. We will use this to invoke the functionality set within our Tags.

## Google Tag Manager (GTM) Configuration

### Step 1: Create a New Tag to Initialize DVC and send Data

:::info
🗣 First, we need to get the feature and variation data from DVC. Once that data is extracted and transformed, we can then load it onto the data layer to be captured by the variables we will set up in Step 2.
:::

1. Open Google Tag Manager and navigate to your workspace.
2. Go to the "Tags" section and click on "New."
3. Name the tag, something like: “DevCycle Initialization & FF Config Values”
4. For "Tag Configuration," select "Custom HTML"
5. Inject a script tag that pushes the event `set_user_properties` to the dataLayer with the parameters: `featureName: {{featureName}}` and `variation: {{variation}}` 
6. For “Triggering” set the Firing Triggers to “Window Loaded”

![Tag Configuration](/sept-2023=ga4-1.png)

- Code Snippet
    
    ```jsx
    <script>
                var user = { isAnonymous: !0 };
                var dvcOptions = { logLevel: "debug" };
                var devcycleClient = DevCycle.initializeDevCycle(
                    "<SDK_KEY>",
                    user,
                    dvcOptions
                );
    
                devcycleClient.onClientInitialized().then(function () {
                    var features = devcycleClient.allFeatures();
                    pushData(features);
                });
                function pushData(featuresConfig) {
                    var arr = [];
    
                    // JSON to Array
                    for (var i in featuresConfig) {
                        arr.push([i, featuresConfig[i]]);
                    }
    
                    // Push feature and variation config to the dataLayer
                    for (var j = 0; j < arr.length; j++) {
                        var featureName = arr[j][0].replaceAll("-", "_");
                        var currentVariation = arr[j][1][
                            "variationName"
                        ].replaceAll("-", "_");
                        window.dataLayer.push({
                            event: "set_user_properties",
                            featureName: featureName,
                            variationName: currentVariation,
                        });
                    }
                }
            </script>
    ```
    

### Step 2: Create GTM Variables

:::info
🗣 To capture the data from DVC into GA4, we first need to save it to Variables within the data layer. For our use case, we will be creating 2 tags; one to store the feature name, one to store the variation.
:::

1. Go to the “Variable” section and click on “New” within the “User-Defined Variables” section.
    
![Tag Configuration](/sept-2023=ga4-2.png)
    
2. For “Variable Type” select “Data Layer Variable”.
3. For “Data Layer Variable Name”, input “featureName” and hit “Save”
4. Create a new variable with the same type.
5. For “Data Layer Variable Name”, input “variation” and hit “Save”

![Tag Configuration](/sept-2023=ga4-3.png)


### Step 3: Create a New Tag to Send the Custom Event to GA4

:::info
🗣 Now that the variables are set up, we can set up the tag that sends the data to GA4 when available.
:::

1. Open Google Tag Manager and navigate to your workspace.
2. Go to the "Tags" section and click on "New."
3. Name the tag, something like "GA4_Custom_User_Properties."
4. For "Tag Configuration," select "GA4 Event."
5. Under "Configuration Tag," select your existing GA4 Configuration Tag from the drop-down.
6. In "Event Name," input **`'set_user_properties'`**.
    
![Tag Configuration](/sept-2023=ga4-4.png)

### Step 4: Define the Trigger for the Custom Event Tag

:::info
🗣 Next, we’re going to create the trigger that sends the data over. This will be called immediately after we push the feature name and variation to the data layer.
:::

1. Still within the tag setup, scroll down to "Triggering."
2. Click on the pencil icon to select a trigger.
3. Click on the "+" icon to create a new trigger.
4. Set the trigger type to "Custom Event."
5. For "Event Name," input **`'set_user_properties'`**.
6. Save the trigger and the tag.

### Step 5: Publish Changes

1. Once the tag and trigger are set up, click "Submit" to publish the changes in GTM.

## Google Analytics Configuration

### **Reporting in GA4**

1. Navigate to "Reports" > "Library" > "New Report" in GA4.
2. Under "Event Metric," choose the event you wish to analyze (e.g., **`'Event Count'`**).
3. Under "Dimension," select the feature property you want to examine, e.g., **`DVC_featureNameA`**. If this dimension does not exist, you'll need to create it:
    - Navigate to "Admin" in GA4.
    - Click "Custom definitions" to create custom dimensions / metrics.
    - Click on “Create custom dimension”
    - Set the scope to be `Event`
    - Set the event parameter to the name of your feature (i.e. `DVC_featureNameA`)

<details>
  <summary>
 <b><i className="fas fa-arrows-alt"></i> Contributing to DevCycle or creating a new Integration:</b>
  </summary>
  <div>     
    <p>
    If you would like to contribute to an existing integration or tool, all of DevCycle's tools and integrations  are <a href="https://github.com/devcycleHQ">open source on the DevCycle github repository.</a>
</p>
<p>
 Further, if you'd like to create a new tool or integration, a great starting point is <a href="/management-api/">DevCycle's Management API</a> which allows you to modify and interact with features and more within a devcycle project, as well as the <a href="/bucketing-api/">DevCycle Bucketing API</a>  which is used to give users features and variables (as used within the DevCycle SDKs!)
  </p>
  </div>
</details>