---
title: DevCycle Ruby Server SDK Usage
sidebar_label: Usage
sidebar_position: 3
---

[![RubyGems](https://badgen.net/rubygems/v/devcycle-ruby-server-sdk/latest)](https://rubygems.org/gems/devcycle-ruby-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ruby-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ruby-server-sdk)

## User Object

The full user data must be passed into every method. The only required field is `user_id`.
The rest are optional and are used by the system for user segmentation into variables and features.

See the User model in the [Ruby user model doc](https://github.com/DevCycleHQ/ruby-server-sdk/blob/main/lib/devcycle-ruby-server-sdk/models/user_data.rb) for all accepted fields including custom fields.

```ruby
user_data = DevCycle::UserData.new({user_id: 'user_id_example'}) # UserData | 
```

## Getting all Features
```ruby
begin
  #Get all features for user data
  result = dvc_client.all_features(user_data)
  p result
rescue
  puts "Exception when calling DVCClient->all_features"
end
```

## Get and use Variable by key
```ruby
begin
  # Get value of given variable by key, using default value if segmentation is not passed or variable does not exit
  result = dvc_client.variable("variable-key", user_data, true)
  p "Received value for #{result.key}: #{result.value}"
rescue
  puts "Exception when calling DVCClient->variable"
end
```

## Getting all Variables
```ruby
begin
  #Get all variables for user data
  result = dvc_client.all_variables(user_data)
  p result
rescue
  puts "Exception when calling DVCClient->all_variables"
end
```

## Track Events
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
  result = dvc_client.track(user_data, event_data)
  p result
rescue => e
  puts "Exception when calling DVCClient->track: #{e}"
end
```

## Override Logger
To provide a custom logger, override the `logger` property of the SDK configuration.
```ruby
options = DevCycle::DVCOptions.new(logger: @yourCustomLogger)

```

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/home/feature-management/edgedb/what-is-edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```ruby
# Load the gem
require 'devcycle-ruby-server-sdk'

# Setup authorization
options = DevCycle::DVCOptions.new(enable_edge_db: true, enable_cloud_bucketing: true)

dvc_client = DevCycle::DVCClient.new("dvc_server_token_hash", options, true)
user_data = DevCycle::UserData.new({
   user_id: 'test_user',
   email: 'example@example.ca',
   country: 'CA'
 })
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, Email and Country are associated to the user `test_user`.
In your next identify call for the same `user_id`, you may omit any of the data you've sent already as it will be pulled
from the EdgeDB storage when segmenting to experiments and features.
