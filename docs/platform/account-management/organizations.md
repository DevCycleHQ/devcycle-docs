---
title: Organizations
sidebar_position: 1
---

Organizations are the top level of the Account hierarchy within DevCycle, and are where all Users and Projects are managed. Users within an organization will have the same [permissions](/platform/security-and-guardrails/permissions) across all projects, and a user may be part of multiple Organizations.

To view the current Organization (or change Organizations) click on your user avatar on the top right of the DevCycle Dashboard. The active Organization will have a green badge next to it.

:::tip

[Granular permissions](/platform/security-and-guardrails/permissions) are only available on business or enterprise plans, if you'd like to turn on permissions message us at support[at]devcycle.com

:::
 
**Discovering Other Organizations**

To find other organizations that might have been created by people within your Company / Domain, you can easily [navigate to the Discovery page](https://app.devcycle.com/organizationDiscovery) by selecting `Find and Create Orgs` from the avatar dropdown.

This will lead you to a list of all of the organizations within your domain's network. From here, you can request to join other organizations, or create new ones.

:::caution
Please note that organizational settings cannot currently be viewed or changed through the CLI and require use of the dashboard.
:::

---

## Organization Settings

To access the settings for the current Organization, ensure the Organization you wish to modify is selected and click the settings button in the dropdown presented after you click your avatar.

On the Organization settings page there are the following fields and items:

|                                 |                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Organization Name**           | This is your organization's name which will be used throughout the Dashboard as well as in the API responses. |
| **Organization ID**             | The internal identifier for your organization. Mainly used for billing purposes                               |
| **Client ID and Client Secret** | Please refer to [API and SDK Keys](/platform/account-management/keys)                                                          |

---

## Organization Members

Members are added to an Organization from the [Organization Settings](#organization-settings) page. Once here, navigate to the "Team" page of the settings. This page will contain a list of all Members within the current Organization.

**Adding Members**
From here, you can click the "Add Team Member" button to add a new Member to your Organization. This will bring up a window where you can enter the email of the user you wish to invite. This will send an email to the Member, allowing them to start the process of creating an account.

When a Member is added and an account is created, the user will begin within the Member role. To learn more about Roles, read [Organization Roles](#organization-roles).

**Editing Members**

To view more detail of a Team Members within your Organization, click the "View Profile" button on the Member's list for the user you wish to view. This will lead to the User's profile page where you may modify their [Organization Roles](#organization-roles) if you are an Owner of the Organization.

**Removing Members**

To remove a Team Members from your Organization, either allow your SAML provider such as Okta to deactivate the account, or click the "remove" button on the Member's list for the user you wish to remove. This will then remove the user from the Organization entirely.

---

## Organization Roles

Roles within DevCycle determine what functionality specific Members in an organization may access. They can be used to ensure that certain users are entirely unable to make modifications to any Production environments.

There are three main roles in DevCycle:

| Role          | Description                                                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Owner**     | This is the default role given to all users on the platform when not on an Enterprise or Business plan. All owners of an organization will be able to create/modify all items.                                                              |
| **Publisher** | A publisher can create and modify all things in the platform except for other members' roles. They can modify items that are in production and can also fully delete features and archive variables even if in production.                  |
| **Member**    | This role prevents any modification of any item that is enabled in production. This includes modifying targeting rules, variables, variations, or environments in any scenario where it would impact a feature in a Production environment. |

The table below displays the built-in roles and their associated permissions:

| Permission                    | Owner | Publisher | Member |
| ----------------------------- | :---: | :-------: | :----: |
| Add Team Members              |  ✅   |    ✅     |   ✅   |
| Remove Team Members           |  ✅   |           |        |
| Edit Team Member Roles        |  ✅   |           |        |
| Modify Features in Production |  ✅   |    ✅     |        |

For more information, check out the [Permissions](/platform/security-and-guardrails/permissions) documentation.

**Assigning Roles**

To assign a role to a team member, simply navigate to their profile. If you have the requisite role, you will be able to assign a new role to the member by using the Role dropdown.

After you have selected a role, click "save" and the team member's permissions will be automatically updated.

---

## Organization Billing

Your billing info including current plan and the payment information associated with your organization can be found in the settings section of the platform under Billing & Plan.

On this page you'll be presented with three sections.

1. Current Plan
2. Payment Settings
3. Account Usage

**1. Current Plan**

This section of the Billing & Plan page shows the currently active plan for your Organization. It provides a description of what's available on that plan and what capacity you can expect.

From this section you can also review other plan tiers and upgrade by clicking the "Change Plan" button. 

**2. Payment Settings**

This section allows you to update the email where invoices will be sent to, and add or update your payment method.

:::tip

If you are currently seeing a notification that you have time remaining in your trial and you would like to stop receiving that notification add a card here and that notification will go away.

:::

**3. Account Usage**

This section charts the trailing number of client-side **Monthly Active Users (MAU)** and **Experimentation Events** that have accumulated over the billing period.

| Term | Definition |
| - | - |
| Monthly Active Users (MAU) | MAUs are unique users who initialize a client-side SDK at least once within a month. Users are identified by a `userId` which is set during SDK [initialization](/sdk/features#initialization) or via an [identify](/sdk/features#identifying-a-user-or-setting-properties) request. If no `userId` is provided during initialization, an [anonymous userId](/sdk/features#anonymous-users) is assigned automatically. Both identified and anonymous users are included in the MAU calculation. |
| Experimentation Events | Experimentation events are [Custom Events](/sdk/features#tracking-custom-events) that are initiated via an SDK and serve as a foundation for tracking custom [Metrics](/platform/experimentation/creating-and-managing-metrics/). |

