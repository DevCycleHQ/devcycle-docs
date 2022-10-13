---
title: Realtime Updates
sidebar_position: 10
---

## Overview

This article serves to explain how the SDKs handle realtime updates triggered by changes to your features from the DevCycle dashboard.

DevCycle leverages Server-Sent Events (SSE) to notify the SDKs that their config has changed and that they should fetch a new config. When a change 
to a feature (targeting rules, variable values, etc.) has been saved, our servers send a SSE to anyone subscribed to that project and triggers
the SDK to request a new config from DevCycle.

### Client-Side SDK

A connection URL is included in the config that the SDK fetches, triggering the SDK to open a connection with our SSE provider listening
for any changes from the dashboard.

The following Client-Side SDKs currently have Realtime Updates:

- Javascript SDK
- React SDK

#### **Javascript SDK** & **React SDK**

If the user loses focus on the webpage, the SDK will disconnect from the SSE provider and will reconnect when the user opens the tab / window again (i.e. the page's visibility state = `visible`). The SDK will also request a new configuration during reconnection to receive any updates it may have missed while the realtime connection was closed.
