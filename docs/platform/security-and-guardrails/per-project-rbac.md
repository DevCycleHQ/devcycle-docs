---
title: Per Project Role-Based Access Control
sidebar_position: 7
---

# Per Project Role-Based Access Control

:::info
Per Project Role-Based Access Control (RBAC) is an **Enterprise** feature. To learn more, read about our [pricing](https://devcycle.com/pricing). To upgrade your plan, please contact [Sales](mailto:sales@devcycle.com) or your Account Manager. 

If you're on an Enterprise plan and ready to configure SSO or SCIM-based provisioning, please contact [support](mailto:support@devcycle.com) to begin the setup process.
:::

## Overview

Enterprise teams often manage multiple business units or product teams, each operating independently. Historically, this has led to a workaround where teams create **multiple DevCycle organizations**, even within the same company, to prevent users from seeing or editing each other’s work.

Why? Because traditional **organization-level roles** apply to all projects in that organization—making it difficult to enforce proper security boundaries and responsibilities across disparate teams.

**Per Project Role-Based Access Control (RBAC)** solves this by allowing permission management at the **project level**, meaning:

- Teams only have access to the specific projects they work on
- Projects can have unique roles and scopes
- Centralized security can still be enforced via SSO/SCIM integration

## Why Use Per Project RBAC?

Without per-project RBAC, a user granted access to an organization could potentially **view and edit all projects**, even if they don’t belong to a specific team. This creates visibility and security concerns for enterprises with:

- Multiple lines of business
- Strict compliance requirements
- Distributed engineering teams

With Per Project RBAC, teams can:

- Assign **fine-grained access** to users at the project level
- Prevent cross-project visibility and unauthorized access
- Avoid creating unnecessary DevCycle organizations
- Align project access with **SSO groups and SCIM provisioning**

Using SCIM and SSO group-based permissions, teams can automate access control across large user bases, assigning roles dynamically based on the user’s identity provider (e.g., Azure AD, Okta).

This avoids the need to manage all access from a single privileged account and supports scalable, secure permission delegation.

## Role Matrix

The table below outlines which actions are allowed per role. These can be scoped per project or set at the organization level, depending on your setup.

> **Note**: All actions affecting **Production Environments** are restricted by default for `Member` roles.

|  | Viewer | Member | Publisher | Project Admin | Org Admin | Org Owner |
| --- | --- | --- | --- | --- | --- | --- |
| `audience:delete` |  |  |  | ✅ | ✅ |  |
| `audience:read` | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| `audience:write` |  | ✅ | ✅ | ✅ | ✅ |  |
| `environment:delete` |  |  |  | ✅ | ✅ |  |
| `environment:read` | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| `environment:write` |  | ✅ | ✅ | ✅ | ✅ |  |
| `feature:delete` |  |  |  | ✅ | ✅ |  |
| `feature:publish` |  |  | ✅ | ✅ | ✅ |  |
| `feature:read` | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| `feature:write` |  | ✅ | ✅ | ✅ | ✅ |  |
| `organization:delete:members` |  |  |  |  | ✅ | ✅ |
| `organization:read` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `organization:read:billing` |  |  |  | ✅ | ✅ | ✅ |
| `organization:read:members` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `organization:read:projects` |  |  |  |  | ✅ | ✅ |
| `organization:write` |  |  |  |  |  | ✅ |
| `organization:write:billing` |  |  |  |  |  | ✅ |
| `organization:write:members` |  |  |  |  | ✅ | ✅ |
| `organization:write:settings` |  |  |  |  | ✅ | ✅ |
| `organization:write:tokens` |  |  |  |  | ✅ |  |
| `project:delete` |  |  |  | ✅ | ✅ |  |
| `project:read` | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| `project:write` |  |  | ✅ | ✅ | ✅ |  |
| `project:write:overrides` |  |  |  | ✅ | ✅ |  |
| `project:write:overrides:self` |  | ✅ | ✅ | ✅ | ✅ |  |
| `project:write:settings` |  |  |  | ✅ | ✅ |  |
| `project:write:tokens` |  |  |  | ✅ | ✅ |  |
| `variable:delete` |  |  |  | ✅ | ✅ |  |
| `variable:read` | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| `variable:write` |  | ✅ | ✅ | ✅ | ✅ |  |

---

For organization-wide roles, visit [Organization Roles](/platform/account-management/organizations#organization-roles).
