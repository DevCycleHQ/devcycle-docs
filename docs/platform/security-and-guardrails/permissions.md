---
title: Roles & Permissions
sidebar_position: 5
---

# Roles & Permissions

At DevCycle, our permission model is designed to protect production while supporting secure and scalable team collaboration. We offer flexible, role-based access controls that can be applied both at the organization and project level—allowing you to tailor access based on how your teams operate.

Permissions can be enabled for Organizations on our **Business** or **Enterprise** plans. Please contact our [support](mailto:support@devcycle.com) team to get started.

:::info
Permissions enforcement will apply to all Projects and Production-type Environments within your Organization.
:::

## Permission Levels Overview

DevCycle supports multiple levels of permission enforcement:

- **Flat Access(default)**: All users have full access across all projects
- **Basic Permissions**: Org-wide roles that protect production environments
- **Full Role-Based Access Control (RBAC)**: Fine-grained permissions managed at the project level (Enterprise only)

---

## Organization-Wide Roles (Basic Permissions)

Basic permissions apply at the **organization level** and are available to all Business and Enterprise customers. These roles are:

### Members

#### Can ✅
- Configure Development and Staging Environments
- Configure **Inactive** Production Environments

#### Cannot ❌
- Enable or Disable Production Environments Targeting
- Configure **Active** Production Environments
- When Production is **Active**, Configure Variables and Variations
- Manage roles of other users

### Publishers

Everything Members can do, plus:

#### Can ✅
- Enable or Disable Production Environments Targeting
- Configure **Active** Production Environments
- When Production is **Active**, Configure Variables and Variations

#### Cannot ❌
- Manage roles of other users

### Owners

Everything Publishers can do, plus:

#### Can ✅
- Manage roles of all users in the organization


---

## Project-Level Roles (Full RBAC – Enterprise Only)

For organizations managing multiple teams or business units, DevCycle offers **project-level RBAC** on Enterprise plans. This allows you to manage roles **per project**, granting access only to the specific workspaces your team members need.

With project-level roles, you can:

- Scope access to individual projects
- Prevent cross-project visibility and restrict access to only the projects a user is assigned
- Align access with your SSO groups and SCIM-based provisioning

This enables centralized identity and access management with decentralized control, especially when integrated with providers like Azure AD or Okta.

:::info
To configure SSO and SCIM-based provisioning, please contact [support](mailto:support@devcycle.com).
:::

---

## Role Matrix

The table below outlines actions available to each role across organization and project levels.

> **Note**: All actions affecting **Production Environments** are restricted by default for `Member` roles.

| Action                        | Viewer   | Member                 | Publisher   | Project Admin   | Org Admin   | Org Owner   |
|:------------------------------|:---------|:-----------------------|:------------|:----------------|:------------|:------------|
| `organization:read:settings`  | ✅       | ✅                     | ✅          | ✅              | ✅          | ✅          |
| `organization:write:settings` |          |                        |             |                 | ✅          | ✅          |
| `organization:read:members`   | ✅       | ✅                     | ✅          | ✅              | ✅          | ✅          |
| `organization:write:members`  |          |                        |             |                 | ✅          | ✅          |
| `organization:read:billing`   | ✅       | ✅                     | ✅          | ✅              | ✅          | ✅          |
| `organization:write:billing`  |          |                        |             |                 |             | ✅          |
| `organization:read:projects`  |          |                        | ✅          |                 | ✅          | ✅          |
| `project:read`                | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `project:write`               |          |                        |             |                 | ✅          |             |
| `project:write:settings`      |          |                        |             | ✅              | ✅          |             |
| `project:delete`              |          |                        |             |                 | ✅          |             |
| `feature:read:staleness`      | ✅       |                        |             | ✅              | ✅          |             |
| `feature:read`                | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `feature:write`               |          | ✅                     | ✅          | ✅              | ✅          |             |
| `feature:publish`             |          |                        | ✅          | ✅              | ✅          |             |
| `feature:delete`              |          |                        |             | ✅              | ✅          |             |
| `feature:status:archive`      |          | ✅                     | ✅          | ✅              | ✅          |             |
| `feature:status:complete`     |          |                        | ✅          | ✅              | ✅          |             |
| `feature:read:config`         | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `feature:write:config`        |          | ✅ | ✅          | ✅              | ✅          |             |
| `audience:write`              |          | ✅                     | ✅          | ✅              | ✅          |             |
| `audience:read`               | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `audience:write:prod`         |          |                        | ✅          | ✅              | ✅          |             |
| `audience:delete`             |          |                        |             | ✅              | ✅          |             |
| `variable:read`               | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `variable:write`              |          | ✅                     | ✅          | ✅              | ✅          |             |
| `variable:write:prod`         |          |                        | ✅          |                 | ✅          |             |
| `environment:read`            | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `environment:write`           |          |  ✅  | ✅          | ✅              | ✅          |             |
| `environment:delete`          |          |                        |             | ✅              | ✅          |             |
| `variation:read`              | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `variation:write`             |          | ✅                     | ✅          | ✅              | ✅          |             |
| `variation:delete`            |          | ✅                     | ✅          | ✅              | ✅          |             |
| `results:read`                | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `user:read`                   | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `user:write`                  | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `auditlog:read`               | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `customproperty:read`         | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `customproperty:write`        |          | ✅                     | ✅          | ✅              | ✅          |             |
| `customproperty:delete`       |          | ✅                     | ✅          | ✅              | ✅          |             |
| `metric:read`                 | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `metric:write`                |          | ✅                     | ✅          | ✅              | ✅          |             |
| `metric:delete`               |          | ✅                     | ✅          | ✅              | ✅          |             |
| `metricassociation:read`      | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `metricassociation:write`     |          | ✅                     | ✅          | ✅              | ✅          |             |
| `metricassociation:delete`    |          | ✅                     | ✅          | ✅              | ✅          |             |
| `project:read:overrides`      | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `project:write:overrides`     | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `webhook:read`                | ✅       | ✅                     | ✅          | ✅              | ✅          |             |
| `webhook:write`               |          | ✅                     | ✅          | ✅              | ✅          |             |
| `webhook:delete`              |          |                        | ✅          | ✅              | ✅          |             |
| `project:read:tokens`         | ✅       |                        |             |                 | ✅          |             |
| `project:write:tokens`        |          |                        |             |                 | ✅          |             |

---

## Managing Role Mappings with SCIM and SSO

For Enterprise customers using identity providers (IdPs) like Azure AD or Okta, DevCycle supports automated role mapping through **SCIM and SSO group-based permissions**.

- Roles can be mapped to IdP groups
- Users are automatically assigned the correct roles upon login
- Centralized IT control, local team autonomy

This streamlines onboarding/offboarding and ensures the principle of least privilege is maintained.

To get started, contact [support](mailto:support@devcycle.com).