---
title: Setting up an SDK
sidebar_position: 3
---

## Overview
This article serves as an initial starting point for setting up a DevCycle SDK. Deeper documentation can be found in the relevant SDK docs. Depending on your use case, DevCycle has various types of SDKs. [Read more about our server-side, mobile, and client-side SDKs here.](/sdk/)


## Setting up and Connecting a DevCycle SDK
The easiest way to ensure a proper SDK setup is to first [set up a feature flag on the DevCycle dashboard or API](your-first-feature.md).

Once you have chosen your preferred SDK, set up the SDK:

1. Install the DevCycle SDK via the relevant dependency manager. For example, the react SDK is installed via npm: ```npm i @devcycle/react-client-sdk```

2. Import DevCycle and initialize it. Depending on which [type of SDK](/sdk/) and which environment you are initializing for, the SDK Key the SDK is initialized with will be different. Read more about Environments and keys [here](#to-do).

3. Access your feature flag or variables. The SDK can return a feature, a specific variation, or a specific variation of a Feature. Read more about variables and variations [here](/home/feature-management/features-and-variables/variables-and-variations).

### Defaults and Connectivity
In the event that a user is not being targeted by the referenced feature, or if DevCycle has no connection, there are defaults and fallbacks in place to ensure that the SDKs still operate without concerns of crashes or no-ops.

When DevCycle initializes, it collects and stores all Feature configurations for the user. In the event that there is no connection to DevCycle, the SDK will first attempt to reference any locally stored Feature configuration. If this configuration is not available, DevCycle will always return the default configuration which is defined in the code.

In the event that a user is not a part of the referenced Feature, the DevCycle SDKs will return the default configuration which is defined in the code.




