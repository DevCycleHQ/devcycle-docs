---
title: "Action: Feature Flag Code Usages"
sidebar_position: 1
---

## Overview

**[Github Marketplace Listing](https://github.com/marketplace/actions/devcycle-feature-flag-code-usages)**


With this Github action, your [DevCycle](https://devcycle.com/) dashboard will be updated to display code snippets for each DevCycle variable usage within your project.

**Note: This is intended to run when pushing changes to your main branch**

### Example Output

![Example Output](https://raw.githubusercontent.com/DevCycleHQ/feature-flag-code-usage-action/main/example_output.png)

### Usage
Create a new Actions workflow in your GitHub repository (e.g. devcycle-usages.yml) in the .github/workflows directory. In your new file, paste the following code:

```yaml
on:
  push:
    branches: [main]

jobs:
  dvc-code-usages:
    runs-on: ubuntu-latest
    name: Fetch DevCycle Code Usages
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: DevCycleHQ/feature-flag-code-usage-action@v1.0.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          client-id: ${{ secrets.DVC_CLIENT_ID }}
          client-secret: ${{ secrets.DVC_CLIENT_SECRET }}
          project-key: app-devcycle-com
```

Your DevCycle API credentials and project token are required to update the DevCycle dashboard.

When referencing your API client ID and secret, we recommend using [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) to store your credentials securely.

### Inputs

| input | required | description |
| ----- | -------- | ----------- |
| `github-token` | yes | The GitHub Actions token e.g. `secrets.GITHUB_TOKEN` |
| `project-key` | yes | Your DevCycle project key, see [Projects](https://app.devcycle.com/r/projects) |
| `client-id` | yes | Your organization's API client ID, see [Organization Settings](https://app.devcycle.com/r/settings) |
| `client-secret` | yes | Your organization's API client secret, see [Organization Settings](https://app.devcycle.com/r/settings) |

### Video Tutorial
`youtube:https://youtu.be/k6xAMNCUEzc`

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