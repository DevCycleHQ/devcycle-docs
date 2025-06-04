---
title: Organizations
sidebar_position: 1
---

Organizations are the top level of the Account hierarchy within DevCycle, and are where all Users, Projects, and settings are managed. Users within an organization have the same [permissions](/platform/security-and-guardrails/permissions) across all projects, and a user may be part of multiple Organizations.

:::tip

[Granular permissions](/platform/security-and-guardrails/permissions) are only available on Business or Enterprise plans. If you'd like to turn on permissions, contact [support](mailto:support@devcycle.com).

:::

To view or switch Organizations, click your user avatar in the top-right corner of the DevCycle Dashboard. The active Organization will be marked with a green badge.

:::caution
Please note that organizational settings cannot currently be viewed or changed through the CLI and require use of the dashboard.
:::
 
## Discovering Other Organizations

If **Organization Discoverability** is enabled (it is by default), DevCycle will automatically check if any existing Organizations were created by others within your company or domain when a new user signs up. If a match is found, the user will be presented with the option to request access to an existing Organization or create a new one.

To manually explore other Organizations within your domain, go to the [Discovery page](https://app.devcycle.com/organizationDiscovery) by selecting Find and Create Orgs from the avatar dropdown in the top-right corner of the Dashboard.

On this page, you’ll see a list of all Organizations associated with your domain. From there, you can:
- Request to join an existing Organization
- Create a new Organization from scratch

:::info
Only **Owners** can see and manage membership requests that come in via this method.
:::

If you prefer to explicitly control who joins your Organization, you can disable Organization Discoverability from the Organization settings page. This ensures users can only be added via direct invitation, rather than discovering and requesting to join your Organization.

If your team is using **SSO and [Role-Based Access Control (RBAC)](/platform/security-and-guardrails/permissions#full-role-based-access-control-project-level-roles--enterprise-only)**, this setting does not apply—user access is handled entirely through your identity provider, and Organization Discoverability is effectively bypassed.

---

## Organization Settings

To access the settings for the current Organization, ensure the Organization you wish to modify is selected and click the settings button in the dropdown presented after you click your avatar.

On the Organization settings page there are the following fields and items:

|                                 |                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Organization Name**           | The name of your Organization, used throughout the Dashboard and API responses. |
| **Organization ID**             | The internal identifier for your organization. Mainly used for billing purposes.                               |
| **Organization Discoverability** (visible to Owners only)            | Determines whether new users from your domain can find and request to join this Organization. Enabled by default.
| **Permissions**     | Enable or disable org-wide roles that help protect production environments. Available only on Business and Enterprise plans. See [Permissions](/platform/security-and-guardrails/permissions) for more.  |
| **Jira Connection**       | Use this token to connect all projects in your organization to a single Jira Project. Please refer to our [Jira Integration Setup](/integrations/jira/jira-setup) documentation for more info.  |
| **Client ID and Client Secret** | Refer to [API and SDK Keys](/platform/account-management/keys).                                                          |

---

## Organization Members

Members can be managed from the "Team" section of the [Organization Settings](#organization-settings) page.

Under the **Members** tab, you'll see a list of all current Organization members.

The **Invitations** tab shows any pending invites.

If your Organization is discoverable, Owners will also see a **Membership Requests** tab. This displays requests from users within your domain to join the Organization—Owners can approve or deny these requests.

### Adding Members

Click "Add Team Member" to invite a new user. Enter their email to send an invitation. Once accepted, the user will be added to the Organization and assigned the default **Member** role.  

See [Organization Roles](#organization-roles) for more details.

### Editing Members

To view or update a Team Member’s roles, click "View Profile" next to their name. This opens the User’s profile page, where Owners can edit their [Organization Roles](#organization-roles).

### Removing Members

To remove a Member, either:  
- Have your SAML provider (e.g., Okta) deactivate their account, or  
- Click "Remove" next to their name on the Members list.  

This will remove the user from the Organization.

---

## Organization Roles

DevCycle supports role-based access to help secure Production environments and manage user responsibilities at both the organization and project level.

For a complete overview of available roles, permissions, how to administer them and examples of what users can and cannot do, visit the [Roles & Permissions](/platform/security-and-guardrails/permissions) documentation.

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

