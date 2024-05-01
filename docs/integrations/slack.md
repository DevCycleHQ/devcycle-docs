---
title: Slack
sidebar_position: 11
---

This guide explains how to set up and use the DevCycle Slack app.

You can use the DevCycle Slack app to keep track of and monitor feature flags within your team's Slack workspace.

## Setup

1. Open the integrations tab on DevCycle Dashboard and navigate to the dedicated Slack page.

![Screenshot of Integrations tab on dashboard](/apr-2024-slack1.png)

2. Click on the `Add to Slack` button and connect the DevCycle Slack app with your workspace.

![Screenshot of Integrations tab on dashboard](/apr-2024-slack2.png)

3. Once the DevCycle app has been added, you can now subscribe to Feature changes on a project-level or by individual Feature(s).
4. First, navigate to the Slack channel where you would like to have the Slack messages to be posted.

   - To add a subscription for project-level changes, use the command `/devcycle subscribe [project-key]`. To find a project's respective key, go to your organization's [Project Settings page](https://app.devcycle.com/r/settings/projects) and copy the key under the Project name.
     ![Screenshot of Integrations tab on dashboard](/apr-2024-slack6.png)
   - To add a subscription for individual feature changes, use the command `/devcycle subscribe [project-key] [feature-key]`.

5. Once you've susbcribed, you're all set! Go ahead and make some changes to a Feature then check your Slack Channel for notifications.

## Example Slack Message

![Screenshot of Slack Message](/apr-2024-slack5.png)

The `View Project [Name]` button will take you to the project that the Feature belongs to.

The `View Changes on Feature [Feature Name]` will take you to the Audit Log entry with more details about the Feature modification.

## Slack Commands

- `/devcycle [ subscribe | unsubscribe | list | help ]`
- `/dvc [ subscribe | unsubscribe | list | help ]`

## Uninstall the DevCycle Slack App

In the case that you connected your Slack app to the wrong workspace or would like to remove it, please follow the instructions in this [Slack Help Center article](https://slack.com/help/articles/360003125231-Remove-apps-and-custom-integrations-from-your-workspace#remove-an-app).

![How to Remove DevCycle Slack App](/apr-2024-slack-uninstall.png)
