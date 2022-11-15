---
title: Using EdgeDB via API
sidebar_position: 2
---

# Super Segments and Edge Flags Simple API Approach

Super segments are collections of users that are targeted by data from any external source. 

This means that users and their data can be “imported” into DevCycle for targeting in experiments or features by making use of EdgeDB. 

This guide will outline how to insert data into DevCycle’s EdgeDB and then use it for targeting.

To demonstrate this in the simplest way with no SDK installations necessary, we will use simple api calls from postman.

## Saving Data to EdgeDB from anywhere

First, enable EdgeDB in your project’s settings.

![Project Settings](/sept-6-2022-edge-flags-api-1.png)

Now, lets save some data to EdgeDB. 

To do this, we’ll be following the EdgeDB docs from the [Bucketing API](/bucketing-api/#tag/EdgeDB).

In this case, we will update a user simply called “example_user”

We will also supply some custom data. Lets use the example of the concept of a cohort of special users you’d like to create. So we can pass that data as custom data:

![Custom Data Sending](/sept-6-2022-edge-flags-api-2.png)

To test it yourself, here is the data:

```
{
    "user_id": "example_user",
    "customData": {
        "cohort_id": "special"
    }
}
```

Next, we need to supply the auth. Switch to the authorization tab and change the type to API Key. 

For the “Value”, supply the server SDK key found in your [environments & keys tab.](/docs/home/feature-management/organizing-your-flags-and-variables/api-and-sdk-keys)

![Untitled](/sept-6-2022-edge-flags-api-3.png)

For example, your production key might be here:

![Keys Example](/sept-6-2022-edge-flags-api-4.png)

Rather than using postman, you could simply use a cURL request to do all of this (supplying your server SDK key)

```powershell
curl --location --request PATCH 'https://sdk-api.devcycle.com/v1/edgedb/example_user' \
--header 'Authorization: <Your Server SDK KeY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": "example_user",
    "customData": {
        "cohort_id": "special"
    }
}'
```

After it runs you should receive the following message:

![Success Message](/sept-6-2022-edge-flags-api-5.png)

### Using the data to target a DevCycle feature.

Now that we’ve got data in EdgeDB, it can be used for targeting in any feature within DevCycle.

:::info 
Any data saved to EdgeDB is considered a “Custom Property” within DevCycle and can be targeted by simply adding that same property in the dashboard. To find out more about Custom Properties, [read here](/docs/home/feature-management/features-and-variables/custom-properties) 
:::

To use the postman data from above, simply create a new custom property in the dashboard (if it does not already exist):

![Custom Property Creation](/sept-6-2022-edge-flags-api-6.png)

Given that we named the custom data key “cohort id”, lets create that property in our project.

![Custom Property filled](/sept-6-2022-edge-flags-api-7.png)

And then we want to target the “special” users as we set up above.

![Targeting Rule Setup](/sept-6-2022-edge-flags-api-8.png)

Enable this feature for your environment, and save it, and now we can test for this user’s features using the [get variables feature in the Bucketing API](/bucketing-api/#operation/getVariables)

One thing to note is that there must be an `enableEdgeDB=true` flag

**With the usage of EdgeDB, the user ID should have the custom data of `“cohort_id:”special user”` so we should only need to supply the user_id to the API and the user should receive the feature specified, as EdgeDB has the requisite info.**

So we set it up like so:

![Postman Setup](/sept-6-2022-edge-flags-api-9.png)

Ensure the authorization is set up with your server sdk key like above:

![Authorization setup](/sept-6-2022-edge-flags-api-10.png)

cURL

```powershell
curl --location --request POST 'https://bucketing-api.devcycle.com/v1/variables/?enableEdgeDB=true' \
--header 'Authorization: <Your-Server-SDK-Key>' \
--header 'Content-Type: application/json' \
--data-raw '{"user_id":"example_user"}'
```

After running it: Vola! We receive the special feature which requires custom properties to target, without sending it in the request! It is successfully getting the data from EdgeDB:

![Success Feature Flag check!](/sept-6-2022-edge-flags-api-11.png)
