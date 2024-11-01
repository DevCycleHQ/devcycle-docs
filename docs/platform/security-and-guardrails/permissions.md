---
title: Permissions
sidebar_position: 4
---

# Permissions

At DevCycle, our primary goal for permissions is to protect production. We've designed our permissions to be lightweight, straightforward and simple while ensuring production is protected.

Specifically, we offer Permissions Gating to protect Environments which are marked as "production" from unauthorized changes. This allows Organizations to manage which users can modify the Targeting Status, Rules and served Variations in a production Environment that may impact their end users.

Permissions can be enabled for Organizations on our Business or Enterprise plans. Please contact our [support](mailto:support@devcycle.com) team to get started.

:::info
Permissions enforcement will apply to all Projects and Production-type Environments within your Organization.
:::

## What Can Users Do?

To ensure usability, all users are able to make any edits to a Feature when production targeting isn't enabled. Permissions Gating and its protections come into play when production targeting is either enabled or a user is attempting to enable production.

See below for the full details on what each user role can do when permissions are enabled.

### Members

#### Can ✅

- Configure Development and Staging Environments
- Configure **Inactive** Production Environments

#### Cannot ❌

- Enable or Disable Production Environments Targeting
- Configure **Active** Production Environments
- When Production is **Active**, Configure Variables and Variations
- Manage Roles of all Users in the Organization

### Publishers

Everything **Members** can do, plus

#### Can ✅

- Enable or Disable Production Environments Targeting
- Configure **Active** Production Environments
- When Production is **Active**, Configure Variables and Variations

#### Cannot ❌

- Manage Roles of all Users in the Organization

### Owners

Everything **Publishers** can do, plus

#### Can ✅

- Manage Roles of all Users in the Organization

For more information, check out the [Organization Roles](/platform/account-management/organizations#organization-roles) documentation.
