---
title: Feature Flag Reach
sidebar_position: 5
---

When a Feature is running, DevCycle automatically provides a quick way to view how the feature is running across all SDKs or APIs it is being used in by breaking down by variable. This document serves to explain this section in more depth.

### Accessing Feature Reach

There are two ways to find the Feature Flag Reach section. The first way is via your Feature Management page. On the very right of each feature is an “Insights” button which will navigate you to the feature’s reach section. 

The second way is from a Feature’s dashboard. On the navigation to the left, click “Reach” under ”Data & Results”.

![Reach button from a feature's dashboard](/june-2022-reach-feature-dashboard.png)

### Feature Reach Details

 The Feature Reach section generates a graph of how many times each Variable has been accessed in each Variation of the Feature over time.

 An evaluation is only counted when an SDK or API actively accesses a specific variable. For more information on evaluating variables, see [the SDK Documentation on evaluations](/sdk/features.md)
 
![Feature Flag Reach Example](/oct-2022-reach.png)

By default, the chart will show the aggregated count of evaluations of ALL variables across ALL environments and ALL SDKS.

The filters can be used to only show details on specific variables, specific variations, specific SDK types, and specific date ranges.

