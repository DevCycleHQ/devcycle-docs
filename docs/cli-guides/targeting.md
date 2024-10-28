---
title: Targeting Rules
sidebar_position: 7
---

# CLI: Targeting Rules

## Manage

Once you have installed and authorized the CLI, select your relevant organization then run the following command:

```bash
dvc targeting get
```
You will be prompted to select a feature and environment. 

If successful you will receive a response which resembles the following (which selected a feature named `feature-a` and the `Development` environment):

```bash
└─ Development
   └─ status
      └─ enabled
```

To enable a targeting rule for a Feature, you will follow a similar process to above but using the command 

```bash
dvc targeting enable 
```

If successful you will receive a response which resembles the following (for enabling the targeting rules for the `Staging` environment of a feature):

```bash
└─ Staging
   ├─ status
   │  └─ enabled
   └─ rules
      └─ 1. All Users
         ├─ definition
         │  └─ All Users
         └─ serve
            └─ Variation On
```


To disable a targeting rule for a Feature, you will follow a similar process to above but using the command 

```bash
dvc targeting disable 
```

If successful you will receive a response which resembles the following (for disabling the targeting rules for the `Staging` environment of a feature):

```bash
└─ Staging
   ├─ status
   │  └─ disabled
   └─ rules
      └─ 1. All Users
         ├─ definition
         │  └─ All Users
         └─ serve
            └─ Variation On
```

---

## Create

Once you have installed and authorized the CLI, select your relevant organization then run the following command:

```bash
dvc targeting update
```
You will be prompted to select a feature, environment and what you would like to update (status or targets). For this case you should select only `targets`. 

You should then select `Add Targeting Rule` and will be prompted to define a Name, Variations to serve and a filter. For this case, if you have not yet created any filters, you should select `Add Filter`.

Here you will be prompted to select a definition of all (for all users), user (to target a specific user based on an identifier like email, country, etc.) or audienceMatch [(see Audiences)](/essentials/targeting/audiences).

:::info
Looking to reuse an audience in user targeting for features? Be sure to check out the our documentation explaining how to [create and manage Audiences via our API or within the DevCycle dashboard](/essentials/targeting/audiences).
:::

Once you have chosen your relevant definition select `Continue` (twice) when prompted. If successful you should see a flow which resembles the following (which represents added a new targeting rule to `feature-a` in the `Staging Environment` for any users with the email address that contains `devcycle` and will serve them a variation named `New Variation` ):

```bash
? Which feature? feature-a
? Which environment? Staging (staging)
? Which fields are you updating targets


🤖 Manage your Targeting
🤖 Current Targeting Rules:
└─ 1. All Users
   ├─ definition
   │  └─ All Users
   └─ serve
      └─ Variation On


? Select an action: Add Targeting Rule
? Name: New Targeting Rule
? Variation to serve New Variation (new-variation)
🤖 No existing Filters.
? Select an action: Add Filter
? Type for definition user
? Subtype for definition email
? Comparator for definition contain
? List of comma separated values for definition: devcycle


🤖 Manage your filters
🤖 Current Filters:
└─ Email
   └─ contains
      └─ devcycle


----------------------------------------
? Select an action: Continue


🤖 Manage your filters
🤖 Current Filters:
└─ Email
   └─ contains
      └─ devcycle


----------------------------------------


🤖 Manage your Targeting
🤖 Current Targeting Rules:
├─ 1. All Users
│  ├─ definition
│  │  └─ All Users
│  └─ serve
│     └─ Variation On
└─ 2. New Targeting Rule
   ├─ definition
   │  └─ Email
   │     └─ contains
   │        └─ devcycle
   └─ serve
      └─ new-variation


----------------------------------------
? Select an action: Continue


🤖 Manage your Targeting
🤖 Current Targeting Rules:
├─ 1. All Users
│  ├─ definition
│  │  └─ All Users
│  └─ serve
│     └─ Variation On
└─ 2. New Targeting Rule
   ├─ definition
   │  └─ Email
   │     └─ contains
   │        └─ devcycle
   └─ serve
      └─ new-variation


----------------------------------------
└─ Staging
   ├─ status
   │  └─ enabled
   └─ rules
      ├─ 1. All Users
      │  ├─ definition
      │  │  └─ All Users
      │  └─ serve
      │     └─ Variation On
      └─ 2. New Targeting Rule
         ├─ definition
         │  └─ Email
         │     └─ contains
         │        └─ devcycle
         └─ serve
            └─ New Variation
```

To enable a targeting rule for a Feature, you will follow a similar process to above but using the command 

```bash
dvc targeting enable 
```

If successful you will receive a response which resembles the following (for enabling the targeting rules for the `Staging` environment of a feature):

```bash
└─ Staging
   ├─ status
   │  └─ enabled
   └─ rules
      └─ 1. All Users
         ├─ definition
         │  └─ All Users
         └─ serve
            └─ Variation On
```

---

## Update

Once you have installed and authorized the CLI, select your relevant organization then run the following command:

```bash
dvc targeting update
```

You will be prompted to select a feature, environment and you should ensure that `targets` are selected when asked which fields you are updating.

From here select `Edit Targeting Rule`, chose the relevant targeting rule you would like to update.

You will then be prompted to change the Name and Variation to Serve (click enter if you would like to keep these the same).

Next you will be prompted to Add, Edit or Remove Filters (known as Definitions on the dashboard). Click continue of you would not like to change these or select the appropriate option for your situation.

