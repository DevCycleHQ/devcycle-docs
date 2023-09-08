---
title: Self-Targeting
sidebar_position: 2
---

Self-Targeting is a DevCycle QA & debugging feature that allows you to easily serve yourself different variations of a feature without having to modify targeting rules in each environment. To leverage this feature, you must set up your DevCycle Identity by associating an SDK User ID to your DevCycle user profile.

![Self-Targeting Slideout on Feature Page](/aug-2023-self-targeting-slideout-open-feature-form.png)

On each feature, you will see a Self-Targeting section within the Users & Targeting tab. This section will show you at-a-glance if you have any active Self-Targeting overrides for a feature, and how many other team-members within the current project have Self-Targeting overrides set as well.

Within the slide-out, you can setup your DevCycle Identity, select Self-Targeting overrides, and see the other team members that are currently Self-Targeting for that feature, including the variation and environment they have active overrides in.

## DevCycle Identity

### From the CLI

Once you have installed and authorized the [CLI](/cli), select your relevant organization and project.

#### Get

To retrieve your current DevCycle Identity for a project, run the following command:

```bash
dvc identity get
```

#### Manage

Run the following command setup or modify your DevCycle Identity.

```bash
dvc identity update
```

You will be prompted to set a User ID. If you already have a User ID set, you will need to confirm that you wish to override the existing User ID.

Note: Clearing the User ID will remove all Overrides. The CLI will prompt for a confirmation of clearing all Overrides associated with that User ID in the project.

### From the Dashboard

Setup your DevCycle Identity by entering the user ID you are providing to the DevCycle SDK, and which uniquely identifies you. Doing so unlocks debugging features such as Self-Targeting, a feature that allows you to override targeting rules to deliver different variations of the feature to yourself.

You can setup & update your DVC Identity within the Self-Targeting slide-out itself OR on your profile page within your project settings.

![DVC Identity Self-Targeting Slide-out](/august-2023-self-targeting-dvc-id.png)

## Self-Targeting Override

### From the CLI

#### Get

To retrieve your currently active Overrides for a project, run the following command:

```bash
dvc overrides get
```

You will be prompted to select a feature and environment for which to get Overrides. In the event you wish to get all Overrides for the project, you may pass the `--all` flag on the command.

#### Manage

Run the following command setup or modify your Overrides.

```bash
dvc overrides update
```

You will be prompted to select a feature, environment and variation to set as your Override value.

Run the following command to clear your Overrides.

```bash
dvc overrides clear
```

You will be prompted to select a feature and environment for which to clear Overrides. In the event you wish to clear all Overrides for the project, you may pass the `--all` flag on the command.

### From the Dashboard

Once you’ve setup your DevCycle Identity, you are able to use Self-Targeting! Navigate to the feature you’d like to target yourself in and open the Self-Targeting slide-out by clicking on the Manage Self-Targeting button.

Within the Environment & Variations section of the slide-out, you will see a list of all environments along with a dropdown with all variations that have been created for the feature. Select a variation for one or more environments, and click Apply Changes.

![Self-Targeting Slide-out Variation](/august-2023-self-targeting-slideout-var.png)

To view all of the Self-Targeting feature overrides you’re currently being served, navigate to the DevCycle Identity section on your profile settings page (Project Settings —> DevCycle Identity). From where, you’ll also be able to clear all existing Overrides for the specified project.

![DVC Identity Profile Page](/august-2023-DVC-id-profile-page-overrides.png)
