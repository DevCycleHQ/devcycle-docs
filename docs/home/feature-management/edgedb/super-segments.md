---
title: Super Segments (User Importing)
sidebar_position: 3
---

## Overview

Super Segments are collections of users that are targeted by data from any external source. 

This means that users or their data can be “imported” into DevCycle for targeting in experiments or features by making use of EdgeDB. 

## Usage

This data can be imported to DevCycle and EdgeDB in a number of different methods:
- Via the [EdgeDB API](/docs/best-practices/edgedb-and-edge-flags/edge-db-via-api-simple)
- Through the [Zapier Integration](/docs/best-practices/edgedb-and-edge-flags/import-from-anywhere)

Once a Super Segment has been created in EdgeDB it can then be accessed via Feature Flags using [Custom Properties](/docs/home/feature-management/features-and-variables/custom-properties) within a targeting rule.

Make sure to add the Custom Property to any feature, using the same key used when creating the Super Segment via the API or Zapier Integration.