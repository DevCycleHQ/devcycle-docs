---
title: iOS SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![CocoaPods compatible](https://img.shields.io/cocoapods/v/DevCycle.svg)](https://cocoapods.org/pods/DevCycle)
[![Carthage compatible](https://img.shields.io/badge/Carthage-compatible-4BC51D.svg?style=flat)](https://github.com/Carthage/Carthage)
[![SwiftPM compatible](https://img.shields.io/badge/SwiftPM-compatible-4BC51D.svg?style=flat)](https://swift.org/package-manager/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ios-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/ios-client-sdk)

## Requirements

This version of the DevCycle Client SDK supports the following platforms:

- **iOS 12.0+**
- **macOS 10.13+**
- **tvOS 12.0+**
- **watchOS 7.0+**

## Installation

### CocoaPods

The SDK can be installed into your iOS project by adding the following to your cocoapod spec:

```swift
pod 'DevCycle'
```

Then, run `pod install`.

### Carthage

:::caution

Carthage support for MacOS development with the DevCycle iOS SDK is currently not supported. Please contact us for more info.

:::

Include the following in your `Cartfile` to integrate DevCycle as a dependency to your project:

```swift
github "DevCycleHQ/ios-client-sdk"
```

Then, run `carthage update --platform <platform> --use-xcframeworks` where `platform` is the platform you are using the SDK on: `iOS | macOS | watchOS | tvOS`.

Drag the built .xcframework bundles from Carthage/Build into the "Frameworks and Libraries" section of your application’s Xcode project.

### Swift Package Manager

To use the library with Swift Package Manager, include it as a dependency in your `Package.swift` file like so:

```
...
    dependencies: [
        .package(url: "https://github.com/DevCycleHQ/ios-client-sdk.git", .upToNextMajor("1.11.2")),
    ],
    targets: [
        .target(
            name: "YOUR_TARGET",
            dependencies: ["DevCycle"]
        )
    ],
...
```

You can also add it through Xcode, i.e. `File > Swift Packages > Add Package Dependency`, then enter the repository clone URL.
