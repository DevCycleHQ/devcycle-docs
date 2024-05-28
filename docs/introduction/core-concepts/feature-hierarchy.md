---
title: Feature Hierarchy
sidebar_position: 1
---
In a traditional feature flagging platform, there is only one type of entity to worry about: a `feature flag`! In these 
platforms, a `feature flag` contains the targeting rules and possible values for its respective key, all rolled into one.

DevCycle does things differently. Rather than restricting you to one `feature flag` per set of targeting rules, we allow
multiple `flags` to be governed by a single set of rules. In our platform, a value that you retrieve in your code is
referred to as a `Variable`. For example, this line of code obtains a `Variable` from DevCycle using the unique key `headerText`:
```typescript
const headerText = devCycleClient.variable('headerText', 'Welcome to My Website!')
```

In order for DevCycle to provide different values for this `Variable`, it must be associated with a `Feature`. A `Feature`
serves as a logical grouping of `Variables`, and defines the sets of possible values these `Variables` can receive.
It also contains the targeting rules that decide who should receive what value. The sets of possible values are called 
`Variations`. 

You can think of a `Feature` as a set of related `Variables` that are all part of a new product feature, or should be 
grouped together for organization purposes. A concrete example of this is a `Feature` like "Website Redesign" which
can contain many `Variables` controlling different aspects of the design, like "headerText", "headerColor", "buttonColor", etc.
At DevCycle, we often have `Features` that contain both back-end and front-end `Variables`, so that all parts of a new `Feature`
can be turned on or off at the same time.

The approach of composing multiple `Variables` together into a `Feature` and setting the possible values
using `Variations` has some advantages:

- `Variables` that are related to each other can be grouped into a single `Feature` for ease of organization
- Combinations of `Variables` that must be set together, or only have certain permutations of valid values, can be controlled
together
- You can easily experiment with different `Variations` of several variables. 
- Various components of both the back-end and front-end can be controlled together without having to use the same `Variable`
across each code base.
- You can re-use a `Variable` in the future even after a feature has been released or an experiment concluded.

For more detail on each of these concepts, see below.

## Variables

Variables are the main "primitive" that you interact with using the DevCycle SDK. A `Variable` is identified by a unique
`key`, has a particular data type, and can optionally be defined with a 
more specific [schema](/topics/security-guardrails/variable-schemas) of possible allowed values.

> Variables may be the following types: `Boolean`, `JSON`, `Number`, or `String`.

A `Variable` is accessed from an SDK using the `variable` method, which looks something like this:
```typescript
const headerText = devCycleClient.variable('headerText', 'Welcome to My Website!')
```

A call to the `variable` method is known as an `evaluation`. Each `evaluation` must define a default value that will be
served in cases where DevCycle is unreachable, _or_ the user does not qualify for any targeting rules that would
change the served value.

On their own, `Variables` will only ever receive the default value defined in code. In order to instruct DevCycle to 
change their values, `Variables` must be added to a `Feature`.

## Features 

Features are a grouping of related `Variables`, and define the `Variations` that govern the sets of values these
`Variables` will receive from DevCycle. Targeting rules are also defined in a `Feature`, and each rule serves one or more
`Variations` to the set of qualified users.

A `Feature` can most simply be thought of as a "new product feature", but could also be used for things like:

- defining the set of features available to different tiers of users on a SaaS platform (eg. Pro, Enterprise etc.)
- defining the set of configuration settings for a particular backend service
- enabling or disabling a set of optional features that are known to degrade performance during a high-traffic event
- experimenting with multiple variations of a redesign

> By default, upon creation of a Feature, a Boolean Variable will be created which has the same name as the Feature's key for easier reference. Variables cannot be used in multiple existing Features, so their keys must be unique. The Variable Type helps enforce consistent usage across the team to avoid type mismatches in different use cases.

When creating a Feature in the DevCycle, you will be able to choose a [Feature Type](/introduction/core-concepts/feature-types) which will pre-fill some options in the Feature and help kick-start your usage of the Feature. 


## Variations 

Variations are different sets of `Variable` values defined in a Feature. `Variations` can be used to ensure that only 
certain permutations of multiple `Variables` can be served by DevCycle. They are also useful for experimentation, where
different `Variations` can be tested against each other to determine which one performs better.

> For example, if you have a Feature that controls a new UI element and a Variable that controls the color of that element, you could have one Variation where the color is blue and another Variation where the color is red.

When a user is "Served" a Variation based on the Targeting Rules, the Variable Values the user receives will be the values for the served Variation.

:::info
In summary, a **Feature** may have any number of **Variables**, and the values of these **Variables** can change depending on the **Variation** a user is in. 

This allows for a great range of possible use cases such as Personalization, Experimentation, and even gating aspects of Features for various reasons such as billing, permissions, or preferences.
:::
