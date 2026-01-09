---
title: Feature Flag Reach
sidebar_position: 4
---

When a Feature is running, DevCycle automatically provides a quick way to view how the feature is running across all SDKs or APIs it is being used in by breaking down by variable. This document serves to explain this section in more depth.

### Accessing Feature Reach

There are two ways to find the Feature Flag Reach section. 
1. On the [Feature Overview Tab in the Reach section](/platform/feature-flags/features#reach) on the Feature Form.
2. On the [Data & Results Tab ](/platform/feature-flags/features#data--results-tab). 

### Feature Reach Details

 The Feature Reach section generates a graph of how many times each Variable has been accessed in each Variation of the Feature over time.

 An evaluation is only counted when an SDK or API actively accesses a specific variable. For more information on evaluating variables, see [the SDK Documentation on evaluations](/sdk/features.md)
 
![Feature Flag Reach Example](/may-2025-feature-data-results-tab.png)

By default, the chart will show the aggregated count of evaluations of ALL variables across ALL environments and ALL SDKS.

The filters can be used to only show details on specific variables, specific variations, specific SDK types, and specific date ranges.

