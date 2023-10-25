---
title: Status and Lifecycle
sidebar_position: 9
---

# Status and Lifecycle Management in DevCycle

In DevCycle, Features have **Statuses** which indicate their current position in the Development LifeCycle. The statuses are a succinct way to understand a Feature's state, and each status has its own unique properties.

## Statuses

Features in DevCycle can exist in one of three Statuses to indicate their current LifeCycle stage:

- **In Progress**
- **Completed**
- **Coming Soon: Archived**

Each status comes with its unique properties, affecting how a Feature behaves, can be interacted with, or is displayed in the dashboard.

Status changes are not automatic and are maintained by the user.

**Detailed Status Breakdown**

### In Progress

When a Feature is created, it starts in this status. While a Feature is "In Progress," you can modify everything, have as many variations as possible, and have complex targeting rules.

### Completed

One could consider a Feature "Completed" once it has been tested, approved, and is ready for release or has been fully released. When the user changes to the Complete status the Feature enters a semi-readonly state, limiting some editability. All users will be served a single variation. 

### Archived

The "Archived" status is designed to clean up the dashboard and the codebase by essentially putting the Feature into a read-only mode and hiding it from the standard dashboard views. It can still be reverted from the Archived status to In Progress, allowing for future use.

## LifeCycle and Changing Status

### Completing a Feature

When a Feature is marked as "Completed," the following changes are implemented:

- Status changes to "Complete."
- A 'Release Variation' must be chosen which will be served to all users.
- Past environment statuses are preserved.
- Variables section will display only one single variation.
- Variable values can still be modified, and environments can be toggled on and off.

### Cleanup Steps/Checklists for Variables

Upon completing a Feature, you will see cleanup steps/checklists for each Variable. You can choose to "Keep" or "Cleanup" a Variable.

- **Keep**: Marks the Variable as permanent, which implies that DevCycle will manage the value of this Variable until otherwise specified.
  
- **Mark for Cleanup**: Provides a checklist to help you know when it's safe to remove the Variable from the Feature.

#### Reverting to In Progress

The "Completed" status is reversible by clicking "Revert to In Progress."

- Previous variations return, but any new changes made during the "Completed" state remain.
- Past targeting rules will not be restored.