---
title: Features
sidebar_position: 1
---

> Features are the main elements that you want to control or experiment with in your application. They can be anything from a new UI element to a backend algorithm.

:::info
When creating a Feature in DevCycle, you will be able to choose a [Feature Type](/essentials/feature-types) which will pre-fill some options in the Feature and help kick-start your usage of the Feature.
:::

---

## Managing All Features on the Feature List Page

![image of list page](/may-2025-feature-list-page.png)

The Feature List Page is where all of your features can be viewed, edited, and filtered for search. This page will show all features within the current Project. The features list (sorted by created date ascending) has the following columns:

| Column       | Description                                                                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Creator      | This will show the icon of the user who created this Feature.                                                                                                                                             |
| Feature type | The selected type of the Feature. Use this to organize your Features.                                                                                                                                     |
| Status       | The Feature's Current [Status](/platform/feature-flags/status-and-lifecycle). This indicates the Feature's current position in the Development [LifeCycle](/platform/feature-flags/status-and-lifecycle). |
| Name         | The Feature's name. This can be changed at any time by editing the Feature.                                                                                                                               |
| Key          | This is the feature's Key. Use this key to reference the Feature in the SDKs or APIs.                                                                                                                     |
| Environments | This displays which environments have Targeting Enabled. If targeting is enabled in multiple environments for a Feature, you can hover over the tag to see which environments are active.                 |
| Tags         | Tags are customizable labels that help you categorize Features.                                                                                                                                           |
| Edit         | Click this to edit on the row the Feature.                                                                                                                                                                |

Use the search input to search by Name, Key, Tag, or Description. The filters can be used to filter by Creator, Status, Type, or [Staleness](/platform/feature-flags/stale-feature-notifications). Each column header can be clicked to sort the column.

> To view another Project's features, use the Project dropdown on the top of the Dashboard.

---

## Creating a New Feature

From this page, you can create a Feature Flag by clicking "Create New Feature" or the `+` in the top bar.

A screen for deciding your Feature Type will now appear. To read more about the feature types and their uses, read [DevCycle Feature Types](/essentials/feature-types).

After choosing a type, the information modal will appear prompting you to enter the following information:

- **Feature Name**
  Enter a descriptive feature name.

- **Feature Key**
  This key is how the feature and its variables will be referenced in code. (A key will be automatically suggested based on the entered name.)

- **Description**
  Optionally, you may choose to provide a detailed description of the feature.

- **Tags**
  Tags are customizable labels that help you categorize Features.

- **Jira Ticket ID(s)**
  If your team has setup the [DevCycle integration for Jira](/integrations/jira), you can link Jira tickets directly to Features within DevCycle, making the feature status easily viewable within Jira.

- **Initial Variable Key**
  Initial Variable Key allows you to define an initial variable key that can differ from the new feature key name. As you type in the Feature Name, the feature Key and the Initial Variable Key will mimic whatever input is entered in the Feature Name field formatted in kebab case.

- **Initial Variable Type**
  Initial Variable Type allows you to select the type of variable for the initial variable created along with your feature (Boolean, JSON, String, or Number).

### Creating a New Feature with a Duplicate Initial Variable Key

If a duplicate variable key belonging to an unassociated variable is submitted when creating a new feature, this modal will appear that will allow you to re-associate the variable to your new feature.

![Duplicate Variable Key Reassociation](/feature-duplicate-initial-variable-key-modal.png)

If the unassociated variable key submitted is archived, a similar modal will appear with the option to unarchive the variable & re-associate it to the new feature.

If you wish to unarchive & re-associate, click on the toggle and click `Yes, Proceed`.

The feature will be created along with the newly re-associated variable. The variations and corresponding variable values will be populated depending on the [Feature Type](/platform/feature-flags/features) selected.

If you attempt to use a duplicate variable key belonging to a variable that's associated with an existing feature, the dashboard will return an error.

---

## Updating a Feature on the Feature Form

The Feature form uses a tabbed layout, with **Overview**, **Manage Feature**, **Data & Results**, and **Audit Log** tabs.

### Feature Overview Tab

The **Feature Overview Tab** provides a high-level overview of a Feature’s configuration and recent activity. It is the default view when navigating to a Feature and is intended to help users quickly assess the current state of a Feature without reviewing each section individually.

![Feature Overview Tab](/may-2025-feature-overview-tab.png)

The Overview Tab displays key information from across the Feature, including the following:

---

#### Last Updated - Audit Log Card

DevCycle surfaces the latest Audit Log entry, summarizing the most recent changes made to the Feature. To view the full diff, click View Details.

![Audit Log Card Overview Tab](/may-2025-feature-overview-audit-log-card.png)

:::note  
If [Approval Workflows](/platform/security-and-guardrails/approval-workflows) are enabled, and there is an active Change Request; this card will display the active Change request in lieu of the Audit Log card.
:::

#### Feature Settings & Status

![Feature Settings Overview Tab](/may-2025-feature-overview-details-section.png)

This section displays the Feature Settings (e.g. name, description, type, Maintainer, tags) and the [Status](/platform/feature-flags/status-and-lifecycle.md) of a Feature.

