---
title: SDK Key Security with GitHub Secret Scanning
sidebar_label: Github Secret Scanning
sidebar_position: 1
description: Leverage GitHub Secret Scanning to detect compromised keys in your repositories

---

At DevCycle, we value the security of your API and SDK keys. To ensure the safety of these keys, we have integrated with [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning). This integration helps detect any compromised keys in your GitHub repositories and notifies you about them. This article outlines the best practices for managing the security of your API and SDK keys in conjunction with GitHub Secret Scanning, including the different types of SDK keys: Client, Mobile, and Server.

## GitHub Secret Scanning Integration

If you are using GitHub, we will leverage its Secret Scanning feature to detect any compromised keys in your repositories. This process helps prevent unauthorized access to your DevCycle projects and environments.

When a compromised key is detected, we will display a banner on the DevCycle website, notifying you of the issue. This banner will include a link to the keys page, which will show which keys are compromised. Each compromised key will have a link to where the compromised key was first detected, allowing you to identify the source of the problem.

To resolve the issue, you will need to rotate the compromised key and invalidate the old one. Follow the steps outlined in the [Compromised SDK Keys](/best-practices/security/compromised-keys) section.


## Best Practices for API and SDK Key Security

To maintain the security of your API and SDK keys, follow these best practices:

1. **Store your keys securely**: Keep your API and SDK keys in a secure location, such as environment variables, secret managers, or secure file storage. Avoid hardcoding keys directly into your source code or configuration files.
2. **Limit key access**: Restrict access to your API and SDK keys only to the necessary personnel and services.
3. **Regularly review key usage**: Periodically review the usage of your API and SDK keys to detect any anomalies or unauthorized access.
4. **Rotate keys**: Rotate your API and SDK keys periodically, especially when team members leave the project or in case of a security breach as mentioned above.
5. **Use different keys for different environments**: Use separate API and SDK keys for different environments (e.g., development, staging, and production) to minimize the potential impact of a compromised key. [Luckily, this is made very easy within DevCycle](/platform/account-management/environments)

### Understanding SDK Key Types and their security implications

DevCycle splits its SDK keys into 3 categories:

1. **Client**: Meant for single-user contexts, these keys are used in SDK's that have a persistent data store for the user while the SDK is being used. Evaluation of Features happens in the Client SDK API Worker, which then returns all valid variables for a given user. These SDKs also include the Mobile SDKs. For more information on the difference between mobile and standard client-side SDK keys, read [API and SDK keys](/platform/account-management/keys).
These keys are considered safe to be in a client facing application - but should not be checked into source control.
2. **Mobile**: These keys are used for Mobile SDKs and provide read-only access to the features accessible by a given user on your DevCycle environment. They grant access to the DevCycle SDK API, which returns user-customized configurations including feature information that they are permitted to access. These keys are the same degree of severity as the Client SDK Keys - but should be considered safe to be in built mobile application binaries, but not checked into source control.
3. **Server**: Used for server-side SDKs, these keys provide read-only access to the features on your DevCycle environment. They are used for SDKs that make continuous calls to the DevCycle APIs for each SDK interaction per user and have access to the full project configuration data. **These are considered the highest security keys, and should be immediately rotated if compromised.**

Each key type has different permissions and usages, and that's why we allow you to use and rotate them separately.

## Compromised SDK Keys

If you have received a notification of compromised SDK keys, follow the steps in the [Compromised SDK Keys](/best-practices/security/compromised-keys) section to resolve the issue. These steps include generating new SDK keys, replacing the compromised keys in your application, and invalidating the compromised keys.


### **Additional Resources**

For more information about API and SDK key security, check out the following resources:

- **[GitHub Secret Scanning Documentation](https://docs.github.com/en/code-security/secret-security/about-secret-scanning)**
- **[How to Store and Access API Keys in a React Application](https://www.makeuseof.com/react-api-keys-store-access/)**
- **[Storing Secret Keys in Android](https://guides.codepath.com/android/storing-secret-keys-in-android)**
- **[How to securely handle the Third-party Keys in iOS](https://medium.com/@karthianandhanit/how-to-securely-handle-the-third-party-keys-in-ios-adc6266efc1f)**
- **[How To Protect Your API Key In Production With Next.js API Route](https://www.smashingmagazine.com/2021/12/protect-api-key-production-nextjs-api-route/)**
- **[How to Store API Keys in Flutter](https://codewithandrea.com/articles/flutter-api-keys-dart-define-env-files/#:~:text=the%20API%20key%20should%20be,API%20you%20intend%20to%20use)**
- **[Storing Sensitive Info in React Native](https://reactnative.dev/docs/security)**


For further assistance or support, please **[contact our support team](mailto:support@devcycle.com)**.