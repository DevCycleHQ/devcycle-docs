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
