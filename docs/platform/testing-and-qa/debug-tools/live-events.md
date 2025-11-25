---
title: Live Events
sidebar_position: 3
---

The **Live Events** debugging tool lets you track a user's SDK events as they happen in real-time. It helps to quickly verify that your implementation is working correctly and if you're seeing the results that you intended to.

#### Why use it?

- Confirm that your SDK is initializing correctly.
- Ensure that your Variables are being evaluated or defaulted as expected.
- Verify that your Custom Events are being tracked accurately.

## Usage

To start listening to live events, input a `User ID` or use your `DevCycle Identity` to listen to their events.

![image of searching and results](/live-events-overview.png)

Press the `Start` button to start listening to your specified user's events. Once started, events will populate as they come through for 5 minutes before the connection automatically closes. You may also manually stop and reset the connection at any time.

## Results

The results display a stream of events triggered by the SDK you’ve installed.

Each event includes the following details:
- The [Event Type](/platform/testing-and-qa/debug-tools/live-events#event-types) - e.g. User Configuration, Variable Evaluated, Variable Defaulted, Custom Event Type.
- The Environment the event was triggered on.
- The Variable key or the Event Target, depending on the Event Type.
- The Variable value or the Event Value, depending on the Event Type.
- The [Evaluation Reason](/sdk/features/#evaluation-reasons). 

You can filter the events further by Environment, Platform, and Event Type. 

![image of results](/live-events-results.png)

Click `View Details` to see the full user object that triggered the event, along with the raw Event data.

![image of slideover](/live-events-slideover.png)

### Event Types

| Event Type        | Description                                                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variableEvaluated | Triggered when a Variable is successfully evaluated. Shows which Variable key and value were returned, along with the evaluation reason.                                                                 |
| variableDefaulted | Triggered when a Variable evaluation fails and a default value is returned. Useful for identifying misconfigurations or missing SDK contexts.                                                            |
| customEvent       | Triggered when a [Custom Event](/sdk/features#tracking-custom-events) is tracked by the SDK (e.g., clicks, conversions, or other user actions). |
| userConfig        | Triggered when the SDK fetched a config for the user. This could be on initialization, or due to a real-time update or a change in user properties.                                                                                           |
