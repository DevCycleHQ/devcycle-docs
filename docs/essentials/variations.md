---
title: Variations
sidebar_class_name: hidden
---

Variations are different versions of a Feature. Each Variation can have different values for the Variables associated with the Feature. 

> For example, if you have a Feature that controls a new UI element and a Variable that controls the color of that element, you could have one Variation where the color is blue and another Variation where the color is red.

When a user is "Served" a Variation based on the Targeting Rules, the Variable Values the user receives on their devices or as an API response will be the values for the served Variation.

---

## Managing Variations

To view the Variables and Variations within a Feature, navigate to the 'Variables' section on a Feature page sidebar. This will lead the user to a table containing all of the Variables used by this Feature and all of their values across all Variations.

Depending on the Feature type, the default Variations will be pre-set. The most common of which will be the Variations of "Variation OFF" and "Variation ON", with the boolean Variable being set to false and true, respectively.

When a user is "Served" a Variation based on the [Targeting Rules](/essentials/targeting), the Variable Values the user receives on their devices or as an API response will be the values for the served Variation.

---

## Creating a Variation

By default, most Feature types within DevCycle will begin with two Variations. At any time, extra Variations can be added by clicking the "Add Variation" button on the Variables section of a Feature.

This will allow you to create a new Variation and assign all of the relevant values. 

Give your new Variation a **name** as well as a **key**, as well as its **values** For each of the current Variables.

**Variation Name**

- The Variation Name is used for your reference in the DevCycle Dashboard and CLI.

**Variation Key**

- The Variation key is used for easy reference within the DevCycle SDKs and APIs 

**Variation Value(s)**

- The Variable values will be what the Variable's value will be in SDK and API responses if a targeting rule is targeting those specific Variations. 

Once this Variation is created, it will become available as an option within the "Serve" dropdown for [Targeting Rules](/essentials/targeting). Users who are served this new Variation will receive the Variable Values associated with this new Variation!

---

## Updating a Variation

A Variation may be editing at any time by clicking the edit icon on the Variation column in the Variables table.

---

## Deleting a Variation

A Variation may be deleted at any time by clicking the edit icon on the Variation column of the Remote Variables page. Variations that are currently being used in any **Enabled** environment cannot be deleted. First remove any audience being targeted by this Variation prior to deletion.


