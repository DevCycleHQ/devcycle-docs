---
title: Reset User
sidebar_position: 5
---

## Overview

This article serves to explain how to use the SDKs to quickly reset the user context on Client-Side SDKs.

### Identifying a User or Setting Properties

Currently, the Identify function is only available on Client-Side SDKs. These SDKs are built to work in a single-user context on the device. The DevCycle Client-Side SDKs contain local storage of the current user's information for re-use with each function call. Using the Identify function will add to this storage. Using this function will completely reset the current user in context. 

## Client-Side SDK Usage

### [• Javascript SDK](/sdk/client-side-sdks/javascript#reset-user)

### [• React SDK](/sdk/client-side-sdks/react#resetting-user)

### [• React Native SDK](/sdk/client-side-sdks/react-native#resetting-user)

### [• Flutter SDK](/sdk/client-side-sdks/flutter#reset-user)

### [• iOS SDK](/sdk/client-side-sdks/ios#identifying-user#reset-user)

### [• Android SDK](/sdk/client-side-sdks/android#identifying-user#reset-user)
