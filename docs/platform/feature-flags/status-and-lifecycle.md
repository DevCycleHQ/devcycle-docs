---
title: Status and Lifecycle
sidebar_position: 3
---

# Status and Lifecycle Management in DevCycle

In DevCycle, Features have **Statuses** which indicate their current position in the Development LifeCycle. The statuses are a succinct way to understand a Feature's state, and each status has its own unique properties.

## Statuses

Features in DevCycle can exist in one of three Statuses to indicate their current LifeCycle stage:

- **In Progress**
- **Completed**
- **Coming Soon: Archived**

Each status comes with its unique properties, affecting how a Feature behaves, can be interacted with, or is displayed in the dashboard.

Status changes are not automatic and are maintained by the User.

The following is a description of each status:

### In Progress

When a Feature is created, it starts in this status. While a Feature is "In Progress," you can modify everything, have as many Variations as you'd like, and have complex targeting rules.

### Completed

One could consider a Feature "Complete" once it has been tested, approved, and is ready for release or has been fully released. When the User changes the status to "Complete", the Feature enters a semi-readonly state the Feature enters a semi-readonly state, limiting some editability such as restricting the addition of new Targeting Rules and Variations. Additionally, all Users will be served a single Variation. 

### Archived

The "Archived" status is designed to be the terminal state for Features that have reached the end of their lifecycle, were never implemented in code, or have become entirely obsolete. 

A Feature should be archived after it has been cleaned up and its Variables removed from the codebase. Ideally, users should have also marked the Feature as **[Completed](/platform/feature-flags/status-and-lifecycle#completed)**  in DevCycle.

Archiving Features helps clean up your dashboard and codebase by essentially putting the Feature into a read-only mode and hiding it from the standard dashboard views. Archived Features' Audit Logs are accessible and available for teams to review.

Feature deletion still exists; however, it is recommended that Delete only be used for mistakes. Deletion permanently removes the Feature and its Audit Log from DevCycle. Keeping archived Features will allow a team to retain valuable information about its history and hopefully in the future, will allow DevCycle to make reports on the Feature lifecycle using that information.


## LifeCycle and Changing Status

### Completing a Feature

When a Feature is marked as "Completed," the following changes are implemented:

- Status changes to "Complete."
- A "Release Variation" must be chosen which will be served to all Users for every Environment.
- Targeting rules for all Environments will be replaced with an "All users" rule serving the selected "Release Variation"
- Previously set Environment statuses are preserved.
- Additional targeting rules cannot be added when a Feature is "Complete" and must be reverted to In Progress to do so.
- The Variables section will display only one single Variation; you may not add more Variations.
- Variable values can still be modified, and Environments can be toggled on and off.
- When using the CLI code generator to [generate typescript types](https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-typescript#cli), any Variables that are a part of a completed Feature will be marked as deprecated.

### Cleanup Checklist for Variables

Upon completing a Feature, you will see cleanup checklists for each Variable. You can choose to keep or cleanup a Variable.

- **Keep**: Marks the Variable as permanent, which will make sure DevCycle does not guide you toward archiving or removing the Variable from your code, and the Variable will always serve the chosen value. 

- **Mark for Cleanup**: Provides a checklist to help you know when it's safe to remove the Variable from the Feature or archive the Variable. If the Variable is still seen in code, or if evaluations are still seen in production, removing this Variable from the Feature could result in the Variable serving default values to Users. If Code References are enabled, this will also help inform where to remove this Variable from your code. 

#### Reverting to In Progress

The "Completed" status is reversible by clicking "Revert to In Progress."

- Previous Feature variations will be available again, but any new changes to Variables made while in the "Complete" status remain.
- Past targeting rules will not be restored.
