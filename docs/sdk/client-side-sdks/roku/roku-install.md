---
title: Roku SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![GitHub](https://img.shields.io/github/stars/devcyclehq/roku-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/roku-client-sdk)

## AI-Powered Install

import MCPInstall from '@site/docs/_partials/mcpInstall.mdx'
import AIPromptCopyButton from '@site/src/components/AIPromptCopyButton'
import PromptContent from '!!raw-loader!@site/static/ai-prompts/roku.md'

<MCPInstall />

<AIPromptCopyButton promptContent={PromptContent} />

## Requirements

This version of the DevCycle Client SDK supports the following platforms:

- **Roku OS 9.4+**

## Installation

[//]: # 'wizard-install-start'

### Github

Download the latest release from [Github Releases](https://github.com/DevCycleHQ/roku-client-sdk/releases) and extract the provided files into your source tree. You may need to rename the paths inside `DevCycleTask.xml` depending on your project structure.

For SceneGraph usage, add a `DevCycleTask` node to your scene.

[//]: # 'wizard-install-end'
