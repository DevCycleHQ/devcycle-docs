---
title: "Pipe: Feature Flag Change Insights on Pull Request"
sidebar_position: 2
---

## Overview

**[Bitbucket Marketplace Listing](https://bitbucket.org/product/features/pipelines/integrations??search=dev&p=devcyclehq/devcycle-pr-insights-pipe)**


With this Bitbucket pipe, information on which [DevCycle](https://devcycle.com/) features have been added or removed in a code change will be shown directly on each Pull Request as a comment.

**Note: This is intended for `pull_request` workflow events**

### Example Output

![Example Output](https://raw.githubusercontent.com/DevCycleHQ/feature-flag-pr-insights-action/main/example_output.png)

### Usage
Add the following snippet to your `bitbucket-pipelines.yml` file:

```yaml
pull-requests:
  '*':
    - step:
        script:
           - pipe: devcyclehq/devcycle-pr-insights-pipe:1.2.0
             variables:
                USER_NAME: '<string>'
                PASSWORD: '<string>'
                # PROJECT_KEY: '<string>' # Optional.
                # CLIENT_ID: '<string>' # Optional.
                # CLIENT_SECRET: '<string>' # Optional.
```


We recommend including your DevCycle API credentials and project token as inputs.
If included, the PR comment will be enriched with Feature Flag data from DevCycle.


### Inputs

- To add variables to be used in the bitbucket-pipelines.yml, an admin must add Repository Variables in Repository Settings > Repository Variables, and then add all necessary variables as secured variables

| Variable  | Description |
| ----- | ----------- |
| `USER_NAME` (*) |  Your bitbucket username |
| `PASSWORD` (*) |  Your generated app password |
| `PROJECT_KEY` |  Your DevCycle project key, see [Projects](https://app.devcycle.com/r/projects) |
| `CLIENT_ID` |  Your organization's API client ID, see [Organization Settings](https://app.devcycle.com/r/settings) |
| `CLIENT_SECRET` |  Your organization's API client secret, see [Organization Settings](https://app.devcycle.com/r/settings) |

_(*) = required variable._

### Prerequisites

1. Create a new [Project](https://docs.devcycle.com/docs/tools-and-integrations/terraform#create-a-project) & a new [Feature](https://docs.devcycle.com/docs/tools-and-integrations/terraform#create-a-feature) 
2. Generate a new [App Password](https://bitbucket.org/account/settings/app-passwords/) 
    - Select `write` permissions under `Pull Requests`, and create the password
3. Grab your username, can easily find it in [Personal Settings](https://bitbucket.org/account/settings/)
#### Optional Prerequisites
1. Grab the PROJECT_KEY in [Projects](https://app.devcycle.com/r/projects), and find your specific project name & key
2. Grab the CLIENT_ID in [Settings](https://app.devcycle.com/r/settings), under `API AUTHENTICATION`
3. Grab the CLIENT_SECRET in [Settings](https://app.devcycle.com/r/settings), under `API AUTHENTICATION`

### Configuration
The patterns used to identify references to variables in your code are fully customizable.
This action uses the [DevCycle CLI](https://github.com/DevCycleHQ/cli) under the hood, for details on how to configure the pattern matcher see the [CLI configuration](https://github.com/DevCycleHQ/cli#configuration).
