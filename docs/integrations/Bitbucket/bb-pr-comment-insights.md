---
title: "Pipe: Feature Flag Change Insights on Pull Request"
sidebar_position: 2
---

## Overview

**[Bitbucket Marketplace Listing](https://bitbucket.org/product/features/pipelines/integrations??search=dev&p=devcyclehq/devcycle-pr-insights-pipe)**


With this Bitbucket pipe, information on which [DevCycle](https://devcycle.com/) features have been added or removed in a code change will be shown directly on each Pull Request as a comment.

**Note: This is intended for `pull_request` workflow events**

### Example Output

![Example Output](/bitbucket-example-output.png)

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

1. Create a new [Project](/tools-and-integrations/terraform#create-a-project) & a new [Feature](/tools-and-integrations/terraform#create-a-feature) 
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