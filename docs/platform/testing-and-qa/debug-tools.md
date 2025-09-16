---
title: Debug Tools
sidebar_position: 4
---

> This new tab contains all the tools needed to make debugging DevCycle easier!

---

## Evaluation Lookup

![image of params to search for](/evaluation-lookup-search-table.png)

Evaluation Lookup allows you to see the evaluations for a given user. You can input a `user_id`, select an Environment, a date range and it will return you all the evaluations in that given timeframe.

There are also optional parameters you can search for, such as Variable, Feature, SDK Type, and Platform.

Once you search for results, the evaluations are returned along with user information:

![image of user information](/evaluation-lookup-user-information.png)

The table rendered shows the Variable evaluated, the timestamp it was received at, a link to the Feature it's associated to, the variation the user received, and finally the evaluation reason the user received.

![Evaluation Lookup Results](/evaluation-lookup-table-results.png)

## Web Debugger

The Web Debugger is an embeddable tool for inspecting and testing DevCycle directly on your site. Authorized users can view active Feature configurations, apply Self-Targeting Overrides, and monitor SDK events in real time—without switching back to the dashboard.

Check out [the Web Debugger documentation](/platform/testing-and-qa/web-debugger) for more information.

## Coming soon

- Point-in-time Simulation
- Live Events