Feature settings can be changed from the Manage Feature tab, click on the arrow on the upper right corner of the box to navigate to the Settings to edit.

#### Feature Summary Markdown Section

Each Feature includes a Feature Summary Markdown section on the Overview Tab that can be used to add internal documentation. This is helpful for capturing context like rationale behind the Feature, rollout checklists, or acceptance criteria.

![Feature Summary Section Example](/may-2025-feature-overview-summary-section-edit.png)

:::note
For security reasons, links and images are not supported in this Markdown section.  
:::

The content is editable directly from the Overview Tab by users with **Member-level permissions or higher**, allowing teams to store relevant notes directly alongside the Feature rather than relying on external documentation tools.

To make the creation and editing of a useful Feature Summary easier, you also have the option to generate a Summary via **AI**. Next to the edit button there is a **"Generate AI Summary"** button that adds the details of your Feature to a prompt and uses AI to pull out relevant details.

The goal with the AI generation is to make it easier to create and keep Summaries updated, because a quality Feature Summary helps to keep your team informed of your Feature's purpose, who it's targeting and other important details that may be lost with time.

![AI Generated Feature Summary](/aug-2025-ai-feature-summary.png)

---

#### Reach

The Reach section displays a version of the Feature Reach graph. The chart shows the aggregated count of evaluations of ALL variables across ALL environments and ALL SDKS. You can filter the evaluation data for different Environments and time ranges. For more granular filtering, click on the arrow on the top right of the section.

![Feature Reach Section Example](/may-2025-feature-overview-reach-section.png)

---

#### Resources

To support collaboration across tools, a **Resources** section is available on the Overview Tab for adding external links to tools like Notion, GitHub, or Figma. You can add a link along with a title, making it easier for teammates to find supporting context without switching tools.

![Feature Reach Section Example](/may-2025-feature-overview-resources-filled.png)

Edits can be made by users with **Member-level permissions or higher**.

---

#### Variables Snapshot

![Variables Snapshot](/may-2025-feature-overview-variables-section.png)

A read-only snapshot of all variables associated with the Feature is displayed at the bottom of the Overview Tab. It includes the Variable status indicator, name, type, description, and any applied tags. This allows users to quickly audit how a Feature is structured without navigating to the full Feature form.

---

### Manage Feature Tab

The Manage Feature tab is your central workspace for configuring and managing your Feature. It includes the Variables & Variations table, Targeting, Code Examples, Status Section, and Feature Settings.

![Manage Feature Tab](/may-2025-manage-feature-tab.png)

To learn more about each section, explore the following resources:

- [Variables](/platform/feature-flags/variables-and-variations/variables.md)
- [Variations](/platform/feature-flags/variables-and-variations/variations.md)
- [Self-Targeting](/platform/testing-and-qa/self-targeting.md)
- [Targeting](/platform/feature-flags/targeting/targeting-overview.md)
- [Status and LifeCycle](/platform/feature-flags/status-and-lifecycle.md)

To change the **Feature settings** including name, key, and type, description, tags, and Maintainer, navigate to the bottom of the Manage Feature Tab to the Settings section.

Features can be assigned one or more **Maintainers** to indicate who is responsible for the Feature in the settings panel. By default, the creator of the Feature is set as the initial Maintainer. This is useful for clarifying accountability—for example, assigning both a product manager and a technical lead makes it clear who team members should go to if they have questions about the Feature.

### Data & Results Tab

![Data & Results Tab](/may-2025-feature-data-results-tab.png)

The Data & Results Tab houses the Feature Reach graph and the Experiment Results section. To learn more about this section of the Feature Form, review our [Feature Reach](/platform/feature-flags/variables-and-variations/feature-flag-reach.md) and [Metrics](/platform/experimentation/creating-and-managing-metrics.md) documentation.

### Audit Log Tab

![Audit Log Tab](/may-2025-feature-audit-log-tab.png)

The Audit Log tracks all modifications made to a Feature. DevCycle captures the DevCycle user who made the change, a time stamp, and what was modified on each Feature save. For more information, review our [Audit Log](/platform/security-and-guardrails/audit-log.md) documentation.

---

## Archiving a Feature

Archiving is the terminal state for Features that have reached the end of their lifecycle, were never implemented in code, or have become entirely obsolete. See [Status & Lifecyle](/platform/feature-flags/status-and-lifecycle) for more information on how to manage Feature Lifecycles in DevCycle.

Upon Archive, the Feature is put into a read-only mode, and its Audit Logs are accessible and available for teams to review. All [Variables](/platform/feature-flags/variables-and-variations/variables) will be archived along with the Feature _but_ can be re-used and associated to other Features. All Variables in this Feature will begin to serve Default values in code.

This action cannot be undone.

To archive a Feature, either navigate to the Status section OR scroll to the very bottom of the Manage Feature tab and click the `Archive` button. You will be prompted to confirm archival of the Feature.

---

## Deleting a Feature

We recommended that Feature deletion only be used for mistakes, as deletion permanently removes the Feature, its Variables and its Audit Log from DevCycle.

This action cannot be undone.

To delete, a feature scroll to the very bottom of the Manage Feature tab and click the red `Delete` button. You will be prompted to confirm deletion.
