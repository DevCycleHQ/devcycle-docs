---
title: Incident Investigation with MCP
sidebar_label: Incident Investigation
sidebar_position: 1
---

DevCycle’s MCP server helps you investigate and resolve incidents more efficiently by providing real-time access to Feature Flag data within the context of your codebase, enhanced with natural language communication through AI. To get started on your own, check out our [MCP Getting Started](/cli-mcp/mcp-getting-started) guide for setup instructions and a list of available MCP tools.

We'll walkthrough the process in our demo video as well as provide written steps on how to use MCP tools to investigate incidents.

## Demo

In this video, we demonstrate how to use the MCP server to investigate an incident. You'll learn how to pull recent Feature Flag changes with the Audit Log MCP tool, and even revert a change, from within your favorite AI Client. For this demo, we are using [Dynatrace](/integrations/dynatrace/) to monitor application errors and Cursor as our editor and AI tool of choice.

https://www.youtube.com/watch?v=CA83Ea2JB3o&ab_channel=DevCycleHQ

## Walkthrough

:::info
You'll need to have the MCP server setup. Instructions to install that can be found on the [MCP Getting Started](/cli-mcp/mcp-getting-started) page.
:::

During incident investigation, you’ll want to quickly surface any potential sources of errors. If you’re using DevCycle to manage feature releases, one of the first steps is to check for recent updates or rollouts that might correlate with the incident. 

To do this, you can simply ask your AI client if there have been any recent feature changes. For example:

> *"I'm seeing errors from our reporting platform in the last 15 minutes, were there any changes made to DevCycle Features in the Production environment that may be related to this?"*

This will pull up all recent Feature Flag changes in the Production environment. From there, you can ask your AI client for more details about specific Features such as their Variables, last update timestamps, or Targeting Rules. For example:

> *"What Variables are associated to Feature X?"*
>
> *"What are the Production Targeting Rules for Feature X?"*
>
> *"Give me a list of all the changes to Feature X in the last 3 days."*

Once you’ve identified the Feature change causing the issue, you can also ask the AI client to revert it. DevCycle's MCP tools will handle the lookup and reversal for you. For example:

> *"Could you revert the latest change to Feature X?"*

That’s it! After addressing the underlying issues with the Feature, you can ask your AI client to re-enable it or re-apply the changes when you’re ready.

## Reference

For a list of all available DevCycle MCP tools, visit our [MCP Reference](/cli-mcp/mcp-reference) page.
