---
title: Ruby Server SDK Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: simple-icons:ruby }
---

[![RubyGems](https://badgen.net/rubygems/v/devcycle-ruby-server-sdk/latest)](https://rubygems.org/gems/devcycle-ruby-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ruby-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ruby-server-sdk)

[//]: # (wizard-evaluate-start)

## User Object

The full user data must be passed into every method. The only required field is `user_id`.
The rest are optional and are used by the system for user segmentation into variables and features.

See the User model in the [Ruby user model doc](https://github.com/DevCycleHQ/ruby-server-sdk/blob/main/lib/devcycle-ruby-server-sdk/models/user.rb)
for all accepted fields including custom fields.

```ruby
user = DevCycle::User.new({ user_id: 'user_id_example' })
```

## Get and use Variable by key

To get values from your Variables, `devcycle_client.variable_value()` is used to fetch variable values using the user data,
variable `key`, coupled with a default value for the variable. The default variable will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable
to be fetched from DevCycle's CDN.

```ruby
begin
  # Get value of given variable by key, using default value if segmentation is not passed or variable does not exit
  result = devcycle_client.variable_value(user, "variable-key", true)
  p "Received value for 'variable-key': #{result}"
rescue
  puts "Exception when calling DevCycle::Client->variable_value"
end
```
[//]: # (wizard-evaluate-end)

The default value can be of type string, boolean, number, or object.

If you would like to get the full Variable you can use `devcycle_client.variable()` instead. This contains fields such as:
`key`, `value`, `type`, `defaultValue`, `isDefaulted`.

## Getting all Features

You can fetch all segmented features for a user:

```ruby
begin
  # Get all features for user data
  result = devcycle_client.all_features(user)
  p result
rescue
  puts "Exception when calling DevCycle::Client->all_features"
end
```

## Getting all Variables

To grab all the segmented variables for a user:

```ruby
begin
  # Get all variables for user data
  result = devcycle_client.all_variables(user)
  p result
rescue
  puts "Exception when calling DevCycle::Client->all_variables"
end
```

:::caution

This method is intended to be used for debugging and analytics purposes, *not* as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Get and use Variable by key](#get-and-use-variable-by-key)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Track Events

Track a custom event for a user, pass in the user and event object.

Calling Track will queue the event, which will be sent in batches to the DevCycle servers.

```ruby
event_data = DevCycle::Event.new({
  type: "my-event",
  target: "some_event_target",
  value: 12,
  meta_data: {
    myKey: "my-value"
  }
})

begin
  # Post events for given user data
  result = devcycle_client.track(user, event_data)
  p result
rescue => e
  puts "Exception when calling DevCycle::Client->track: #{e}"
end
```

## Override Logger

To provide a custom logger, override the `logger` property of the SDK configuration.

```ruby
options = DevCycle::Options.new(logger: @yourCustomLogger)
```

## Set Client Custom Data

To assist with segmentation and bucketing you can set a custom data hash that will be used for all variable and feature evaluations. User specific custom data will override this client custom data.

```ruby
begin
  # Set client custom data
  custom_data = {"some-key" : "some-value"}
  devcycle_client.set_client_custom_data(custom_data)
rescue => e
  puts "Exception when calling DevCycle::Client->set_client_custom_data: #{e}"
end
```

:::caution
Client Custom Data is only available for the Local Bucketing SDK
:::

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user.
Read more about [EdgeDB](/platform/feature-flags/targeting/edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```ruby
# Load the gem
require 'devcycle-ruby-server-sdk'

# Setup authorization
options = DevCycle::Options.new(enable_edge_db: true, enable_cloud_bucketing: true)

devcycle_client = DevCycle::Client.new("dvc_server_token_hash", options, true)
user = DevCycle::User.new({
   user_id: 'test_user',
   email: 'example@example.ca',
   country: 'CA'
 })
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, Email and Country are associated to the user `test_user`.
In your next identify call for the same `user_id`, you may omit any of the data you've sent already as it will be pulled
from the EdgeDB storage when segmenting to experiments and features.
