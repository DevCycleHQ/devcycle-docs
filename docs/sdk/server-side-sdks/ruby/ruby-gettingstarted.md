---
title: Ruby Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![RubyGems](https://badgen.net/rubygems/v/devcycle-ruby-server-sdk/latest)](https://rubygems.org/gems/devcycle-ruby-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ruby-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ruby-server-sdk)

Please follow the [installation](/sdk/server-side-sdks/ruby/ruby-install) procedure and then run the following code:

Please note; the default mode is to use Local Bucketing - to use cloud bucketing - set the `enable_cloud_bucketing` option to `true`.

The last argument to `DevCycle::Client.new` tells the sdk whether you want to wait for initialization - meaning that the method will block
until the first config is fetched and set successfully or an unrecoverable error occurs during initialization.

[//]: # (wizard-initialize-start)

```ruby
# Load the gem
require 'devcycle-ruby-server-sdk'

# Setup authorization
devcycle_client = DevCycle::Client.new(ENV['DEVCYCLE_SERVER_SDK_KEY'], DevCycle::Options.new, true)
user = DevCycle::User.new({ user_id: 'user_id_example' })

begin
  # Get all features for user data
  result = devcycle_client.all_features(user)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DevCycle::Client->all_features: #{e}"
end

```
[//]: # (wizard-initialize-end)

## Initializing the SDK in a Rails App

The SDK can be initialized in an initializer file:

**Step 1:** Create a new file in `config/initializers` called `devcycle.rb`.

**Step 2:** Add the following code to the `devcycle.rb` file:

```ruby
Rails.configuration.devcycle_client = DevCycle::Client.new(
  ENV['DEVCYCLE_SERVER_SDK_KEY'],
  DevCycle::Options.new,
  true
)
```

## Initializing the SDK in a Rails App Using Unicorn

When using Unicorn with the `preload_app` configuration set to `true`, the SDK needs to be initialized in the `after_work` block in the `config/unicorn.rb` file:

```ruby
after_fork do |server, worker|
  Rails.configuration.devcycle_client = DevCycle::Client.new(
    ENV['DEVCYCLE_SERVER_SDK_KEY'],
    DevCycle::Options.new,
    true
  )
end
```

## Initializing the SDK in a Rails App Using Puma

When using Puma with the `preload_app` configuration set to `true`, the SDK needs to be initialized in the `on_worker_boot` block in the `config/puma.rb` file:

```ruby
on_worker_boot do
  Rails.configuration.devcycle_client = DevCycle::Client.new(
    ENV['DEVCYCLE_SERVER_SDK_KEY'],
    DevCycle::Options.new,
    true
  )
end
```

## Initialization Options

The SDK exposes various initialization options which can be set when registering the DevCycle Client:

```ruby
require 'devcycle-ruby-server-sdk'

options = DevCycle::Options.new(config_polling_interval_ms: 10000)

devcycle_client = DevCycle::Client.new("dvc_server_token_hash", options, true)
user = DevCycle::User.new({
   user_id: 'test_user',
   email: 'example@example.ca',
   country: 'CA'
 })
```

| DevCycle Option              | Type           | Description                                                                                                                                                                  |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enable_cloud_bucketing         | Boolean        | Switches the SDK to use Cloud Bucketing (via the DevCycle Bucketing API) instead of Local Bucketing.                                                                         |
| event_flush_interval_ms         | Int         | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds.                                                                               |
| disable_custom_event_logging    | Boolean        | Disables logging of custom events, from `track()` method, and user data to DevCycle.                                                                                         |
| disable_automatic_event_logging | Boolean        | Disables logging of sdk generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle.                                                                      |
| config_polling_interval_ms      | Int         | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second.                                    |
| enable_beta_realtime_updates    | Boolean        | Enables the usage of Beta Realtime Updates for DevCycle. This feature is currently in beta.                                                                                  |
| request_timeout_ms       | Int         | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| max_event_queue_size            | Int         | Controls the maximum size the event queue can grow to until events are dropped. Defaults to `2000`.                                                                          |
| flush_event_queue_size          | Int         | Controls the maximum size the event queue can grow to until a flush is forced. Defaults to `1000`.                                                                           |
| event_request_chunk_size          | Int         | Count of events to chunk per event upload request. Defaults to `100`.                                                                           |
| logger                       | DevCycleLogger | Logger override to replace default logger                                                                                                                                    |
| config_cdn_uri                  | String         | Contact support for usage instructions.                                                                                       |
| events_api_uri                  | String         | Contact support for usage instructions.                                                                                       |
| enable_edge_db                 | Boolean        | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing.                                          |









