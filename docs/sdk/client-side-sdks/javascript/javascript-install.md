---
title: Javascript SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/js-client-sdk)](https://www.npmjs.com/package/@devcycle/js-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## AI-Powered Install

<details>
<summary>**MCP Install**</summary>

Follow the [MCP Getting Started](/cli-mcp/mcp-getting-started) guide to quickly set up the DevCycle MCP server and connect your AI tool.

- Run this prompt: `"Install DevCycle into this app"`

<a href="cursor://anysphere.cursor-deeplink/mcp/install?name=DevCycle&config=eyJ1cmwiOiAiaHR0cHM6Ly9tY3AuZGV2Y3ljbGUuY29tL21jcCJ9Cg==" className="mcp-install-button" target="_blank" rel="noopener noreferrer">📦 Install in Cursor</a>
<a href="https://vscode.dev/redirect/mcp/install?name=DevCycle&config=%7B%22url%22%3A%20%22https%3A%2F%2Fmcp.devcycle.com%2Fmcp%22%7D" className="mcp-install-button" target="_blank" rel="noopener noreferrer">📦 Install in VS Code</a>
```bash
claude mcp add --transport http devcycle https://mcp.devcycle.com/mcp
```
</details>

import JavaScriptPrompt from '!!raw-loader!../../../ai-prompts/install-prompts/javascript.md';

<div className="aiPromptRow alert alert--info">
  <div className="aiPromptSummary">
    <span><strong>AI Prompt</strong></span>
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(JavaScriptPrompt); }}
      target="_blank"
      rel="noopener noreferrer"
      className="navbar__item navbar__link header-signup-link"
    >
      <span>Copy Prompt</span>
    </a>
  </div>
</div>

## NPM Module

[//]: # 'wizard-install-start'

The recommended way to include the JS SDK is by bundling it with the rest of your Javascript or Typescript application code using our NPM Module.

The JS SDK library can be found on NPM. To get started, install the JS SDK using NPM:

```bash
npm install --save @devcycle/js-client-sdk
```

[//]: # 'wizard-install-end'

To use the JS SDK in your project, import the `initializeDevCycle` function:

```js
import { initializeDevCycle } from '@devcycle/js-client-sdk'
```

## Using the CDN

If you want to load the JS SDK on your webpage separately from your main application bundle, you can use a script tag to do so.

Place the following code snippet as high as possible in your head tag.

```html
<script
  src="https://js.devcycle.com/devcycle.min.js"
  type="text/javascript"
></script>
```
