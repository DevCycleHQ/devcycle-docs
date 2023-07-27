---
title: Keys
sidebar_position: 4
---

All Environments within a Project have their own set of key. For more information about Environments, [please read here](/essentials/environments).

## Types of Keys

**Management API Key**

This key is required to interact with the DevCycle Management and Bucketing APIs.

**Server-side API Keys**

All of the DevCycle Server-Side SDKs should be initialized with the environment's Server-Side SDK key. This SDK key provides read-only access of the features on your DevCycle environment. This key is used for SDKs which currently make continuous calls to the DevCycle APIs for each SDK interaction per user. It also has access to the full project configuration data, which is used for local bucketing SDKs.

The Server-Side SDK key must be kept secret, as it has access to the full configuration data of your project. Never include this key in a client-side application. Doing so risks exposing it to end-users via mobile app unpacking or browser network inspection.

**Client-Side API Keys**

All of the DevCycle Client-Side SDKs (non-mobile) should be initialized with the environment's Client-Side SDK key. This SDK key provides read-only access to the features accessible by a given user on your DevCycle environment. Specifically, it grants access to the DevCycle SDK API, which returns user-customized configurations including feature information which they are permitted to access.

**Mobile SDK Keys**

All of the DevCycle Mobile SDKs should be initialized with the environment's Mobile SDK key. This SDK key provides read-only access to the features accessible by a given user on your DevCycle environment. Specifically, it grants access to the DevCycle SDK API, which returns user-customized configurations including feature information which they are permitted to access.

This key is separate from the standard SDK keys due to the differing security requirements of client-side (eg. browser) and mobile use cases. Separation allows one key to be rotated without affecting the other. In the future, it will also be possible to control feature availability specifically for mobile keys.

## Managing Keys


### From the CLI

**Client, Mobile and Server Keys**


Once you have installed and authorized the CLI, select your relevant organization and project then run one of the following commands depending on your use case:

To retrieve all keys for a specific environment for a project from the management API.

```bash
dvc keys get
```  

You will be prompted to select an existing environment and which SDK key you would like (`client`,`mobile`,`server` or `all`) and should be presented with something which looks like the following (which represents selecting all keys for the development environment for a project):


```json
{
  "mobile": [
    {
      "key": "dvc_mobile_abcdefg12345",
      "createdAt": "2023-07-26T16:28:16.183Z",
      "compromised": false,
      "compromised_url": ""
    }
  ],
  "client": [
    {
      "key": "dvc_client_abcdefg12345",
      "createdAt": "2023-07-26T16:28:16.182Z",
      "compromised": false,
      "compromised_url": ""
    }
  ],
  "server": [
    {
      "key": "dvc_server_abcdefg12345",
      "createdAt": "2023-07-26T16:28:16.183Z",
      "compromised": false,
      "compromised_url": ""
    }
  ]
}
```


**Management API Key**

:::caution
Accessing the Management API key from the CLI is not currently possible.
:::

### From the Dashboard

**Client, Mobile and Server Keys**

To find your keys for use within the various SDKs, navigate navigate to the Settings page. The settings page can be accessed from clicking on your profile image in the top right corner of the Dashboard. 

From here, navigate to the Environments section:

Each environment has three different keys: 

* Client-side SDK keys
* Server-side SDK keys
* Mobile SDK keys

To reveal these keys, click the "Show Keys" button on the top of the page.

**Management API Key**

To access the [Management API](/management-api/), first navigate to the Settings page. The settings page can be accessed from clicking on your profile image in the top right corner of the Dashboard. 

To find your key for the management API, navigate to your Organization specific settings page:

The Client Secret key can be revealed which will allow for use within the Management API. 

**Note:** Due to the fact that the Management API can read and modify all aspects of your DevCycle projects, DO NOT share this key or deploy any client-side code containing this key.

