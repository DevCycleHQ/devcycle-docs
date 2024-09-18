---
title: Self-Targeting
sidebar_position: 8
---

# CLI: Self Targeting

## DevCycle Identity

Once you have installed and authorized the [CLI](/cli), select your relevant organization and project.

### Get

To retrieve your current DevCycle Identity for a project, run the following command:

```bash
dvc identity get
```

### Manage

Run the following command setup or modify your DevCycle Identity.

```bash
dvc identity update
```

You will be prompted to set a User ID. If you already have a User ID set, you will need to confirm that you wish to override the existing User ID.

Note: Clearing the User ID will remove all Overrides. The CLI will prompt for a confirmation of clearing all Overrides associated with that User ID in the project.

---

## Self-Targeting Override

### Get

To retrieve all active Overrides for a project, run the following command:

```bash
dvc overrides list
```

To retrieve the Overrides for a specific feature and environment, run the following command::

```bash
dvc overrides get
```

You will be prompted to select a feature and environment if they are not passed as flags to the command.

### Manage

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