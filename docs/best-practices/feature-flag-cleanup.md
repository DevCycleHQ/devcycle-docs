---
title: Cleaning Up Unused Flags
sidebar_label: Flag Cleanup
sidebar_position: 6
---

## Overview

This article outlines practices to help minimize technical debt from feature flags. DevCycle’s code insights are a valuable tool in determining when to clean up your unused feature flags.

## What is technical debt?

Technical debt describes the future actions required to correct the repercussions of previous short-term decisions. In other words, tech debt is what we get for sloppy code-keeping. Short-term decisions are often shortcuts in software development to hasten the delivery of a feature or project. Unfortunately, it also comes with the expense of extra rework later.

One source of technical debt is poor maintenance of your feature flags.

## Risks of technical debt

Allowing tech debt to accumulate makes it significantly more difficult to maintain a system and its code. Scrolling through hundreds of unused flags or variables in your dashboard is inconvenient and cumbersome. This affects the efficiency of your dev team. 

One risk of tech debt is the increase in code complexity, making the system harder to maintain and test. For instance, if a release flag has been completely rolled out and serves “Variation On” for all users, the code for “Variation Off” will never get called. If you keep a dead code path for a long time, chances are that developers will forget why it existed. Developers might avoid removing it later for fear of breaking the system. Failing to remove feature flags and their variables at the appropriate time causes cluttered code.

Another risk of technical debt with feature flags is an unintended fallback to an undesirable value. For example, if you’d like to redesign your user interface (UI), it would be typical to create a flag and have the current UI as its default while you’re still working on the new UI. Once you have completed the new UI and rolled it out to all users, the flag no longer serves its purpose. Keeping the flag increases the chances of falling back to the old UI if the flag is accidentally turned off or if a system fails to integrate the SDK.

## When to remove a flag

Practicing healthy feature flag hygiene is a good way to mitigate technical debt. It is wise to consider removing a feature flag after the full release of a feature. Once you are satisfied with your feature and are ready for it to remain permanent, it may be safe to remove your flag and [its references from your code](#code-references).

You should also remove a flag or its variables if they are inactive or not in use. Perhaps the feature was never shipped, or it was shipped with a different flag or variable. Either way, removing it will clear the clutter in your dashboard and your code.

## Using Code Insights for feature flag cleanup

Our platform provides tools to facilitate feature flag cleanup. Feature Flag Reach and Code References on DevCycle can help you decide when to remove feature flags.
### Code Insights Demo Video
`youtube: https://youtu.be/0yhmQ-3OZX8`


### Feature Flag Reach

DevCycle’s Feature Flag Reach is a helpful tool for determining when a release flag is ready for removal. The Feature Flag Reach section generates a graph of how many times each variable has been accessed in each variation of the flag over time.

![Feature Flag Reach Example](/oct-2022-reach.png)

Each variation is displayed as a line with a distinct color. If only one colored line is active over some time, it may be an indication that other code paths are never used. For example, if all users are receiving “Variation On,” the line for “Variation Off” will remain at zero. If this is so, it may be time to consider if that particular feature can become permanent for all users.

There are two ways to find the Feature Flag Reach section. The first way is via your Feature Management page. On the very right of each feature is an “Insights” button which will navigate you to the feature’s reach section. 

The second way is from a feature’s dashboard. On the navigation to the left, click “Reach” under ”Data & Results”.

![Reach button from a feature's dashboard](/june-2022-reach-feature-dashboard.png)

### Code References

Another way to ensure if a flag is truly ready for removal is by leveraging Code References. DevCycle’s Code References let you know where you are using a variable in your code. Our platform uses GitHub actions to automatically scan and collect all the places in your source code that reference particular DevCycle variables. That way, you know whether or not a variable is being used in your code. If it is not, you may consider deleting that variable. 

Because Code References list all usages of a variable in your code, you can easily determine where to need to go once you’re ready to delete a feature flag and its variables. Code References include a link to the exact location in your GitHub codebase, making it much easier to find your variables or retire your flags.

![code references example](/march-2022-code-refs.png)

To use Code References, you must enable [the DevCycle action for Code References](/tools-and-integrations/Github/gh-feature-usage-action) within your repository. After configuration, you can find your Code References when you click “View Info” for a variable in the Variables dashboard.

For more information about Code References, [check out our docs here](/home/feature-management/organizing-your-flags-and-variables/variable-dashboard#code-references).

## Other ways to reduce feature flag tech debt

**Have human-understandable names.** Naming conventions help other developers know the purpose of each feature flag or variable. This makes it easier to determine what flags are still in use. Obscure names such as “flag123_dont_delete” make it difficult to determine its importance and use. It would be incredibly burdensome to have to examine the code to understand its original purpose.

**Utilize the description section**. Some helpful information you might include in a feature’s description is its purpose and its variables' roles. Since you are unable to change variable keys (which is how they are identified), the description is a useful place to store more variable context when necessary.

**Schedule flag reviews.** Scheduling monthly or quarterly flag reviews helps your team identify which flags should be retired. These reviews can even coincide with sprints that tackle other technical debt. One way to implement flag cleanups is to divide a set of feature flags amongst the team and have the team review them. They may make pull requests for flags that must be removed from the code.

## Summary

DevCycle’s Feature Flag Reach and Code References are useful tools for taming your flags throughout your projects. They help you determine whether flags are being used, where your variables are being referenced, and whether or not it is safe to remove a flag from your code. Clean up your feature flags regularly to improve the quality of your code and the efficiency of your team.