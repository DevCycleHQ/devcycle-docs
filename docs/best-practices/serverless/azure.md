---
title: Azure Functions
sidebar_position: 3
---

## Azure Functions with DevCycle Feature Flags

DevCycle is purpose-built to work at the edge, and just because you're building in serverless environments does not mean you need to stop using feature flags!

If you're a team on AWS and utilizing AWS Lambda, this document will outline exactly how you can get started with Feature Flags without any difficulty.

### Example Project for Azure Functions & DevCycle

To get you up and started, we've put together an example repository to be used to follow along with in this guide 

[https://github.com/DevCycleHQ/azure-functions-example](https://github.com/DevCycleHQ/azure-functions-example)

# Setting Up Feature Flags For the Example

## Story

Let's say you are a developer and working with the marketing team.

They have some small campaigns to launch in future months and want you to build a webpage to promote the events. Instead of changing the event details **every** time before the next event is launched, you can utilize DevCycle Feature Flags to help you coordinate with the marketing team. 

The below example will demonstrate how you can use our feature flags with different types (`Boolean`, `String`, `JSON`). I will explain how I use 3 feature flags in the followings. 

In the example code, `campaign-switch` (Boolean), is a switch to turn on/off the feature. 

Let’s say you have a campaign in October and December and don’t have one in November. You can just turn on your Feature Flag, `campaign-switch,` in Oct and Dec, and turn it off in Nov. 

No extra deployment is needed can always be owned by the marketing team. For `campaign-details` (JSON), you, as a developer, can set a data template of what you need in the website and let the marketing team change it whenever they want, like the number of guests, campaign id and name. 

For `dec-campaign-proposed-name`(String), it is convenient for the specific campaign team to add and choose the campaign name in the decision phrase. Sometimes we could have last-minute decisions, but with Feature Flags, the marketing team can change the campaign name easily by themselves (no coding needed!).

Next section helps you understand how we set the 3 feature flags in DevCycle!

### Setting up the feature on DevCycle Dashboard

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

### Setting Up Azure Function

This section will be using [Visual Studio Code](https://code.visualstudio.com/) to integrate with Azure Functions, make sure you have the environment set up correctly: [https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node#configure-your-environment](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node#configure-your-environment)

1. Go to your Azure portal and select one of your Function Apps with a Node.js runtime (using 16 LTS for this example)
[https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp)
    
    If you don’t have a function app you can create one and below is the example configuration:
    
    ![Screen Shot 2022-09-13 at 3.14.11 PM.png](/Screen_Shot_2022-09-13_at_3.14.11_PM.png)
    
2. Clone the example code from above:
https://github.com/DevCycleHQ/azure-functions-example
3. With the A[zure Tools extensio](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)n, you can click on the function cloned from the example code and deploy to the function app you have just created:
    
    ![Screen Shot 2022-09-13 at 3.37.48 PM.png](/Screen_Shot_2022-09-13_at_3.37.48_PM.png)
    
    ![Screen Shot 2022-09-13 at 3.31.51 PM.png](/Screen_Shot_2022-09-13_at_3.31.51_PM.png)
    
4. If you see a `AzureWebJobsStorage` error, here are the steps to solve:
    
    ![Screen Shot 2022-09-13 at 3.39.53 PM.png](/Screen_Shot_2022-09-13_at_3.39.53_PM.png)
    
    1. checking your storage account > access keys 
    2. then copy the “Connection string” 
        
        ![Screen Shot 2022-09-13 at 3.43.09 PM.png](/Screen_Shot_2022-09-13_at_3.43.09_PM.png)
        
    3. Go to your function app configuration, click “New application setting”, and paste the copied connection string to “Value”
        
        ![Screen Shot 2022-09-13 at 3.49.15 PM.png](/Screen_Shot_2022-09-13_at_3.49.15_PM.png)
        
    4. Save the configuration and deploy again in VSCode
5. Once deployed, you should see this message
    
    ![Screen Shot 2022-09-13 at 3.52.40 PM.png](/Screen_Shot_2022-09-13_at_3.52.40_PM.png)
    
6. Go back to your Azure Portal and set the environment variable `SERVER_KEY` in your function app configuration and save. [You can learn more about SDK keys and where to find them here.](https://docs.devcycle.com/docs/home/feature-management/organizing-your-flags-and-variables/api-and-sdk-keys)
    
    ![Screen Shot 2022-09-13 at 3.55.40 PM.png](/Screen_Shot_2022-09-13_at_3.55.40_PM.png)
    
7.  Go to your Function (i.e. HttpTrigger1), and “Test/Run” it
    
    ![Screen Shot 2022-09-13 at 4.02.08 PM.png](/Screen_Shot_2022-09-13_at_4.02.08_PM.png)
    
8. You should see the data you have set earlier in DevCycle dashboard!
    
    ![Screen Shot 2022-09-13 at 4.07.43 PM.png](/Screen_Shot_2022-09-13_at_4.07.43_PM.png)
    
9. You can play around the feature flags  we have set earlier and run the function again to see the result changed
    1. For example, let’s “Serve” the “Variation Off” for `campaign-switch` and “Save”
        
        ![Screen Shot 2022-09-13 at 12.06.57 PM.png](/Screen_Shot_2022-09-13_at_12.06.57_PM.png)
        
    2.   Run your function again
    3.  You should now see the following result
        
        ![Screen Shot 2022-09-13 at 4.09.54 PM.png](/Screen_Shot_2022-09-13_at_4.09.54_PM.png)
    
### Enable EdgeDB (NodeJS SDK Version)

[First, you need to enable EdgeDB in the DevCycle Dashboard](https://docs.devcycle.com/docs/home/feature-management/edgedb/edge-flags#setup)

With the [DevCycle NodeJs SDK ](https://docs.devcycle.com/docs/sdk/server-side-sdks/node) we use the `enableCloudBucketing` and `enableEdgeDB` options to enable EdgeDB usage. ([SDK initialization option details: ](https://docs.devcycle.com/docs/sdk/server-side-sdks/node#initialization-options))

```jsx
const dvcClient = DVC.initialize(serverKey, {
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

const { value: hasCampaign } = await dvcClient.variable(userWithAllData, "campaign-switch", false);
const { value: campaignData } = await dvcClient.variable({ user_id: "testuser_1234333" }, "campaign-details", {});
const { value: proposedCampaignTitle } = await dvcClient.variable({ user_id: "testuser_1234333" }, "dec-campaign-proposed-name", "");
```

With the`VIP` variation set in `dec-campaign-proposed-name`, we can head to the `dec-campaign-proposed-name` Feature in the dashboard and test EdgeDB:
1. Add a targeting rule with name “VIP” and move it above “All User” rule. 
2. In the Definition, select “User Email” and type in the email we have set in EdgeDB (i.e. `vip@email.ca`)
3. From the “Serve” dropdown, select “VIP”
4. Click “Save”
    
    ![Screen Shot 2022-09-13 at 12.39.19 PM.png](/Screen_Shot_2022-09-13_at_12.39.19_PM.png)

    
    10. Check the “Serverless with EdgeDB”([https://www.notion.so/taplytics/Google-Cloud-Functions-5e79586093d24e9087bd5f8a9b505197#b8f514e03e9246eebfa9e6ed3754b431](https://www.notion.so/Google-Cloud-Functions-5e79586093d24e9087bd5f8a9b505197)) section for the EdgeDB usage

    5. Go back to the Azure Function and run it again, you should see the “title” change to “VIP” which means we don’t need to pass in email in the below variable request and get the data `email` from EdgeDB!

```jsx
const { value: proposedCampaignTitle } = await dvcClient.variable({ user_id: "testuser_1234333" }, "dec-campaign-proposed-name", "");
```

And the result!

![Screen Shot 2022-09-13 at 12.48.01 PM.png](/Screen_Shot_2022-09-13_at_12.48.01_PM.png)