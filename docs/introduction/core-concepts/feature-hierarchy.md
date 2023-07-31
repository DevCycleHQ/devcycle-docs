---
title: Feature Hierarchy
sidebar_position: 1
---
In DevCycle, Features, Variables, and Variations are key components that work together to manage and control different aspects of your application.

## Features 

Features are the main elements that you want to control or experiment with in your application. 

> They can be anything from a new UI element to a backend algorithm. 

When creating a Feature in the DevCycle, you will be able to choose a [Feature Type](/introduction/core-concepts/feature-types) which will pre-fill some options in the Feature and help kick-start your usage of the Feature. 

## Variables 

Variables are associated with Features. They are the elements that can change within a Feature. 

> For example, if you have a Feature that controls a new UI element, a Variable could be the color of that element. 

By default, upon creation of a Feature, a Boolean Variable will be created which has the same name as the Feature's key for easier reference. Variables cannot be used in multiple existing Features, so their keys must be unique. The Variable Type helps enforce consistent usage across the team to avoid type mismatches in different use cases. 

> Variables may be the following types: `Boolean`, `JSON`, `Number`, or `String`. 

## Variations 

Variations are different versions of a Feature. Each Variation can have different values for the Variables associated with the Feature. 

> For example, if you have a Feature that controls a new UI element and a Variable that controls the color of that element, you could have one Variation where the color is blue and another Variation where the color is red.

When a user is "Served" a Variation based on the Targeting Rules, the Variable Values the user receives on their devices or as an API response will be the values for the served Variation.

:::info
In summary, a **Feature** may have any number of **Variables**, and the values of these **Variables** can change depending on the **Variation** a user is in. 

This allows for a great range of possible use cases such as Personalization, Experimentation, and even gating aspects of Features for various reasons such as billing, permissions, or preferences.
:::