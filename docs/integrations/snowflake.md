---
title: Snowflake
sidebar_position: 6
---

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


<details>
  <summary>
 <b><i className="fas fa-arrows-alt"></i> Contributing to DevCycle or creating a new Integration:</b>
  </summary>
  <div>     
    <p>
    If you would like to contribute to an existing integration or tool, all of DevCycle's tools and integrations  are <a href="https://github.com/devcycleHQ">open source on the DevCycle github repository.</a>
</p>
<p>
 Further, if you'd like to create a new tool or integration, a great starting point is <a href="/management-api/">DevCycle's Management API</a> which allows you to modify and interact with features and more within a devcycle project, as well as the <a href="/bucketing-api/">DevCycle Bucketing API</a>  which is used to give users features and variables (as used within the DevCycle SDKs!)
  </p>
  </div>
</details>