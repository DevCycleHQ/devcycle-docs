---
title: Evaluation Lookup
sidebar_position: 1
---

The **Evaluation Lookup** debugging tool lets you view historical Variable Evaluation data for your users. It shows which Features and Variables a user received at a given point in time, along with the reasoning behind that configuration.

:::warning
Ad blockers may prevent you from seeing events sent to DevCycle, as such the Debug Tools may not show the full picture of events.
:::

Why use it?

- Verify that a user received a specific Feature, Variable or Variation.
- Understand the reason behind why a user did or did not receive a Feature, Variable, or Variation.
- Audit all Features, Variables, and Variations a user received during a specific time period, with the option to filter results further.

![image of searching and results](/evaluation-lookup-overview.png)

## Usage

Evaluation Lookup allows you to see Variable Evaluations for a given user. To start, input a `user_id`, select an Environment and pick a date range, and it will return all the evaluations in that given timeframe. There are also optional parameters you can filter by, such as Variable key, Feature name, SDK Type, and Platform.

![image of params to search for](/evaluation-lookup-search-table.png)

## Results

Once you run a search, **Variable Evaluations** are returned along with the latest set of **User Information** for the specified `user_id`. The results table shows:

- The Variable that was evaluated
- The Timestamp for when it was triggered
- The Feature and Variation that was received with a link to the Feature if available
- The Evaluation Reason

We’ll break down both sections below.

![image of searching and results](/evaluation-lookup-results-user-info.png)

### User Information

When expanded, this section displays the latest set of user data evaluated for the specified `user_id`. Any Custom Properties you’ve included will also be displayed here.

![image of user information](/evaluation-lookup-user-information.png)

Coming soon, users will have the ability to **Simulate** a configuration request at any point in time. This will let you see which Features or Variables a user would receive under a specific configuration at a given moment in time.

### Evaluations

The results table displays all Variable Evaluations for the selected `user_id` and date range. Each entry includes the Variable key, associated Feature, received Variation, and the reason it was or was not targeted.

When viewing details for a Variable Evaluation, you’ll also see the raw data from the DevCycle SDK that populates the table.

![Evaluation Lookup Results](/evaluation-lookup-evaluation-details.png)
