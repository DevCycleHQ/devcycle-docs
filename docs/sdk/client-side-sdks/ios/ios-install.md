---
title: iOS SDK Installation
sidebar_label: Installation
sidebar_position: 1
---

## Requirements

This version of the DevCycle Client SDK supports the following platforms: 
- **iOS 12.0+**
- **macOS 10.13+**
- **tvOS 12.0+**
- **watchOS 7.0+**

For all environments please use the DevCycle mobile SDK key as shown in the examples below.

## Installation

### CocoaPods

The SDK can be installed into your iOS project by adding the following to your cocoapod spec:

```swift
pod 'DevCycle'
```
Then, run `pod install`.

### Carthage

Include the following in your `Cartfile` to integrate DevCycle as a dependency to your project: 

```swift
github "DevCycleHQ/ios-client-sdk"
```

Then, run `carthage update --use-xcframeworks`. Drag the built .xcframework bundles from Carthage/Build into the "Frameworks and Libraries" section of your application’s Xcode project.

### Swift Package Manager

To use the library with Swift Package Manager, include it as a dependency in your `Package.swift` file like so:

```
...
    dependencies: [
        .package(url: "https://github.com/DevCycleHQ/ios-client-sdk.git", .upToNextMinor("1.2.1")),
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
