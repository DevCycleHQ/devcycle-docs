---
title: Keys
sidebar_position: 4
---

Keys are used to grant access to DevCycle data through the SDK API or Management API. All Environments within a Project have their own set of SDK keys. For more information about Environments, [please read here](/essentials/overview#environments).

## Types of Keys

### SDK Keys
SDK Keys are used to authenticate an SDK with DevCycle.

SDK keys are separated into Server, Mobile and Client due to the unique security requirements and constraints of each platform. Features can also be targeted to a specific type of SDK using [SDK Visibility](/platform/security-and-guardrails/sdk-visibility)

#### Server Keys

All the DevCycle Server-side SDKs should be initialized with the Environment's Server-side SDK key. This SDK key provides read-only access to the Features on your DevCycle Environment. This key is used for SDKs which currently make continuous calls to the DevCycle APIs for each SDK interaction per user. It also has access to the full Project configuration data, which is used for local bucketing SDKs.

The Server-side SDK key must be kept secret, as it has access to the full configuration data of your Project. Never include this key in a client-side application. Doing so risks exposing it to end-users via mobile app unpacking or browser network inspection.

#### Client Key

All the DevCycle Client-side SDKs (non-mobile) should be initialized with the Environment's Client-side SDK key. This SDK key provides read-only access to the Features accessible by a given user on your DevCycle Environment. Specifically, it grants access to the DevCycle SDK API, which returns user-customized configurations including Feature information which they are permitted to access.

#### Mobile Keys

All the DevCycle Mobile SDKs should be initialized with the Environment's Mobile SDK key. This SDK key provides read-only access to the Features accessible by a given user on your DevCycle Environment. Specifically, it grants access to the DevCycle SDK API, which returns user-customized configurations including Feature information which they are permitted to access.

This key is separate from the standard SDK keys due to the differing security requirements of client-side (eg. browser) and mobile use cases. Separation allows one key to be rotated without affecting the other. 

### Management API Key

This key is required to interact with the DevCycle [Management API](/management-api).

---

## Managing Keys

**Client, Mobile and Server Keys**

To find your keys for use within the various SDKs, click the "key" icon in the top right of the dashboard header.

Each Environment listed has three different keys: 

* Client SDK keys
* Server SDK keys
* Mobile SDK keys

To reveal these keys, click the "Show Keys" button on the top of the page.

**Management API Key**

To access the [Management API](/management-api/), first navigate to the Settings page by clicking the "gear" icon in the dashboard header. 

Scroll to the "API Authentication" section.
The Client ID and Secret for use with the OAuth flow on the Management API will be listed here.

**Note:** Due to the fact that the Management API can read and modify all aspects of your DevCycle Projects,
DO NOT share this key or deploy any client-side code containing this key.