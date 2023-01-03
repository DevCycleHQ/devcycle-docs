---
title: Continuous Integration & Continuous Deployment
sidebar_position: 7
---

# Adopting Feature Flags for CI/CD

## Overview

Continuous integration (CI) and continuous deployment (CD) are processes that streamline the development lifecycle. Feature flags enhance a continuous deployment system in that it allows developers to merge and deploy code without impacting end-users. With feature flags, developers can easily detect and fix integration issues without hindering the productivity of other teams. Feature flags also allow code changes to live hidden from end-users in a production environment until the feature flag is enabled.

This article will discuss feature flag guidelines that optimize continuous integration and deployment. To complete this guide, you will need the following:

- proficiency in DevCycle Feature and Variable creation
- an understanding of unit and integration tests
- knowledge of CI/CD principles and practices

[A brief overview of CI/CD can be found here.](https://devcycle.com/solutions/ci-cd)

## When to create a feature flag

To successfully adopt feature flags into CI/CD, feature flagging must become a habit for developers. Before even coding the new feature, plan the feature flag, its variables, and [Targeting Rules](#using-targeting-rules-for-cicd). Backlog grooming sessions are an excellent time to discuss feature flagging. Waiting until after a problem has been found defeats the purpose of having flags to protect your controller branch. In contrast, creating flags during planning allows you to implement them as soon as you start coding. While it takes discipline, it will soon become part of the fabric of the team.

## Using Targeting Rules for CI/CD

DevCycle’s Targeting Rules are a powerful tool to foster CI/CD. Targeting Rules can be used in the development environment to separate the members of different dev teams. Let’s say your team created a feature flag called `Use Server Storage` to switch from storing data locally to storing it on a cloud server. To allow you to push code as often as possible, you could create a targeting rule that enables the feature for only the engineers responsible for `Use Server Storage`.

![targeting the server storage team](/august-2022-targeting-ci.png)

While you are still developing the feature, you can keep serving All Users with “Variation Off”. This ensures that the new code will not impact the other engineers’ working progress.

When the new code is ready to be merged and delivered, update the Targeting Rules to make it visible to the appropriate users. You can easily set their variation back to “Variation Off” if something goes wrong. This gives you ample time to resolve the issues without negatively impacting users.

To learn more about Targeting in DevCycle, read [Targeting Users](/docs/home/feature-management/features-and-variables/targeting-users)

## Testing Code that Uses Feature Flags

If you’ve already adopted continuous integration, you are likely taking advantage of automated testing. For instance, CircleCI is a tool that can automatically run your tests at every commit to your main/trunk branch. You can find out how to run your tests automatically on [CircleCI’s documentation](https://circleci.com/docs/config-intro).

Sometimes adding a feature flag results in a failed integration test. This could be because the current state of the feature flag contradicts the assertion your test expects. One way to fix this issue is to ensure your tests identify the correct user targeted by each of your expected variations.

Consider the `Use Server Storage` example we described earlier. Let’s say we have updated our Targeting Rules to enable `Use Server Storage` for internal users with an email domain of `@devcycle.com`. The `Use Server Storage` feature has been implemented in a React app as follows:

```jsx
const useServerStorage = useVariable('use-server-storage', false);

if (useServerStorage) {
	retrieveDataFromServer() // function for using server storage
}
else {
	retrieveDataFromLocal() // function for using local storage
}
```

Now consider a test that expects to find `retrieveDataFromServer()` to have been called once. If the test does not receive the email domain `@devcycle.com` to send to the SDK, it will result in the fallback value of `false`, meaning that `retrieveDataFromServer()` would not be called, failing the test. 

To fix the test, make sure to identify a user with the proper email, such as `test@devcycle.com`. Similarly, if you have a feature that uses custom properties for targeting, make sure to pass in the corresponding properties when you identify the user. Providing user data within the tests ensures that the SDK receives the correct feature and variable information based on the targeting rules, even when the tests are run automatically through CircleCI.

## Summary

In this guide, we covered the following topics:

- creating a feature flag before coding the feature to optimize feature flag usage
- using Targeting Rules to protect other users during integration and automated delivery
- passing user data to conduct effective integration tests