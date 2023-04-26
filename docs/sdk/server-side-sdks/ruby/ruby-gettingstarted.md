---
title: DevCycle Ruby Server SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---

[![RubyGems](https://badgen.net/rubygems/v/devcycle-ruby-server-sdk/latest)](https://rubygems.org/gems/devcycle-ruby-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ruby-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ruby-server-sdk)


Please follow the [installation](/sdk/server-side-sdks/ruby/ruby-install) procedure and then run the following code:

Please note; the default mode is to use Local Bucketing - to use cloud bucketing - set the `enable_cloud_bucketing` option to `true`.

The last argument to `DVCClient.new` tells the sdk whether or not you want to wait for initialization - meaning that the method will block
until the first config is fetched and set successfully or an unrecoverable error occurrs during initialization.

```ruby
# Load the gem
require 'devcycle-ruby-server-sdk'

# Setup authorization
options = DevCycle::DVCOptions.new(enable_cloud_bucketing: false, event_flush_interval_ms: 1000, config_polling_interval_ms: 1000)
dvc_client = DevCycle::DVCClient.new("dvc_server_token_hash", options, true)
user_data = DevCycle::UserData.new({user_id: 'user_id_example'}) # UserData | 

begin
  #Get all features for user data
  result = dvc_client.all_features(user_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->all_features: #{e}"
end

```

## Configure SDK
```ruby
# Load the gem
require 'devcycle-ruby-server-sdk'

# Setup authorization
options = DevCycle::DVCOptions.new(enable_cloud_bucketing: false, event_flush_interval_ms: 1000, config_polling_interval_ms: 1000)
dvc_client = DevCycle::DVCClient.new("dvc_server_sdk_key", options, true)

user_data = DevCycle::UserData.new({user_id: 'user_id_example'}) # UserData | 
```

## Initializing the SDK in a Rails App

The SDK can be initialized in an initializer file:

**Step 1:** Create a new file in `config/initializers` called `devcycle.rb`.

**Step 2:** Add the following code to the `devcycle.rb` file:

```ruby
options = DevCycle::DVCOptions.new(enable_cloud_bucketing: false, event_flush_interval_ms: 1000, config_polling_interval_ms: 4000)
Rails.configuration.dvc_client = DevCycle::DVCClient.new(ENV['DVC_SERVER_SDK_KEY'], options, true)
```

## Initializing the SDK in a Rails App Using Unicorn

When using Unicorn with the `preload_app` configuration set to `true`, the SDK needs to be initialized in the `after_work` block in the `config/unicorn.rb` file:

```ruby
after_fork do |server, worker|
  options = DevCycle::DVCOptions.new(enable_cloud_bucketing: false, event_flush_interval_ms: 1000, config_polling_interval_ms: 400)
  Rails.configuration.dvc_client = DevCycle::DVCClient.new(ENV['DVC_SERVER_SDK_KEY'], options, true)
end
```

## Initializing the SDK in a Rails App Using Puma

When using Puma with the `preload_app` configuration set to `true`, the SDK needs to be initialized in the `on_worker_boot` block in the `config/puma.rb` file:

```ruby
on_worker_boot do
  options = DevCycle::DVCOptions.new(enable_cloud_bucketing: false, event_flush_interval_ms: 1000, config_polling_interval_ms: 4000)
  Rails.configuration.dvc_client = DevCycle::DVCClient.new(ENV['DVC_SERVER_SDK_KEY'], options, true)
end
