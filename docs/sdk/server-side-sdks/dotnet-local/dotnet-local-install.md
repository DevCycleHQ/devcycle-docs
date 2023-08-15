---
title: .NET / C# Local SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: {icon: screwdriver-wrench}
---

[![Nuget](https://badgen.net/nuget/v/DevCycle.SDK.Server.Local)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/dotnet-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/dotnet-server-sdk)

## Requirements

### Frameworks supported
- `.NET & .NET Core >= 3.0`
- `Mono >= 6.4`
- `Xamarin.iOS >= 12.16`
- `Xamarin.Mac >= 5.16`
- `Xamarin.Android >= 10.0`
- `Unity >= 2021.2`

### Dependencies
- `FubarCoder.RestSharp.Portable.Core >= 4.0.8`
- `FubarCoder.RestSharp.Portable.HttpClient >= 4.0.8`
- `JsonSubTypes >= 1.8.0`
- `Microsoft.Extensions.Logging.Abstractions >= 6.0.1`
- `Microsoft.Extensions.Logging.Console >= 6.0.1`
- `Microsoft.Extensions.Logging >= 6.0.0`
- `Newtonsoft.Json >=13.0.1`
- `TypeSupport >= 1.1.12`
- `Wasmtime >= 0.34.0-preview1`


## Installation
Download the SDK from Nuget - https://nuget.info/packages/DevCycle.SDK.Server.Local/
and use the namespaces:
```csharp
using DevCycle.SDK.Server.Local.Api;
```
