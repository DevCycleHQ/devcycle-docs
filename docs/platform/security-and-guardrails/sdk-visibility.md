---
title: SDK Visibility
sidebar_position: 6
---

Typically, DevCycle Variables are served to any SDK where the identified user matches the configured set of targeting rules. This behaviour is suitable for most applications. However, there are cases where a project may contain server-side Features that should never have their Variables served to client and/or mobile SDKs. It can become cumbersome and risky to ensure Targeting Rules exclude those SDKs in every server-only Feature.

For this purpose, DevCycle supports an "SDK Visiblity" setting. Setting this allows for control over which SDK types can receive a Feature. Only SDKs corresponding to the checked types will receive the Feature in the configuration, and Targeting Rules will not be evaluated for unselected platforms. Evaluating a Variable on unselected SDK platforms will result in the default value being served. The setting defaults to "Server" SDKs only on every new Feature, ensuring a safe default that must be explicitly changed to expose a Feature to clients.

### How to enable

To use SDK visibility settings, the feature must first be enabled from the Edit Project page.

![Organization SDK Visibility Setting](/sdk-visibility-setting.png)

Once enabled, the setting will appear on the Feature page, and you can control which SDK types can use the Feature.

![Feature SDK Visibility Setting](/sdk-settings.png)
