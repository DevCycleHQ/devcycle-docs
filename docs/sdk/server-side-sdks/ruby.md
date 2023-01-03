---
title: Ruby SDK
sidebar_position: 4
---

# DevCycle Ruby Server SDK

Welcome to the the DevCycle Ruby SDK, initially generated via the [DevCycle Bucketing API](/bucketing-api/#tag/devcycle).

The SDK is available as a package on RubyGems. It is also open source and can be viewed on Github.

[![RubyGems](https://badgen.net/rubygems/v/devcycle-ruby-server-sdk/latest)](https://rubygems.org/gems/devcycle-ruby-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/ruby-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ruby-server-sdk)

## Installation

Install the gem

`gem install devcycle-ruby-server-sdk`

## Getting Started

Please follow the [installation](#installation) procedure and then run the following code:

```ruby
# Load the gem
require 'devcycle-server-sdk'

# Setup authorization
DevCycle.configure do |config|
  # Configure API key authorization
  config.api_key['bearerAuth'] = 'YOUR API KEY'
end

api_instance = DevCycle::DVCClient.new
user_data = DevCycle::UserData.new({user_id: 'user_id_example'}) # UserData | 

begin
  #Get all features for user data
  result = api_instance.all_features(user_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->all_features: #{e}"
end

```

## Usage

### Configure SDK
```ruby
# Load the gem
require 'devcycle-server-sdk'

# Setup authorization
DevCycle.configure do |config|
  # Configure API key authorization
  config.api_key['bearerAuth'] = 'YOUR API KEY'
end

api_instance = DevCycle::DVCClient.new
user_data = DevCycle::UserData.new({user_id: 'user_id_example'}) # UserData | 
```
### User Object

The full user data must be passed into every method. The only required field is `user_id`. 
The rest are optional and are used by the system for user segmentation into variables and features.

See the User model in the [Ruby user model doc](https://github.com/DevCycleHQ/ruby-server-sdk/blob/main/lib/devcycle-ruby-server-sdk/models/user_data.rb) for all accepted fields including custom fields.

```ruby
user_data = DevCycle::UserData.new({user_id: 'user_id_example'}) # UserData | 
```

### Getting all Features
```ruby
begin
  #Get all features for user data
  result = api_instance.all_features(user_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->all_features: #{e}"
end
```

### Get and use Variable by key
```ruby
begin
  # Get value of given variable by key, using default value if segmentation is not passed or variable does not exit
  result = api_instance.variable("variable-key", user_data, true)
  p "Received value for #{result.key}: #{result.value}"
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->variable: #{e}"
end
```

### Getting all Variables
```ruby
begin
  #Get all variables for user data
  result = api_instance.all_variables(user_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->all_variables: #{e}"
end
```

### Track Events
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
  result = api_instance.track(user_data, event_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->track: #{e}"
end
```

### Override Logger
To provide a custom logger, override the `logger` property of the SDK configuration.
```ruby
DevCycle.configure do |config|
  # Configure API key authorization
  config.api_key['bearerAuth'] = 'YOUR API KEY'

  # Override the default logger
  config.logger = MyLogger
end
```

### Troubleshooting
To see a detailed log of the requests being made to the DevCycle API, enable SDK debug logging:
```ruby
DevCycle.configure do |config|
  # Configure API key authorization
  config.api_key['bearerAuth'] = 'YOUR API KEY'

  # Enable detailed debug logs of requests being sent to the DevCycle API
  config.debugging = true
end
```


### EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](/docs/home/feature-management/edgedb/what-is-edgedb).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```ruby
# Load the gem
require 'devcycle-server-sdk'

# Setup authorization
DevCycle.configure do |config|
  # Configure API key authorization
  config.api_key['bearerAuth'] = 'YOUR API KEY'
  config.enable_edge_db = true
end

api_instance = DevCycle::DVCClient.new
user_data = DevCycle::UserData.new({
   user_id: 'test_user',
   email: 'example@example.ca',
   country: 'CA'
 })
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, Email and Country are associated to the user `test_user`. In your next identify call for the same `user_id`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.


## Documentation for Models

### UserData

User data is provided to most SDK requests to identify the user / context of the feature evaluation

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **user_id** | **String** | Unique id to identify the user |  |
| **email** | **String** | User&#39;s email used to identify the user on the dashboard / target audiences | [optional] |
| **name** | **String** | User&#39;s name used to identify the user on the dashboard / target audiences | [optional] |
| **language** | **String** | User&#39;s language in ISO 639-1 format | [optional] |
| **country** | **String** | User&#39;s country in ISO 3166 alpha-2 format | [optional] |
| **app_version** | **String** | App Version of the running application | [optional] |
| **app_build** | **String** | App Build number of the running application | [optional] |
| **custom_data** | **Object** | User&#39;s custom data to target the user with, data will be logged to DevCycle for use in dashboard. | [optional] |
| **private_custom_data** | **Object** | User&#39;s custom data to target the user with, data will not be logged to DevCycle only used for feature bucketing. | [optional] |
| **created_date** | **Float** | Date the user was created, Unix epoch timestamp format | [optional] |
| **last_seen_date** | **Float** | Date the user was created, Unix epoch timestamp format | [optional] |
| **platform** | **String** | Platform the Client SDK is running on | [optional] |
| **platform_version** | **String** | Version of the platform the Client SDK is running on | [optional] |
| **device_model** | **String** | User&#39;s device model | [optional] |
| **sdk_type** | **String** | DevCycle SDK type | [optional] |
| **sdk_version** | **String** | DevCycle SDK Version | [optional] |

### Event

Event data is provided to `track` calls to log events to DevCycle

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **type** | **String** | Custom event type |  |
| **target** | **String** | Custom event target / subject of event. Contextual to event type | [optional] |
| **date** | **Float** | Unix epoch time the event occurred according to client | [optional] |
| **value** | **Float** | Value for numerical events. Contextual to event type | [optional] |
| **meta_data** | **Object** | Extra JSON metadata for event. Contextual to event type | [optional] |

### Variable

Variable objects are returned by the SDK when calling `variable` or `all_variables`.

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **_id** | **String** | unique database id |  |
| **key** | **String** | Unique key by Project, can be used in the SDK / API to reference by &#39;key&#39; rather than _id. |  |
| **type** | **String** | Variable type |  |
| **value** | **Object** | Variable value can be a string, number, boolean, or JSON |  |

### Feature

Feature objects are returned by the SDK when calling `all_features`

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **_id** | **String** | unique database id |  |
| **key** | **String** | Unique key by Project, can be used in the SDK / API to reference by &#39;key&#39; rather than _id. |  |
| **type** | **String** | Feature type |  |
| **_variation** | **String** | Bucketed feature variation |  |
| **eval_reason** | **String** | Evaluation reasoning | [optional] |

#### About this Package

This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

* API version: 1.0.0
* Package version: 1.0.0
* Build package: org.openapitools.codegen.languages.RubyClientCodegen
