---
title: Random Variations
sidebar_position: 1
---

## Serving a Random Variation

If there is a desire to serve a Random variation (Experimentation / Random Distribution) to a set of users, this can be done by serving a "Random Distribution" to a target, instead of a single variation. This functionality can be used to send users down various paths or provide different functionality of a single feature, either as an A/B test or multivariate testing.  

To do this, click the serve dropdown on a Targeting Rule and select "Random Distribution"

After selecting the random Distribution option, a list of all current Variations will show with an evenly spread distribution across each. 

All %s must add up to 100%, and some small rounding will occur. 

To modify the distribution, simply modify the numbers and hit Enter or the Save button at the top of the page.

If percentages do not add up to 100%, the Targeting rule Cannot be saved. 

Users who reach this Targeting Rule and qualify for the Target definition will then be distributed at random among the variations at the specified amounts. 

### Adding Or Removing Variations when a random distribution has been set:

If a Variation is **added** to a Feature that has an **enabled** Targeting Rule containing a Random Distribution, it will be added to the random distributions with an initial 0% set. 

If a Variation is **added** From a Feature that has a **disabled** Targeting Rule containing a Random Distribution, the new Variation will be added and all Variations will be redistributed to have an equal percentage.

If a Variation is **removed** from a Feature that has an **enabled** Targeting Rule containing a Random Distribution, the percentage allotted to that variation will be evenly distributed among the existing Variations.

If a Variation is **removed** From a Feature that has a **disabled** Targeting Rule containing a Random Distribution, the distribution percentages will be reset to be evenly split across all variations.