If successful you will receive a response which resembles the following (which represents updating a targeting rule named `New Targeting Rule` on the `Staging Environment` for `feature-a` to show `Variation Off` to impact any users with the email address that **does not** contain `devcycle`.):

```bash
? Which feature? feature-a
? Which environment? Staging (staging)
? Which fields are you updating targets

🤖 Manage your Targeting
🤖 Current Targeting Rules:
├─ 1. All Users
│  ├─ definition
│  │  └─ All Users
│  └─ serve
│     └─ Variation On
└─ 2. New Targeting Rule
   ├─ definition
   │  └─ Email
   │     └─ contains
   │        └─ devcycle
   └─ serve
      └─ New Variation

? Select an action: Edit Targeting Rule
? Which Targeting Rule would you like to edit? New Targeting Rule
? Name: New Targeting Rule
? Variation to serve Variation Off (variation-off)

🤖 Manage your filters
🤖 Current Filters:
└─ Email
   └─ contains
      └─ devcycle

? Select an action: Edit Filter
? Which Filter would you like to edit? {"type":"user","subType":"email","comparator":"contain","values":["devcycle"]}
? Which fields are you updating 

🤖 Manage your filters
🤖 Current Filters:
└─ Email
   └─ contains
      └─ devcycle

----------------------------------------
? Select an action: Continue

🤖 Manage your filters
🤖 Current Filters:
└─ Email
   └─ does not contain
      └─ devcycle

----------------------------------------

🤖 Manage your Targeting
🤖 Current Targeting Rules:
├─ 1. All Users
│  ├─ definition
│  │  └─ All Users
│  └─ serve
│     └─ Variation On
└─ 2. New Targeting Rule
   ├─ definition
   │  └─ Email
   │     └─ does not contain
   │        └─ devcycle
   └─ serve
      └─ variation-off

---------------------------------------
? Select an action: Continue

🤖 Manage your Targeting
🤖 Current Targeting Rules:
├─ 1. All Users
│  ├─ definition
│  │  └─ All Users
│  └─ serve
│     └─ Variation On
└─ 2. New Targeting Rule
   ├─ definition
   │  └─ Email
   │     └─ does not contain
   │        └─ devcycle
   └─ serve
      └─ variation-off

----------------------------------------
└─ Staging
   ├─ status
   │  └─ enabled
   └─ rules
      ├─ 1. All Users
      │  ├─ definition
      │  │  └─ All Users
      │  └─ serve
      │     └─ Variation On
      └─ 2. New Targeting Rule
         ├─ definition
         │  └─ Email
         │     └─ does not contain
         │        └─ devcycle
         └─ serve
            └─ Variation Off
```

Other update actions from the CLI include:
- Reordering a Targeting Rule
- Reordering a Filter (known as definition in the CLI)

---

## Delete

Once you have installed and authorized the CLI, select your relevant organization then run the following command:

```bash
dvc targeting update
```

You will be prompted to select a feature, environment and you should ensure that `targets` are selected when asked which fields you are updating.

Select `Remove Targeting Rule` from the options presented and chose the reelvant Targeting rule you would like to delete. Click continue.

If successful you will receive a response which resembles the following (which represents removing a targeting rule named `New Targeting Rule` on the `Staging Environment` for `feature-a`.):

```bash
? Which feature? feature-a
? Which environment? Staging (staging)
? Which fields are you updating targets

🤖 Manage your Targeting
🤖 Current Targeting Rules:
├─ 1. All Users
│  ├─ definition
│  │  └─ All Users
│  └─ serve
│     └─ Variation On
└─ 2. New Targeting Rule
   ├─ definition
   │  └─ Email
   │     └─ does not contain
   │        └─ devcycle
   └─ serve
      └─ Variation Off

? Select an action: Exit (Discard changes)
└─ Staging
   ├─ status
   │  └─ enabled
   └─ rules
      ├─ 1. All Users
      │  ├─ definition
      │  │  └─ All Users
      │  └─ serve
      │     └─ Variation On
      └─ 2. New Targeting Rule
         ├─ definition
         │  └─ Email
         │     └─ does not contain
         │        └─ devcycle
         └─ serve
            └─ Variation Off
@andrewdmaclean ➜ /workspaces/devcycle-docs (main) $ dvc targeting update
? Which feature? feature-a
? Which environment? Staging (staging)
? Which fields are you updating targets

🤖 Manage your Targeting
🤖 Current Targeting Rules:
├─ 1. All Users
│  ├─ definition
│  │  └─ All Users
│  └─ serve
│     └─ Variation On
└─ 2. New Targeting Rule
   ├─ definition
   │  └─ Email
   │     └─ does not contain
   │        └─ devcycle
   └─ serve
      └─ Variation Off

? Select an action: Remove Targeting Rule
? Select the Targeting Rule you would like to delete: New Targeting Rule

🤖 Manage your Targeting
🤖 Current Targeting Rules:
└─ 1. All Users
   ├─ definition
   │  └─ All Users
   └─ serve
      └─ Variation On

----------------------------------------
? Select an action: Continue

🤖 Manage your Targeting
🤖 Current Targeting Rules:
└─ 1. All Users
   ├─ definition
   │  └─ All Users
   └─ serve
      └─ Variation On

----------------------------------------
└─ Staging
   ├─ status
   │  └─ enabled
   └─ rules
      └─ 1. All Users
         ├─ definition
         │  └─ All Users
         └─ serve
            └─ Variation On
```

> A similar process should be applied for removing filters/definitions

