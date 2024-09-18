---
title: Self-Targeting
sidebar_position: 2
---

Self-Targeting is a DevCycle QA & debugging feature that allows you to easily serve yourself different variations of a feature without having to modify targeting rules in each environment. To leverage this feature, you must set up your DevCycle Identity by associating an SDK User ID to your DevCycle user profile.

![Self-Targeting Slideout on Feature Page](/aug-2023-self-targeting-slideout-open-feature-form.png)

On each feature, you will see a Self-Targeting section within the Users & Targeting tab. This section will show you at-a-glance if you have any active Self-Targeting overrides for a feature, and how many other team-members within the current project have Self-Targeting overrides set as well.

Within the slide-out, you can setup your DevCycle Identity, select Self-Targeting overrides, and see the other team members that are currently Self-Targeting for that feature, including the variation and environment they have active overrides in.

:::caution
Self-Targeting is currently unavailable on the Next.js SDK.
:::

## DevCycle Identity

Setup your DevCycle Identity by entering the user ID you are providing to the DevCycle SDK, and which uniquely identifies you. Doing so unlocks debugging features such as Self-Targeting, a feature that allows you to override targeting rules to deliver different variations of the feature to yourself.

You can setup & update your DVC Identity within the Self-Targeting slide-out itself OR on your profile page within your project settings.

![DVC Identity Self-Targeting Slide-out](/august-2023-self-targeting-dvc-id.png)

## Self-Targeting Override

Once you’ve setup your DevCycle Identity, you are able to use Self-Targeting! Navigate to the feature you’d like to target yourself in and open the Self-Targeting slide-out by clicking on the Manage Self-Targeting button.

Within the Environment & Variations section of the slide-out, you will see a list of all environments along with a dropdown with all variations that have been created for the feature. Select a variation for one or more environments, and click Apply Changes.

![Self-Targeting Slide-out Variation](/august-2023-self-targeting-slideout-var.png)

To view all of the Self-Targeting feature overrides you’re currently being served, navigate to the DevCycle Identity section on your profile settings page (Project Settings —> DevCycle Identity). From where, you’ll also be able to clear all existing Overrides for the specified project.

![DVC Identity Profile Page](/august-2023-DVC-id-profile-page-overrides.png)
