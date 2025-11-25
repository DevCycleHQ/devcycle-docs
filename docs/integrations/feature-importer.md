---
title: DevCycle Feature Flag Importer
sidebar_position: 10
---

DevCycle's Feature Flag Importer is designed to import resources from other Feature Flag providers. The Importer is intended to be run on a single Project and will create or update a Project with the same key containing Environments, Features, and Variables.

:::info
The Feature Importer script is fully open-source. Check it out here: https://github.com/devcyclehq/feature-importer
:::

## Tutorial Video

https://youtu.be/xGpBF67ue6Y

## Setup

1. Clone repo from [here](https://github.com/devcyclehq/feature-importer).
2. Run `npm install` to install dependencies.
3. Setup [configuration file](#configuration).
4. Run `npm start` to start an import.

### Configuration File

The Feature Importer can be configured using environment variables or a JSON config file.
By default the config is read from `config.json` in the project root, this can be overwritten using `CONFIG_FILE_PATH`.

:::info
The Feature Importer only supports LaunchDarkly API Version `20220603`. Please select this version when creating an API access token in LaunchDarkly.
:::

#### Required

- **ldAccessToken**: _string_
  - LaunchDarkly access token. Used for pulling Feature Flags.
  - Equivalent env var: `LD_ACCESS_TOKEN`
- **dvcClientId**: _string_
  - DevCycle client ID. Used for fetching API credentials.
  - Equivalent env var: `DVC_CLIENT_ID`
- **dvcClientSecret**: _string_
  - DevCycle client secret. Used for fetching API credentials.
  - Equivalent env var: `DVC_CLIENT_SECRET`
- **sourceProjectKey**: _string_
  - LaunchDarkly's Project key. Resources will be pulled from this Project.
  - Equivalent env var: `SOURCE_PROJECT_KEY`

#### Optional

- **targetProjectKey**: _string_
  - A DevCycle Project key. Resources will be created within this Project. A Project will be created with this key if it does not already exist.
  - If not specified, the target Project key will be used
  - Equivalent env var: TARGET_PROJECT_KEY
- **includeFeatures**: `string[]`
  - An array of LD Feature Flag keys to be imported. By default, the Importer will attempt to migrate all Features.
  - Equivalent env var: `INCLUDE_FEATURES`
- **excludeFeatures**: _string[]_
  - An array of LD Feature Flag keys to be skipped when importing.
  - Equivalent env var: `EXCLUDE_FEATURES`
- **overwriteDuplicates**: _boolean_
  - If true, when the Importer encounters a duplicate resource it will be overwritten. By default, duplicates will be skipped.
  - Equivalent env var: `OVERWRITE_DUPLICATES`
- **operationMap**: _`Map<string, string>`_
  - A map of LD operations to map to DevCycle operations
  - DevCycle operations: `=`, `!=`, `>`, `<`, `>=`, `<=`, `contain`, `!contain`, `exist`, `!exist`
  - Equivalent env var: OPERATION_MAP

Sample `config.json` file:

```json
{
  "ldAccessToken": "api-key",
  "dvcClientId": "clientId",
  "dvcClientSecret": "clientSecret",
  "sourceProjectKey": "project-key",
  "includeFeatures": ["feat-1", "feat-2"],
  "excludeFeatures": [],
  "overwriteDuplicates": false,
  "operationMap": {
    "startsWith": "contain",
    "endsWith": "contain"
  }
}
```

Sample `.env` file:

```bash
LD_ACCESS_TOKEN="api-key"
DVC_CLIENT_ID="clientId"
DVC_CLIENT_SECRET="clientSecret"
SOURCE_PROJECT_KEY="project-key"
INCLUDE_FEATURES=[feat-1,feat-2]
EXCLUDE_FEATURES=[]
OVERWRITE_DUPLICATES=false
OPERATION_MAP='{"endsWith":"contain","startsWith":"contain"}'
```

## Code Migration

### Migrating Code from LaunchDarkly

- In LaunchDarkly, the primary identifier is `key`, in DVC the equivalent value should be passed as `user_id`
- DVC supports the following top-level properties on the user object: see [DVC User Object](/sdk/client-side-sdks/javascript/javascript-gettingstarted#devcycleuser-object).
  Any other properties used for Targeting should be passed within the `customData` map.
- If you are passing a date to be used with LD's before/after operators, the value should be converted to a Long when passed to DVC. The Importer will convert `before` & `after` operators to `<` & `>` in DVC.
- DVC doesn't support Targeting by the top-level `isAnonymous` property. If you are using LD's Targeting with the `anonymous` attribute, make sure to include an `anonymous` property in the user's `customData`

<details>
  <summary>
 <b><i className="fas fa-arrows-alt"></i> Contributing to DevCycle or creating a new Integration:</b>
  </summary>
  <div>     
    <p>
    If you would like to contribute to an existing integration or tool, all of DevCycle's tools and integrations  are <a href="https://github.com/devcycleHQ">open source on the DevCycle github repository.</a>
</p>
<p>
 Further, if you'd like to create a new tool or integration, a great starting point is <a href="/management-api/">DevCycle's Management API</a> which allows you to modify and interact with Features and more within a DevCycle Project, as well as the <a href="/bucketing-api/">DevCycle Bucketing API</a>  which is used to give users Features and Variables (as used within the DevCycle SDKs!)
  </p>
  </div>
</details>
