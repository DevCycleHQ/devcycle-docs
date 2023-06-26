---
title: Snowflake Data Sharing
sidebar_position: 9
---

## Overview

DevCycle's Snowflake Data Sharing integration allows you to gain access to all data that are collected by the DevCycle SDKs for your organization. Data Sharing provides a secure and straightforward approach to sharing data between companies.

For further information, you may visit Snowflake's dedicated page on [Data Sharing](https://docs.snowflake.com/en/user-guide/data-sharing-intro).


## Requirements

The integration is only available to Organizations that are on Business or Enterprise plans at this time.

Your Organization's Snowflake Account Region must be AWS - US East 1.


## Setup

To begin the setup process for data sharing, you'll need to provide DevCycle with a few details from your Snowflake instance. Please reach out to your contact or to support@devcycle.com and include the following information:

- Name/ID of DevCycle Organization
- Snowflake Account Name
- Snowflake Organization

DevCycle will create the request to share data to your Snowflake instance. Once it's ready, please visit your Snowflake portal to accept the sharing request.


## Schema

DevCycle's Snowflake Schema containing definitions of each field.

| Field | Type | Description |
| - | - | - |
| _ID | string | DVC unique event identifier |
| TYPE | string | Type of the event |
| TARGET | string | Location of tracked event |
| CUSTOMTYPE | string | Custom defined type for the event |
| _PROJECT | string | Unique Project ID |
| _ENVIRONMENT | string | Unique Environment ID |
| USER_ID | string | User ID |
| DATE | timestamp_ntz | Date on which the event was saved to DVC servers |
| CLIENTDATE | timestamp_ntz | Date on which the event was tracked on the device |
| VALUE | float | Any value associated with the event |
| FEATUREVARS | JSON | Set of Variation IDs mapped to Feature IDs |
| USER | JSON | User and Device information |
| METADATA | JSON | Any metadata associated with the event |
| A0_ORGANIZATION | string | Unique Organization ID |
