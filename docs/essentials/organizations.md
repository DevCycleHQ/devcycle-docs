---
title: Organizations
sidebar_position: 1
---

This article serves to explain how DevCycle manages Organizations, Projects, and Features. Organizations contain Projects which contain your Features and Environments. A user may be part of multiple Organizations. All users in an Organization are part of all Projects. 

## Structure

**Organizations** Are the top level of the Account hierarchy within DevCycle. Organizations are where all Projects and Users are managed. An Organization contains Projects and Users. Users within an organization will have the same permissions across all projects.

**Projects** Are contained within an organization. Any user within an Organization will have access to all Projects within it. 

**Features** are contained within Projects. Each Feature is unique to its project.

## Viewing your Organizations

### Switching Organizations

To view the current **Organization** or change Organizations, click on the Account icon dropdown on the top right of the DevCycle Dashboard.

![Dropdown on DevCycle dashboard for account settings and org info pointing at current org](/may-2023-account-dropdown-2.png)

The currently active Organization will have a green badge next to it. 

### Discovering Organizations

To find other organizations that might have been created by people within your Company / Domain, you can easily navigate to the Discovery page:

![Dropdown on DevCycle dashboard for account settings and org info pointing at find orgs](/may-2023-account-dropdown-3.png)

This will lead you to a list of all of the organizations within your domain's network. From here, you can request to join other organizations, or create new ones: 

![Discovery page](/may-2023-organization-discover.png)

## Organization Settings

To access the settings for the current Organization, ensure the Organization you wish to modify is selected and click the settings button in the account dropdown. 

![Dropdown on DevCycle dashboard for account settings and org info pointing at settings](/march-2022-account-dropdown.png)

This will navigate you to the Settings page.

In this page there will be a section with your Organization's name. All of the pages in this section are directly related to the Organization. 

![Picture of an example DevCycle Organization's main settings page](/org-settings.png)

On the Organization settings page there are the following fields and items:

* **Organization Name**
    This is your organization's name which will be used throughout the Dashboard as well as in the API responses.

* **Organization ID**
    The internal identifier for your organization. Mainly used for billing purposes

* **Client ID and Client Secret**
    Please refer to [API and SDK Keys](/home/feature-management/organizing-your-flags-and-variables/api-and-sdk-keys)


## Organization Members

Members are added to an Organization from the [Organization Settings](/home/feature-management/organizing-your-flags-and-variables/organizations-projects#organization-settings) page. 

Once here, navigate to the "Team" page of the settings:

![An Organization's Team Settings Page, with a list of members in the current org](/team.png)

This page will contain a list of all Members within the current Organization. 

From here, you can click the "Add Team Member" button to add a new Member to your Organization.

![Add Member Button Highlighted on Team Settings page](/add-member.png)

This will bring up a window where you can enter the email of the user you wish to invite: 

![A modal with information on inviting a Member to the Organization](/add-modal.png)

This will send an email to the Member, allowing them to start the process of [creating an account](/home/feature-management/getting-started/creating-an-account)

When a Member is added and an account is created, the user will begin within the Member role. To learn more about Roles, read [Team Member Roles](/home/your-organization/manage-team/member-roles).

### Editing Members

To view more detail of a Team Members within your Organization, click the "View Profile" button on the Member's list for the user you wish to view:

![An arrow pointing to the "view" button on a Member on the Members list](/view-member.png)

This will lead to the User's profile page where you may modify their [Team Member Role](/home/your-organization/manage-team/member-roles) if you are an Owner of the Organization.


### Removing Members

To remove a Team Members from your Organization, either allow your SAML provider such as Okta to deactivate the account, or click the "remove" button on the Member's list for the user you wish to remove:

![Arrow pointing to remove button beside a Member](/remove-member.png)

This will then remove the user from the Organization entirely.

## Organization Roles

Roles within DevCycle determine what functionality specific Members in an organization may access. 

DevCycle's roles can be used to ensure that certain users are entirely unable to make modifications to any Production environments.

:::info

At the moment, roles and permissions are for Enterprise and Business Customers only. However, you can reach out to discuss this with us if necessary.

:::

### Assigning Roles

To assign a role to a team member, simply navigate to their profile. If you have the requisite role, you will be able to assign a new role to the member by using the Role dropdown.

![Change Roles Dropdown](/march-2023-permissions.png)

After you have selected a role, click "save" and the team member's permissions will be automatically updated.


### Roles

There are three main roles in DevCycle

**Owner**

This is the default role given to all users on the platform when not on an Enterprise or Business plan. All owners of an organization will be able to create/modify all items. 

**Publisher**

A publisher can create and modify all things in the platform except for other members' roles. They can modify items that are in production and can also fully delete features and archive variables even if in production.

**Member**

This role prevents any modification of any item that is enabled in production. This includes modifying targeting rules, variables, variations, or environments in any scenario where it would impact a feature in a Production environment.


## Organization Billing

Your billing info including current plan and the payment information associated with your organization can be found in the settings section of the platform under Billing & Plan.

On this page you'll be presented with three sections.

1. Your Plan
2. Payment Method
3. Cancel Subscription

### 1. Your Plan

This section of the Billing & Plan page shows the currently active plan for your Organization. It provides a description of what's available on that plan and what capacity you can expect.

From this section you can also review other plan tiers and upgrade by clicking the "Change Plan" button.

### 2. Payment Method

This section allows you to add a credit card if you have not already done so.

:::tip

If you are currently seeing a notification that you have time remaining in your trial and you would like to stop receiving that notification add a card here and that notification will go away.

:::

If your card has expired or if you would like to switch your payment method you can also update your payment method here.

### 3. Cancel Subscription

If you need to cancel your subscription for any reason just use the "contact sales" button to send us a message and someone from our customer success team will help you.