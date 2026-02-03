---
title: Compromised SDK Keys
sidebar_label: Compromised SDK Keys
sidebar_position: 2
description: How to address compromised SDK keys in your environmentden
---

# **Compromised SDK Keys**

## **Overview**

This document is meant to guide you through the process of addressing compromised SDK keys in your environment, which may have been detected through our integration with **[GitHub Secret Scanning](/best-practices/security/api-keys-secret-scanning)**. Compromised SDK keys pose a security risk as they can lead to unauthorized access, exposure of sensitive data, or misuse of your application's resources. To maintain the security and integrity of your application, it is crucial to keep relevant SDK keys secure and confidential.
## **Why SDK keys should never be compromised**

SDK keys play a vital role in accessing features and functionalities in your DevCycle environment. Compromised keys can lead to:

- Unauthorized access to your application's resources and sensitive data
- Exposure of user information to potential attackers
- Financial loss due to misuse of paid services and APIs
- Reputation damage due to security breaches

To prevent these risks, it is essential to keep your SDK keys secure and manage them according to the best practices outlined in our **[SDK Key Security and GitHub Secret Scanning](/best-practices/security/api-keys-secret-scanning)** documentation.
Server SDK Keys are considered especially high risk in a leak context - as they authorize requests to the environment's full configuration - which may expose targeting rules, or variations that are not released yet.

## **How and when to rotate an SDK Key**

If you see a banner on the DevCycle website indicating that GitHub Secret Scanning has detected a compromised key, OR if you are aware of a compromised key and must rotate, follow these steps to resolve the issue:

1. Generate new SDK keys for the affected environment.
2. Replace the compromised SDK keys with the newly generated ones in your application.
3. Invalidate the compromised SDK keys.

### **Generate New SDK Keys**

To generate new SDK keys for the affected environment, use the **`SdkKeysController_generate`** API endpoint:

**`POST /projects/{project}/environments/{environment}/sdk-keys`**

Replace **`{project}`** with the Project key or ID, and **`{environment}`** with the environment key or ID.

The request body should follow the schema **`GenerateSdkTokensDto`**. Please refer to the **[API documentation](/management-api/#tag/Environments/operation/SdkKeysController_generate)** for more details.

### **Replace Compromised SDK Keys in Your Application**

After generating the new SDK keys, replace the compromised keys in your application with the new ones. Make sure to update all instances where the compromised keys were used.

### **Invalidate Compromised SDK Keys**

To invalidate the compromised SDK keys, use the **`SdkKeysController_invalidate`** API endpoint:

**`DELETE /projects/{project}/environments/{environment}/sdk-keys/{key}`**

Replace **`{project}`** with the Project key or ID, **`{environment}`** with the environment key or ID, and **`{key}`** with the compromised SDK key.

Please refer to the **[API documentation](/management-api/#tag/Environments/operation/SdkKeysController_invalidate)** for more details.
After invalidation - the token is no longer available for use - and any future requests with the token will fail as the configuration attached to it has been deleted. Be aware the older versions of mobile/client applications may now return the default as the token they have is invalid.


## **Next Steps**

After completing these steps, your application should be using the newly generated SDK keys and the compromised keys should be invalidated. Remember to periodically check for any security issues and always follow the best practices for keeping your SDK keys secure.


For further assistance or support, please **[contact our support team](mailto:support@devcycle.com)**.