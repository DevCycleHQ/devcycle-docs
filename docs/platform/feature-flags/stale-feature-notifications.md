---
title: Stale Feature Notifications 
sidebar_position: 5
---

:::info
Stale Feature Notifications are a Business feature. To learn more, read about our [pricing](https://devcycle.com/pricing). To upgrade your plan, please update your plan on your Billing Information page which can be found in your organization's Settings, or contact [Sales](mailto:sales@devcycle.com).
:::

Stale Features are identified based on specific conditions associated with their usage, modifications, and Feature type. DevCycle will alert you when a Feature has been qualified as potentially stale to help ensure that Features are surfaced for cleanup. 

If a Feature is marked as stale, DevCycle encourages users to take action by updating its status to Complete or Archived. This indicates that a Feature is ready to be cleaned up and removed from your codebase. 

## Stale Feature Reasons 

Features can belong to one of the following staleness reasons:

### Unmodified 

#### Short-Lived 

A Feature is classified as `Unmodified` if it has not been updated for more than 14 days. 

**Applicable to**: Release, Experiment Feature types.

#### Long-Lived 

A Feature is classified as `Unmodified` if it has not been updated for more than 30 days.

**Applicable to**: Ops, Permissions Feature types.

### Released

A **Released** Feature is one that has been serving the same variation to all users in a production environment for 14 or more days. DevCycle confirms that distribution has reached 100% and all rollouts are complete.


**Applicable to**: Release, Experiment Feature types.

### Unused 

An **Unused** Feature is one where there are no evaluations or defaults for any Variables associated with the Feature for 2 weeks. Targeting status is irrelevant.

**Applicable to**: All Feature types. 

:::info
Staleness Feature checks are ONLY conducted on Features that have an `In Progress` status. Features marked as `Complete` are not checked for staleness, as they should already be considered ready for cleanup given their status. 
:::

## Enabling Stale Feature Notifications for your Project

To enable or disable Stale Feature Notifications, go to your **Project Settings** and locate the **Stale Feature Notifications** section.

Only **Organization Owners** can enable or disable these notifications.

Use the dropdown to select **Enabled**. From there, choose which types of staleness you want DevCycle to monitor.


Use the dropdown and select **Enabled**. From there, you can specify which types of staleness you want DevCycle to check for.

![image of settings page](/apr-2025-stale-flag-settings-email.png)

## Stale Feature Notifications on the Dashboard

You can find a list of stale Features on the main landing page of DevCycle.

![image of home page](/nov-2024-stale-feat-home-page.png)

On the **Feature List** page, stale Features are marked with an exclamation point next to their status label. Hover over the status to see the specific staleness reason.

![image of list page hover](/nov-2024-stale-feat-list-page-hover.png)

You can also filter for all stale Features or specific staleness reasons on the Feature list page.

![image of list page](/nov-2024-stale-feat-list-page.png)

## Snoozing & Disabling Stale Feature Notifications 

If a Feature is marked as stale, you will see a notification at the top of the Feature page.

Click the **Details** button in the banner to go to the **Status** section, where you’ll see the exact reason for staleness.

To **snooze** the notification, click the **Snooze** button and choose how long to pause staleness checks for that Feature. After the snooze period ends, DevCycle will resume checking.

![image of snooze](/nov-2024-stale-feat-snooze.png)

To **unsnooze** or change the snooze period, click the **Unsnooze** button.

![image of unsnooze](/nov-2024-stale-feat-unsnooze.png)

To disable staleness checks for this Feature entirely, click the **Disable** button.

+To **re-enable** checks, go to the Feature’s **Settings** section and set the **Feature Staleness Check** dropdown to **Enabled**.

![image of enable staleness checks](/nov-2024-stale-feat-disable.png)

## Stale Feature Report Email Notifications 

You can also set up **recurring email reports** with a summary of stale Features in your project.

Each report includes:
1. The total number of stale Features as of the email date.
2. The change (delta) in stale Features since the last report.
3. A breakdown of staleness types. 
    * Clicking on the staleness type takes you to a filtered list of those Features in the dashboard.

![staleness email example](/apr-2025-stale-email-ex.png)

Choose your preferred frequency—**Weekly, Bi-Weekly, or Monthly**—and specify who should receive the emails.

![stale feature setttings section](/apr-2025-stale-flag-settings-email.png) 

If **Permissions are enabled** for your project:
* Only users with *Publisher access or higher* can edit the email recipient list.

If **Permissions are not enabled**: 
* *All users* can update the recipient list.