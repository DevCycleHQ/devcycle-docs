---
title: Organizations
sidebar_position: 1
---

Organizations are the top level of the Account hierarchy within DevCycle, and are where all Users and Projects are
managed. Users within an organization will have the same permissions across all projects, and a user may be part of
multiple Organizations.

To view the current Organization (or change Organizations) click on your user avatar on the top right of the DevCycle
Dashboard. The active Organization will have a green badge next to it.

**Discovering Other Organizations**

To find other organizations that might have been created by people within your Company / Domain, you can easily
[navigate to the Discovery page](https://app.devcycle.com/organizationDiscovery) by selecting `Find and Create Orgs`
from the avatar dropdown.

This will lead you to a list of all of the organizations within your domain's network. From here, you can request to
join other organizations, or create new ones.

:::caution Please note that organizational settings cannot currently be viewed or changed through the CLI and require
use of the dashboard. :::

---

## Organization Settings

To access the settings for the current Organization, ensure the Organization you wish to modify is selected and click
the settings button in the dropdown presented after you click your avatar.

On the Organization settings page there are the following fields and items:

|                                 |                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Organization Name**           | This is your organization's name which will be used throughout the Dashboard as well as in the API responses. |
| **Organization ID**             | The internal identifier for your organization. Mainly used for billing purposes                               |
| **Client ID and Client Secret** | Please refer to [API and SDK Keys](/essentials/keys)                                                          |

---

## Organization Members

Members are added to an Organization from the [Organization Settings](#organization-settings) page. Once here, navigate
to the "Team" page of the settings. This page will contain a list of all Members within the current Organization.

**Adding Members** From here, you can click the "Add Team Member" button to add a new Member to your Organization. This
will bring up a window where you can enter the email of the user you wish to invite. This will send an email to the
Member, allowing them to start the process of creating an account.

When a Member is added and an account is created, the user will begin within the Member role. To learn more about Roles,
read [Team Member Roles](#organization-roles).

**Editing Members**

To view more detail of a Team Members within your Organization, click the "View Profile" button on the Member's list for
the user you wish to view. This will lead to the User's profile page where you may modify their
[Team Member Role](#roles) if you are an Owner of the Organization.

**Removing Members**

To remove a Team Members from your Organization, either allow your SAML provider such as Okta to deactivate the account,
or click the "remove" button on the Member's list for the user you wish to remove. This will then remove the user from
the Organization entirely.

---

## Organization Roles

Roles within DevCycle determine what functionality specific Members in an organization may access. They can be used to
ensure that certain users are entirely unable to make modifications to any Production environments.

There are three main roles in DevCycle:

| Role          | Description                                                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Owner**     | This is the default role given to all users on the platform when not on an Enterprise or Business plan. All owners of an organization will be able to create/modify all items.                                                              |
| **Publisher** | A publisher can create and modify all things in the platform except for other members' roles. They can modify items that are in production and can also fully delete features and archive variables even if in production.                  |
| **Member**    | This role prevents any modification of any item that is enabled in production. This includes modifying targeting rules, variables, variations, or environments in any scenario where it would impact a feature in a Production environment. |

The table below displays the built-in roles and their associated permissions:

| Permission                    | Owner | Publisher | Member | Granular Owner<sup>1</sup> |
| ----------------------------- | :---: | :-------: | :----: | :------------------------: |
| Add Team Members              |  ✅   |    ✅     |   ✅   |             ✅             |
| Edit Team Member Roles        |  ✅   |           |        |             ✅             |
| Modify Features in Production |  ✅   |    ✅     |        |                            |

> _<sup>1</sup> Granular (by environment) Roles & Permissions are for Business/Enterprise Customers only. Contact our
> team for details._

**Assigning Roles**

To assign a role to a team member, simply navigate to their profile. If you have the requisite role, you will be able to
assign a new role to the member by using the Role dropdown.

After you have selected a role, click "save" and the team member's permissions will be automatically updated.

---

## Organization Billing

Your billing info including current plan and the payment information associated with your organization can be found in
the settings section of the platform under Billing & Plan.

On this page you'll be presented with three sections.

1. Your Plan
2. Payment Method
3. Cancel Subscription

**1. Your Plan**

This section of the Billing & Plan page shows the currently active plan for your Organization. It provides a description
of what's available on that plan and what capacity you can expect.

From this section you can also review other plan tiers and upgrade by clicking the "Change Plan" button.

**2. Payment Method**

This section allows you to add a credit card if you have not already done so.

:::tip

If you are currently seeing a notification that you have time remaining in your trial and you would like to stop
receiving that notification add a card here and that notification will go away.

:::

If your card has expired or if you would like to switch your payment method you can also update your payment method
here.

**3. Cancel Subscription**

If you need to cancel your subscription for any reason just use the "contact sales" button to send us a message and
someone from our customer success team will help you.
