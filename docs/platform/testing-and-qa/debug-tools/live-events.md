---
title: Live Events
sidebar_position: 3
---

Live Events allows you to track a user's events as they happen.

## Usage

To start listening to live events, input a `user_id` to listen to their events.

![image of searching and results](/live-events-overview.png)

Press the Start button to start listening to a specified user's events. Once started, the events will populate as they come through for 5 minutes until the connection closes.

## Results

The results shown are the type of event, the environment it was triggered in, the variable key and value, and the evaluation reason. You can also filter events by environment, platform, and event type.

![image of results](/live-events-results.png)

You can click `View Details` to see the full user object.

![image of slideover](/live-events-slideover.png)

### Event Types

| Event Type        | Description                                                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variableEvaluated | Triggered when a variable is successfully evaluated. Shows which variable key and value were returned, along with the evaluation reason.                                                                 |
| variableDefaulted | Triggered when a variable evaluation fails and a default value is returned. Useful for identifying misconfigurations or missing SDK contexts.                                                            |
| customEvent       | Triggered when a custom event is tracked by the SDK (e.g., clicks, conversions, or other user actions) - [Learn more about Custom Events](https://docs.devcycle.com/sdk/features#tracking-custom-events) |
| userConfig        | The SDK fetched a config for the user. This could be due to a real-time update or a change in user properties.                                                                                           |
