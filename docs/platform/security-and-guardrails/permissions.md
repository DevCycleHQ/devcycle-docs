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

- **Equal Permissions (default)**: All users have full access across all projects
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

For more information, check out the [Organization Roles](/platform/account-management/organizations#organization-roles) documentation.

---

## Project-Level Roles (Full RBAC – Enterprise Only)

For organizations managing multiple teams or business units, DevCycle offers **project-level RBAC** on Enterprise plans. This allows you to manage roles **per project**, granting access only to the specific workspaces your team members need.

With project-level roles, you can:

- Scope access to individual projects
- Prevent cross-project visibility
- Align access with your SSO groups and SCIM-based provisioning
- Enforce security boundaries without creating separate DevCycle organizations

This enables centralized identity and access management with decentralized control, especially when integrated with providers like Azure AD or Okta.

:::info
To configure SSO and SCIM-based provisioning, please contact [support](mailto:support@devcycle.com).
:::

---

## Role Matrix

The table below outlines actions available to each role across organization and project levels.

> **Note**: All actions affecting **Production Environments** are restricted by default for `Member` roles.

|                                | Viewer | Member | Publisher | Project Admin | Org Admin | Org Owner |
| ------------------------------ | ------ | ------ | --------- | ------------- | --------- | --------- |
| `audience:delete`              |        |        |           | ✅             | ✅         |           |
| `audience:read`                | ✅      | ✅      | ✅         | ✅             | ✅         |           |
| `audience:write`               |        | ✅      | ✅         | ✅             | ✅         |           |
| `environment:delete`           |        |        |           | ✅             | ✅         |           |
| `environment:read`             | ✅      | ✅      | ✅         | ✅             | ✅         |           |
| `environment:write`            |        | ✅      | ✅         | ✅             | ✅         |           |
| `feature:delete`               |        |        |           | ✅             | ✅         |           |
| `feature:publish`              |        |        | ✅         | ✅             | ✅         |           |
| `feature:read`                 | ✅      | ✅      | ✅         | ✅             | ✅         |           |
| `feature:write`                |        | ✅      | ✅         | ✅             | ✅         |           |
| `organization:delete:members`  |        |        |           |               | ✅         | ✅         |
| `organization:read`            | ✅      | ✅      | ✅         | ✅             | ✅         | ✅         |
| `organization:read:billing`    |        |        |           | ✅             | ✅         | ✅         |
| `organization:read:members`    | ✅      | ✅      | ✅         | ✅             | ✅         | ✅         |
| `organization:read:projects`   |        |        |           |               | ✅         | ✅         |
| `organization:write`           |        |        |           |               |           | ✅         |
| `organization:write:billing`   |        |        |           |               |           | ✅         |
| `organization:write:members`   |        |        |           |               | ✅         | ✅         |
| `organization:write:settings`  |        |        |           |               | ✅         | ✅         |
| `organization:write:tokens`    |        |        |           |               | ✅         |           |
| `project:delete`               |        |        |           | ✅             | ✅         |           |
| `project:read`                 | ✅      | ✅      | ✅         | ✅             | ✅         |           |
| `project:write`                |        |        | ✅         | ✅             | ✅         |           |
| `project:write:overrides`      |        |        |           | ✅             | ✅         |           |
| `project:write:overrides:self` |        | ✅      | ✅         | ✅             | ✅         |           |
| `project:write:settings`       |        |        |           | ✅             | ✅         |           |
| `project:write:tokens`         |        |        |           | ✅             | ✅         |           |
| `variable:delete`              |        |        |           | ✅             | ✅         |           |
| `variable:read`                | ✅      | ✅      | ✅         | ✅             | ✅         |           |
| `variable:write`               |        | ✅      | ✅         | ✅             | ✅         |           |

---

## Managing Role Mappings with SCIM and SSO

For Enterprise customers using identity providers (IdPs) like Azure AD or Okta, DevCycle supports automated role mapping through **SCIM and SSO group-based permissions**.

- Roles can be mapped to IdP groups
- Users are automatically assigned the correct roles upon login
- Centralized IT control, local team autonomy

This streamlines onboarding/offboarding and ensures the principle of least privilege is maintained.

To get started, contact [support](mailto:support@devcycle.com).