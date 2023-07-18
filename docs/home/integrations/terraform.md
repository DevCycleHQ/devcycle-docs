---
title: Terraform
sidebar_position: 7
---

## Overview

DevCycle Terraform Provider is a Terraform provider that provides a way to manage DevCycle projects, features, variables, variations, and environments.
It also provides the ability to evaluate variables as a user and feature flag Terraform controlled infrastructure.

<!-- toc -->
* [Setup](#setup)
* [Usage](#usage)
<!-- tocstop -->

## Setup

### Install the Terraform Provider
```hcl
terraform {
  required_providers {
    devcycle = {
      source = "DevCycleHQ/devcycle"
      version = "1.0.0"
    }
  }
}

provider "devcycle" {
  client_id = "your-client-id"
  client_secret = "your-client-secret"
  server_sdk_token = "project-specific-server-sdk-token"
}
```

### Set up DevCycle API Credentials
All actions by the Terraform provider are scoped at the organization root level. This requires DevCycle API authorization.
Your DevCycle organization's client ID and secret must
be provided. They can be obtained from the [settings page](https://app.devcycle.com/r/settings) of the DevCycle dashboard.

There are several ways to provide these credentials:
#### Directly in the Terraform configuration
This is not recommended, as your credentials will be visible in your Terraform state. But if you are securely controlling access to the state file, then this _can_ be used safely.
Set the `client_id` and `client_secret` fields in the `provider.devcycle` block in your Terraform configuration to the respective values.
These will be used to get an OAuth2 access token at the time of use - this value is _not_ stored in the Terraform state file for security.

For the `server_sdk_token` field, this is scoped to a single DevCycle project. This should be the project you want to control your resources from.
The server sdk token can be found in the same [settings page](https://app.devcycle.com/r/settings) as the client id and secret - but you need to select the right 
project first.

#### Environment Variables
Set the following environment variables:
```shell
$ export DEVCYCLE_CLIENT_ID=<your client id>
$ export DEVCYCLE_CLIENT_SECRET=<your client secret>
$ export DEVCYCLE_SERVER_TOKEN=<your server token>
```
Terraform will use these as a fallback from the provider passed variables. Meaning the values in the configuration block will take
precedence over the environment variables.

## Usage

For more detailed documentation on the DevCycle Terraform provider, see the [DevCycle Terraform Provider Documentation](https://registry.terraform.io/providers/DevCycleHQ/devcycle)

After configuration of the provider - let's use the provider to create a DevCycle project.

### Create a Project
```hcl
resource "devcycle_project" "example" {
  name        = "Example DevCycle Project"
  key         = "example-devcycle-project"
  description = "Terraform example project"
}
```

Running `terraform apply` will create this project - and you can see it in the DevCycle dashboard.

This creates a bare project - with no features or variables. To add those, lets create a feature.

### Create a Feature
```hcl
resource "devcycle_feature" "example" {
  project_id  = devcycle_project.example.id
  name        = "Example Feature"
  key         = "example-feature"
  description = "Terraform example feature"
  type        = "experiment"
  tags        = ["terraform"]
}
```

This feature takes in the project id as a variable - we're passing in the id exported from the `devcycle_project` resource to make it 
simple. But if you wanted to create a feature for an already existing project that isn't managed by terraform - feel free to use the human readable
project key instead. Anywhere you see `id` or `key` in the configuration, you can use either the human readable key or the id, as the API manages the conversion between the two.

The feature resource can create and manage the variations and variables attached to the feature - but it's not recommended to manage the variables if you don't need to in the same block,
and to instead use the `devcycle_variable` resource.

### Create a Variable
```hcl
resource "devcycle_variable" "example" {
  name          = "Terraform Example Variable"
  key           = "example-variable"
  description   = "Terraform created variable"
  type          = "Boolean"
  feature_id    = devcycle_feature.example.id
  project_id    = devcycle_project.example.id
}
```

After creating the variable - you can either read from the existing environments auto-created on project creation: `development`, `staging`, `production` or create a new one.


### Getting SDK Keys
Using the data block - you can read the SDK keys that get generated for the environment to change keys automatically in your Terraform configuration.
SDK Keys are prefixed by their type, `client`, `mobile`, or `server`.

```hcl
data "devcycle_environment" "test" {
  key         = "development"
  project_key = devcycle_project.example.key
}

output "development_sdk_keys" {
  value = data.devcycle_environment.test.sdk_keys
}
```

### Evaluating Variables

One of the major features that this provider provides is the ability to evaluate variables. This is done by using the typed data blocks for the type of variable desired.

```hcl
data "devcycle_evaluated_variable_boolean" "create-resource" {
  default_value = false
  id = devcycle_variable.example.id
  user = {
    id = "user-id"
  }
}
```

This evaluation can then be accessed via `data.devcycle_evaluated_variable_boolean.create-resource.value`. The default value will be returned if there is no returned value from no matching variation.

There is another data block for each type of variable that can be evaluated (JSON, Boolean, String, Number) Each is typed explicitly because a variable type cannot be changed after creation.
