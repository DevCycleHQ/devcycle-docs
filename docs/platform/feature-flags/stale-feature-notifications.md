---
title: BETA - Stale Feature Notifications 
sidebar_position: 5
---

:::info
Stale Feature Notifications are a Premium feature. To learn more, read about our [pricing](https://devcycle.com/pricing). To upgrade your plan, please update your plan on your Billing Information page which can be found in your organization's Settings, or contact [Sales](mailto:sales@devcycle.com).  
:::

Stale Features are identified based on specific conditions associated with their usage, modifications, and Feature type. DevCycle will alert you when a Feature has been qualified as potentially stale to help ensure that Features are surfaced for cleanup. 

If a Feature is marked as stale, DevCycle encourages users to take action by updaing its status to Complete or Archived. This indicates that a Feature is ready to be cleaned up and removed from your codebase. 

## Stale Feature Reasons 

Features can belong to one of the following staleness reaons:

### Unmodified - Short-Lived 

A Feature is classified as `Unmodified - Short-Lived` if it has not been updated for more than 1 month.

**Applicable to**: Release, Experiment Feature types.

### Unmodified - Long-Lived 

A Feature is classified as `Unmodified - Long-Lived` if it has not been updated for more than 30 days.

**Applicable to**: Ops, Permissions Feature types.

### Released

A **Released** Feature is one that has been serving the same variation to all users in a production environment for 14 or more days. DevCycle will check that the distribution has reached 100% and all rollouts are complete. 

**Applicable to**: Release, Experiment Feature types.

### Unused 

An **Unused** Feature is one where there are no evaluations or defaults for any variables in the feature for 2 weeks. Targeting status is irrelevant.

**Applicable to**: All Feature types. 

:::info
Staleness Feature checks are ONLY conducted on Features that have an `In Progress` status. Features marked as `Complete` are not checked for staleness, as they should already be considered ready for cleanup given their status. 
:::

## Enabling Stale Feature Notifications for your Project

To enable Stale Feature Notifications, navigate to your Project's settings page and find the Stale Feature Notifications section.

Use the dropdown and select **Enabled**. From there, you can specify which types of staleness you want DevCycle to check for.

![image of settings page](/nov-2024-stale-feat-proj-settings.png)

## Stale Feature Notifications on the Dashboard

You can find a list of stale Features on the main landing page of DevCycle.

![image of home page](/nov-2024-stale-feat-home-page.png)

On the Feature list page, stale Features can be identified by an exclamation point beside its Status label. Hover over the status to quickly see the staleness reason for a given Feature. 

![image of list page hover](/nov-2024-stale-feat-list-page-hover.png)

You can also filter for all stale Features or specific staleness reasons on the Feature list page.

![image of list page](/nov-2024-stale-feat-list-page.png)

## Snoozing & Disabling Stale Feature Notifications 

If a Feature is marked as stale, you will see a notification at the top of the Feature page.

Click the `Details` button on the notification. This will take you to the Status section of the Feature page, where you will find the specific reason for the Feature's staleness.

To snooze a notification for a Feature, cclick on the `Snooze` button and select a timeframe in which you'd like to pause staleness checks for this Feature. After the time has elapsed, the Feature will be checked for staleness again.

![image of snooze](/nov-2024-stale-feat-snooze.png)

To unsnooze or change the snooze time period, click on the `Unsnooze` button.

![image of unsnooze](/nov-2024-stale-feat-unsnooze.png)

To disable staleness checks for this Feature entirely, click the `Disable` button.

To re-enable staleness checks for a Feature, navigate to the Settings section of the Feature page and update the Feature Staleness Check dropdown to **Enabled**. 

![image of enable staleness checks](/nov-2024-stale-feat-disable.png)
