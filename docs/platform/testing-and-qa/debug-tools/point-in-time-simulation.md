---
title: Point-in-time Simulation
sidebar_position: 2
---

The **Point-in-time Simulation** debugging tool lets you simulate what a user's Features and Variables would have been at a certain point in time. Select a past date to see what configuration the user would have received on that day.

:::warning
This is only a simulation, the results are not a historical record of what they actually received at the time specified. Features that have rollouts or schedules may not return the proper value at the datetime specified.

To check what users actually received, use the Evaluation Lookup tab.
:::

### Why use it?

- Determine what Features and Variables were active for a given user at a particular date in the past
- Mock user or device data to test which Feature configurations a user should receive at a certain point in time

## Usage

Point-in-time Simulation allows you to test what Features and Variables a user may receive or could have received. This works by first retrieving the Feature configuration that was active on the given date, for your given SDK Type and Environment. Then, the Features will be filtered out based on the Targeting Rules that match the provided User Definition.

Start by selecting the **Environment**, **SDK type**, and the **Date** you want to simulate. Then build the **User Definition** by adding any built-in or custom attributes. A User ID is required, but an anonymous User ID may also be used.

![image of all filters](/pit-simulation-search.png)

#### Simulate from Evaluation Lookup

You can also use the same user fetched after performing a search with a `user_id` in the Evaluation Lookup debug tool. You can click `Simulate` from the User Information section and it will open a new Point-in-time Simulation tab with all of the same user attributes filled in automatically.

![image of eval lookup user simulate](/pit-simulation-eval-lookup.png)

Once you're ready, hit the **Simulate** button to get results.

## Results

The simulated results display the Features and Variables that the user would have been bucketed into, along with the Variation they were served. You can toggle between results grouped by Feature and by Variable, see details below.

![image of results](/pit-simulation-results.png)

#### Group by Feature

When grouped by Feature, each row displays a Feature with the following details:
- The Feature Name and Key
- The Variation that was served
- The number of Variables in each Feature
- The [Evaluation Reason](/sdk/features/#evaluation-reasons)

Click `View Details` to get more info about the Evaluation Reason and the Variables within the Feature.

![image of slideover](/pit-simulation-slideover.png)

#### Group by Variable

When grouped by Variable, each row displays a Variable with the following details:
- The Variable Key
- The Variable Value
- The associated Feature and Variation
- The [Evaluation Reason](/sdk/features/#evaluation-reasons)

Click `View Details` to get more info about the [Evaluation Reason](/sdk/features/#evaluation-reasons), Variable and Feature.