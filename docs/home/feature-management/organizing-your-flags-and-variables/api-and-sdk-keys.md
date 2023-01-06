---
title: API and SDK Keys
sidebar_position: 3
---

## Overview

This article serves to inform where all of your relevant SDK and API keys are and how to use them. 

### Management API Key

To access the [Management API](/management-api/), first navigate to the Settings page. The settings page can be accessed from clicking on your profile image in the top right corner of the Dashboard. 

![Dropdown on DevCycle dashboard for account settings and org info](/march-2022-account-dropdown.png)

To find your key for the management API, navigate to your Organization specific settings page:

![DevCycle Organization Settings showing Org name and api keys](/api-settings.png)

The Client Secret key can be revealed which will allow for use within the Management API. 

**Note:** Due to the fact that the Management API can read and modify all aspects of your DevCycle projects, DO NOT share this key or deploy any client-side code containing this key.


### Mobile, Client, And Server-Side Keys

All Environments within a Project have their own set of key. For more information about Environments, [please read here](/docs/home/feature-management/organizing-your-flags-and-variables/environments).

To find your keys for use within the various SDKs, navigate navigate to the Settings page. The settings page can be accessed from clicking on your profile image in the top right corner of the Dashboard. 

![Dropdown on DevCycle dashboard for account settings and org info](/march-2022-account-dropdown.png)

From here, navigate to the Environments section:

![DevCycle Environment Settings for an Organization, showing the API Keys](/march-2022-env-settings.png)

Each environment has three different keys: 

* Client-side SDK keys
* Server-side SDK keys
* Mobile SDK keys

To reveal these keys, click the "Show Keys" button on the top of the page.

#### Server-Side SDK Keys

All of the DevCycle Server-Side SDKs should be initialized with the environment's Server-Side SDK key. This SDK key provides read-only access of the features on your DevCycle environment. This key is used for SDKs which currently make continuous calls to the DevCycle APIs for each SDK interaction per user. It also has access to the full project configuration data, which is used for local bucketing SDKs.

The Server-Side SDK key must be kept secret, as it has access to the full configuration data of your project. Never include this key in a client-side application. Doing so risks exposing it to end-users via mobile app unpacking or browser network inspection.

#### Client-Side SDK Keys

All of the DevCycle Client-Side SDKs (non-mobile) should be initialized with the environment's Client-Side SDK key. This SDK key provides read-only access to the features accessible by a given user on your DevCycle environment. Specifically, it grants access to the DevCycle SDK API, which returns user-customized configurations including feature information which they are permitted to access.

#### Mobile SDK Keys

All of the DevCycle Mobile SDKs should be initialized with the Environment's Mobile SDK key. This SDK key provides read-only access to the features accessible by a given user on your DevCycle environment. Specifically, it grants access to the DevCycle SDK API, which returns user-customized configurations including feature information which they are permitted to access.

This key is separate from the standard SDK keys due to the differing security requirements of client-side (eg. browser) and mobile use cases. Separation allows one key to be rotated without affecting the other. In the future, it will also be possible to control feature availability specifically for mobile keys.





