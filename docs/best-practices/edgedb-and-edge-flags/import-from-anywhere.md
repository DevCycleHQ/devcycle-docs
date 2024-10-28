---
title: Super Segments Integrations via Zapier
sidebar_position: 3
---

## Importing data from anywhere 

Super Segments are collections of users that are targeted by data from any external source. 

This means that users or their data can be “imported” into DevCycle for targeting in experiments or features by making use of EdgeDB. 

While this can all be handled via the [EdgeDB API](/bucketing-api/#tag/EdgeDB), as outlined in [here](/essentials/targeting/edgedb), DevCycle has created a Zapier integration which allows for easy sending of data directly to the desired EdgeDB environment in a project. This makes connecting any tools (like [Amplitude](https://amplitude.com/), [Segment](https://segment.com/) and others) with Zapier integrations directly to DevCycle extremely simple!

## Salesforce Guide

Lets say for example you have a particular group in SalesForce you’d like to target. Or, better yet, you’d like a live updating cohort users from salesforce to target as they come in as new leads.

DevCycle’s EdgeDB allows DevCycle to integrate with SalesForce data with ease! Here is how you can set up a consistently up to date audience or cohort to target within DevCycle using SalesForce data.

### Setting up DevCycle

First and forcemost, head over to your project settings in the DevCycle dashboard and enable EdgeDB. This will enable the EdgeDB feature for this project and save your user’s data. 

![project settings](/sept_6_2022_zapier_guide_0.png)

### Setting up Zapier

First, lets create a brand new Zap

![Untitled](/sept_6_2022_zapier_guide_1.png)

From here we can pick the official Salesforce connection. If you have not set up salesforce in Zapier yet, [connect it by following this documentation.](https://zapier.com/help/doc/how-get-started-salesforce-zapier)

![Zapier zap setup start](/sept_6_2022_zapier_guide_2.png)

For this case, the event we are looking for is a New Record in SalesForce.

![Zapier zap setup 2](/sept_6_2022_zapier_guide_3.png)

Upon selecting that, we’re now able to test it and confirm that the connection is working.

![Testing the zap](/sept_6_2022_zapier_guide_4.png)

And now, we can send that data to DevCycle. Choose DevCycle as the followup action to the SalesForce trigger. 

:::info 
If you do not see DevCycle in the app list, please contact product@devcycle.com to ensure you are added to the list. or get access to the DevCycle Zapier integration by clicking this [link](https://zapier.com/developer/public-invite/155201/2a42e1bf3abaca344a431113f3390355/).
:::

![Choose devcycle app](/sept_6_2022_zapier_guide_5.png)

From the event list, choose “Update EdgeDB”.

![Choose EdgeDB](/sept_6_2022_zapier_guide_6.png)

If you wish, authorize your DevCycle account. For this particular action this is not necessary, as it simply uses your server SDK keys to perform the action. 

![Authorize DevCycle](/sept_6_2022_zapier_guide_7.png)

If you connect your account, the following fields will require input.

![Authorize DevCycle](/sept_6_2022_zapier_guide_8.png)

[These keys can be found directly on your Organization’s setting page within DevCycle.](/platform/account-management/keys)

![Keys Successful](/sept_6_2022_zapier_guide_9.png)

And finally, you can set up the action to send data to the appropriate section. 

**Server SDK Key -** Use the server SDK key found in your project for the environment you’d like to store the information on. 

**User ID -** This is the key that the supplied data will be stored under. While it is typically considered “user data”, this could be data for anything such as a restaurant ID, or a service ID, etc. 

**Custom Data -** This is the data that will be saved. You can save as much data as you’d like. Data is stored in simple key/value format.

:::info 
stored information is not shared across environments 
:::

![Salesforce Info Added](/sept_6_2022_zapier_guide_10.png)

In this example, given that this is a **new** salesforce record, there wouldn’t be any “user ID”, but we can use the user’s Email as our unique identifier.

In this case, we are going to save a key/value pair that has the key of **inbound_leads**. This key will be used later in DevCycle, so don’t forget it! It is essentially what you could consider the name of the cohort.

We’re going to save what the source of the lead was so we can specifically target users that came in from a specific source.

![Untitled](/sept_6_2022_zapier_guide_11.png)

Once done done, you can test the zap with the inputted data from before, and you’re good to go!

Now, any time a new lead enters SalesForce, it will be sent to EdgeDB with their email as the unique ID and their lead source as custom data.

![Filled salesforce info](/sept_6_2022_zapier_guide_12.png)

### Using the data to target a DevCycle feature.

Now that we’ve got data in EdgeDB, it can be used for targeting in any feature within DevCycle.

:::info 
Any data saved to EdgeDB is considered a “Custom Property” within DevCycle and can be targeted by simply adding that same property in the dashboard. To find out more about Custom Properties, [read here.](/essentials/targeting/custom-properties) 
:::

To use the SalesForce data from above, simply create a new custom property in the dashboard (if it does not already exist):

![Custom Property setup](/sept_6_2022_zapier_guide_13.png)

We will name it “inbound_leads” exactly as we have done in the zap

![Custom Property filled](/sept_6_2022_zapier_guide_14.png)

And then we will specifically target a certain type of lead source. From the test above, we used “paid_search”, so we can target on that to test.

![Targeting rule set up](/sept_6_2022_zapier_guide_15.png)

And thats it!

Now, from any SDK, as long as the enableEdgeDB is true, any user that came in from SalesForce as a Paid Source Lead will receive this feature flag!
