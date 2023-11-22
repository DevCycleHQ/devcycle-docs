---
title: Audit Log
sidebar_position: 1
---

## Overview

The Audit Log tracks all modifications made to a Feature. DevCycle captures the DevCycle user who made the change, a time stamp, and what was modified on each Feature save. 

The Audit Log is located at the bottom of the Feature form in the Data & Results section. 

![Audit Log on Feature Page](/nov2023-audit-log-sidebar.png)

You can filter modfications by environment, DevCycle user, and for a particular date range. 

![Audit Log](/nov2023-audit-log-summary.png)

The title of each modification card, highlights the change that was made to the Feature upon clicking save. If multiple changes were made on a Feature save and/or there were modifications made to more than one Environment, the card will show the total number modifications made. 

Click the `View Details` button on each card for more information about each modification. 

Modifications are organized by Environment with each card. The color of each Environment tag corresponds to the [color selected for that Environment](/essentials/environments#from-the-dashboard-1). 

Items that are added to the Feature will be highlighted in green in the left-hand column of the modification card (see below), and removals or deletions of items will be highlighted in red. 

![Audit Log Addition](/nov2023-audit-log-net-new-add.png)

For modifications to values, each card will show the orignal value on the left-hand column of the card and the updated value of on the right. If a value was added or modified, the change will be highlighted in green. If a value was deleted or removed, the change will be highlighted in red. 

:::info

Please note that [Self-Targeting](/extras/advanced-targeting/self-targeting) actions are not recorded in the Audit Log.

:::

### Feature Created Modification Cards in the Audit Log

When a Feature is created, you will see multiple modification cards populate in the Audit Log. The first `Feature Created` modification card in the Audit Log will outline the initial Feature configuration (name, variations, settings, initial variable added, etc.). Then, depending on the [Feature Type](/introduction/core-concepts/feature-types) selected when creating a new Feature, the following cards will highlight the each Environment's Targeting status, along with the templated Targeting Rules (if they exist). See an example below of an Experiment Feature Type. 

![Audit Log Experiment Feature Type](/nov2023-audit-log-experiment-feature-type.png)

### Audit Log Feature Requests


:::tip Do you want to see Project-Level or Point-in-Time Audit Logs? 
Our team is always looking to better understand the needs and use cases of our customers including the criticality of certain feature requests. If there is a partifucular functionality your team needs for audit logging (or anything!) please send us an email at <mailto:product-feedback@devcycle.com>. 
:::