---
title: Feature Opt-In Use Cases
sidebar_label: Feature Opt-In Use Cases
sidebar_position: 12
description: Some key usecases for Feature Opt-In
sidebar_custom_props: { icon: fa-solid:user-check }
---

For some initial background Feature Opt-In functionality allows individual users to toggle features on and off for themselves without needing to centrally manage access lists or targeting rules. For more details on Feature Opt-In functionality and how to set it up in your project check out the [Feature Opt-In documentation](/extras/advanced-targeting/feature-opt-in). This concept of allowing an individual to control their own feature settings is very powerful and can be used in various ways. The most common implementation we see is to simplify beta testing or early access programs, allowing users to self-select into beta features as opposed to managing lists of beta users.

Beyond beta programs some other concepts we've seen and used are:
- Internal debug menus
- Preference management
- App customization

This best practice guide will focus on how to set up both an internal QA debug menu and an external preference management panel using Feature Opt-In.

## Internal Debug Menu
While internal debug menus are relatively common, for those that haven't used one before, this is a menu that is visible only to internal users to manage application settings and feature access for debug, troubleshooting or testing purposes. Sometimes these menus are focused entirely on internal bug reports, but they are also useful for surfacing feature access for new functionality that requires significant manual testing for one reason or another.

For this use case we will run through the process of setting up Feature Opt-In using the iFrame widget.

## External Preference Management
For most external facing use cases we understand that teams want complete control over the styling in their application, so for this use case we will build out the preference management panel using the Feature Opt-In APIs.


