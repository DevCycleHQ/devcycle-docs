---
title: API and SDK Keys
sidebar_position: 3
---

## Overview

This article serves to inform where all of your relevant SDK and API keys are and how to use them. 

### Management API Key

To access the [Management API](https://docs.devcycle.com/management-api/), first navigate to the Settings page. The settings page can be accessed from clicking on your profile image in the top right corner of the Dashboard. 

![Dropdown on DevCycle dashboard for account settings and org info](/account-dropdown.png)

To find your key for the management API, navigate to your Organization specific settings page:

![DevCycle Organization Settings showing Org name and api keys](/api-settings.png)

The Client Secret key can be revealed which will allow for use within the Management API. 

**Note:** Due to the fact that the Management API can read and modify all aspects of your DevCycle projects, DO NOT share this key or deploy any client-side code containing this key.


### Mobile, Client, And Server-Side Keys

All Environments within a Project have their own set of key. For more information about Environments, [please read here](/docs/home/feature-management/organizing-your-flags-and-variables/environments).

To find your keys for use within the various SDKs, navigate navigate to the Settings page. The settings page can be accessed from clicking on your profile image in the top right corner of the Dashboard. 

![Dropdown on DevCycle dashboard for account settings and org info](/account-dropdown.png)

From here, navigate to the Environments section:

![DevCycle Environment Settings for an Organization, showing the API Keys](/env-settings.png)

Each environment has three different keys: 

* Client-side SDK keys
* Server-side SDK keys
* Mobile SDK keys

To reveal these keys, click the "Show Keys" button on the top of the page.

#### Server-Side SDK Keys

All of the DevCycle Server-Side SDKs should be initialized with the Environment's Server-Side SDK key. This SDK key provides read-only access of the Features on your DevCycle Environment. This key is used for SDKs which currently make continuous calls to the DevCycle APIs for each SDK interaction per user. 

#### Client-Side SDK Keys

All of the DevCycle Client-Side SDKs (non-mobile) should be initialized with the Environment's Client-Side SDK key. This SDK key provides read-only access of the Features on your DevCycle Environment. This SDK Key grants access to a DevCycle environment's entire configuration, which will be referenced locally on the client with each SDK interaction per user.

#### Mobile SDK Keys

All of the DevCycle Mobile SDKs should be initialized with the Environment's Mobile SDK key. This SDK key provides read-only access of the Features on your DevCycle Environment. This SDK Key grants access to a DevCycle environment's entire configuration, which will be referenced locally on the client with each SDK interaction per user. 

This key is separate from the standard SDK keys due to the insecure nature of mobile applications and easy access of mobile application internal information. This SDK key only provides the Mobile SDKs with information relevant to the current user and will not download the information of any features the user is not presently in. 





