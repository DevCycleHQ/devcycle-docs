---
title: Google Cloud Functions
sidebar_position: 1
---

## Google Cloud Functions with DevCycle Feature Flags

DevCycle is purpose-built to work at edge, and just because you're building in serverless environments does not mean you need to stop using feature flags!

If you're a team on GCP and utilizing Google's Cloud Functions, this document will outline exactly how you can get started with Feature Flags without any difficulty.

### Example Project for Google Cloud Functions & DevCycle

To get you up and started, we've put together an example repository to be used to follow along with in this guide 

[https://github.com/DevCycleHQ/google-cloud-functions-example](https://github.com/DevCycleHQ/google-cloud-functions-example)

### Setting up your Features 

Before setting up your Google Cloud function, we will set up three Features on the DevCycle dashboard of three different types: `campaign-switch` (Boolean), `campaign-details` (JSON), `dec-campaign-proposed-name`(String).

To set the feature flags, make sure you have a DevCycle account [https://devcycle.com/](https://devcycle.com/).

1. Click “Create New Feature” from your “Feature Management” section
    
    ![Screen Shot 2022-09-13 at 11.05.15 AM.png](/Screen_Shot_2022-09-13_at_11.05.15_AM.png)
    
2. Click “Release” and type in the feature flag name in the popped up modal.
    
    ![Screen Shot 2022-09-13 at 11.03.52 AM.png](/Screen_Shot_2022-09-13_at_11.03.52_AM.png)
    
3. By default, you will see a Boolean feature flag
    
    ![Screen Shot 2022-09-13 at 11.08.49 AM.png](/Screen_Shot_2022-09-13_at_11.08.49_AM.png)
    
4. Repeat step 1 - 2 for `campaign-details` and `dec-campaign-proposed-name`
5. For `campaign-details` (JSON) and `dec-campaign-proposed-name`(string), you will need to remove the default boolean flag by clicking the edit button next to it and “Delete” in the popped up modal
    
    ![Screen Shot 2022-09-13 at 11.15.01 AM.png](/Screen_Shot_2022-09-13_at_11.15.01_AM.png)
    
    ![Screen Shot 2022-09-13 at 11.16.57 AM.png](/Screen_Shot_2022-09-13_at_11.16.57_AM.png)
    
6. For `campaign-details` (JSON), “Add Variable” with `JSON` type and put in the object as below
    
    ![Screen Shot 2022-09-13 at 11.12.37 AM.png](/Screen_Shot_2022-09-13_at_11.12.37_AM.png)
    
    ![Screen Shot 2022-09-13 at 11.22.27 AM.png](/Screen_Shot_2022-09-13_at_11.22.27_AM.png)
    
    ![Screen Shot 2022-09-13 at 11.23.35 AM.png](/Screen_Shot_2022-09-13_at_11.23.35_AM.png)
    
7.  For `dec-campaign-proposed-name`(string), “Add Variable” with `String` type and put in the string as below
    
    ![Screen Shot 2022-09-13 at 11.29.42 AM.png](/Screen_Shot_2022-09-13_at_11.29.42_AM.png)
    
8. “Save” after editing the variable and variations
    
    ![Screen Shot 2022-09-13 at 11.25.31 AM.png](/Screen_Shot_2022-09-13_at_11.25.31_AM.png)
    

### Setting Up a Google Cloud Function

1. Go to your Google Cloud Functions console([https://console.cloud.google.com/functions](https://console.cloud.google.com/functions)) to create a function. ([For more info from Google](https://cloud.google.com/functions/docs/console-quickstart))
2. Follow below configurations
    
    ![Screen Shot 2022-09-13 at 11.42.38 AM.png](/Screen_Shot_2022-09-13_at_11.42.38_AM.png)
    
3. Add the environment variable `SERVER_KEY` under “Runtime environment variables” ([Related Google Doc](https://cloud.google.com/functions/docs/configuring/env-var) 
For getting the server-side SDK key from DevCycle, you can read this section ([https://docs.devcycle.com/essentials/keys](/essentials/keys))
    ![Screen Shot 2022-09-13 at 11.51.57 AM.png](/Screen_Shot_2022-09-13_at_11.51.57_AM.png)
    
4. Click “Next” and enter the ([contents of the `index.js` from the example repo](https://github.com/DevCycleHQ/google-cloud-functions-example/blob/main/index.js)) into the Console
    ![Screen Shot 2022-09-13 at 11.47.59 AM.png](/Screen_Shot_2022-09-13_at_11.47.59_AM.png)
    
5. Add the DevCycle SDK to `package.json`
    
    ![Screen Shot 2022-09-13 at 11.48.06 AM.png](/Screen_Shot_2022-09-13_at_11.48.06_AM.png)
    
6. Click “Deploy”, once finished, you'll be given a URL
    
    ![Screen Shot 2022-09-13 at 12.01.52 PM.png](/Screen_Shot_2022-09-13_at_12.01.52_PM.png)
    
7. Go to that URL and you should see the Feature info we set up!
    
    ![Screen Shot 2022-09-13 at 12.04.41 PM.png](/Screen_Shot_2022-09-13_at_12.04.41_PM.png)
    
8.  You can play around with the feature flags we have created earlier to see the result changed in the page.
9. For example, let’s “Serve” the “Variation Off” for `campaign-switch` and “Save”
    
    ![Screen Shot 2022-09-13 at 12.06.57 PM.png](/Screen_Shot_2022-09-13_at_12.06.57_PM.png)
    
10.  Refresh your function's page
11.  You should now see the following result in the page:
    
    ![Screen Shot 2022-09-13 at 12.08.55 PM.png](/Screen_Shot_2022-09-13_at_12.08.55_PM.png)
    

## Serverless with EdgeDB

EdgeDB is purpose built to work at edge, and when used in conjunction with a serverless system like Cloud Functions, it actually makes the entire system even faster! 

Here is some more reading: 

[What is EdgeDB? (/home/feature-management/edgedb/what-is-edgedb)

[Use Cases of EdgeDB ](/extras/edgedb)

### Enable EdgeDB (NodeJS SDK Version)

First, you need to enable EdgeDB in the DevCycle Dashboard
[https://docs.devcycle.com/extras/edgedb)

With the [DevCycle NodeJs SDK ](/sdk/server-side-sdks/node) we use the `enableCloudBucketing` and `enableEdgeDB` options to enable EdgeDB usage. ([SDK initialization option details: ](/sdk/server-side-sdks/node/node-gettingstarted#initialization-options))

```jsx
const devcycleClient = DVC.initialize(serverKey, {
        enableCloudBucketing: true,
        enableEdgeDB: true
    });
```

With EdgeDB enabled, you can save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user.

Like this part of code from our example code, we only need to pass in the whole set of user data for the first time. After that, we only need `user_id` to get the rest of the data we have set in EdgeDB

```jsx
const userWithAllData = {
	  user_id: "testuser_1234333",
	  email: "vip@email.ca"
};

const { value: hasCampaign } = await devcycleClient.variable(userWithAllData, "campaign-switch", false);
const { value: campaignData } = await devcycleClient.variable({ user_id: "testuser_1234333" }, "campaign-details", {});
const { value: proposedCampaignTitle } = await devcycleClient.variable({ user_id: "testuser_1234333" }, "dec-campaign-proposed-name", "");
```

With the`VIP` variation set in `dec-campaign-proposed-name`, we can head to the `dec-campaign-proposed-name` Feature in the dashboard and test EdgeDB:
1. Add a targeting rule with name “VIP” and move it above “All User” rule. 
2. In the Definition, select “User Email” and type in the email we have set in EdgeDB (i.e. `vip@email.ca`)
3. From the “Serve” dropdown, select “VIP”
4. Click “Save”
    
    ![Screen Shot 2022-09-13 at 12.39.19 PM.png](/Screen_Shot_2022-09-13_at_12.39.19_PM.png)
    
5. Go back to the google cloud function URL and refresh, you should see the “title” change to “VIP” which means we don’t need to pass in email in the below variable request and get the data `email` from EdgeDB!

```jsx
const { value: proposedCampaignTitle } = await devcycleClient.variable({ user_id: "testuser_1234333" }, "dec-campaign-proposed-name", "");
```


And the result!

![Screen Shot 2022-09-13 at 12.48.01 PM.png](/Screen_Shot_2022-09-13_at_12.48.01_PM.png)
