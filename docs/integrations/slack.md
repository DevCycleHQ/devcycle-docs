---
title: Integration for Slack
sidebar_position: 11
---

This guide explains how to set up and use the DevCycle App for Slack.

You can use the DevCycle App for Slack to keep track of and monitor feature flags within your team's Slack workspace.

## Setup

1. Navigate to the Settings page in the DevCycle Dashboard, click on Integrations in the side navigation bar, and click `View` on the Integration for Slack.

![Screenshot of Settings Page on dashboard](/july-2024-integrations-page.png)

2. Click on the `Add to Slack` button and connect the DevCycle App for Slack with your workspace.

![Screenshot of Integrations tab on dashboard](/july-2024-slack-page-add.png)

3. Once the DevCycle app has been added, you can now subscribe to Feature changes on a project-level or by individual Feature(s).
4. First, navigate to the Slack channel where you would like to have the Slack messages to be posted.

   - To add a subscription for project-level changes, use the command `/devcycle subscribe project-key`. To find a project's respective key, go to your organization's [Project Settings page](https://app.devcycle.com/r/settings/projects) and copy the key under the Project name.
     ![Screenshot of Integrations tab on dashboard](/apr-2024-slack6.png)
   - To add a subscription for individual feature changes, use the command `/devcycle subscribe project-key [-f feature-key]`.
   - To add a subscription for a project or feature changes on a specific environment, add the flag `[-e environment-key]` to the command. For example,
     - All Project changes for the specified Environment: `/devcycle subscribe project-key [-e environment-key]`
     - All Feature changes that impact the specified Environment: `/devcycle subscribe project-key [-f feature-key] [-e environment-key]`

5. Once you've susbcribed, you're all set! Go ahead and make some changes to a Feature then check your Slack Channel for notifications.

## Example Slack Message

![Screenshot of Slack Message](/apr-2024-slack5.png)

The `View Project [Name]` button will take you to the project that the Feature belongs to.

The `View Changes on Feature` will take you to the Audit Log entry with more details about the Feature modification.

## Slack Commands

- `/devcycle [ subscribe | unsubscribe | list | help ]`
- `/dvc [ subscribe | unsubscribe | list | help ]`

## Private Channels

To use the DevCycle Integration for Slack in private channels, you must invite the DevCycle App to the channel.

![Screenshot of Private Channel Invite Command](/aug-2024-slack-private-channel-invite.png)

![Screenshot of Private Channel Add App](/aug-2024-slack-private-channel-add.png)


## Uninstall the DevCycle App for Slack

In the case that you connected the DevCycle app for Slack to the wrong workspace or would like to remove it, please follow the instructions in this [Slack Help Center article](https://slack.com/help/articles/360003125231-Remove-apps-and-custom-integrations-from-your-workspace#remove-an-app).

![How to Remove DevCycle App for Slack](/apr-2024-slack-uninstall.png)
