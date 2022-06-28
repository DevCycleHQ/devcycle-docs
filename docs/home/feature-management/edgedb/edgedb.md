# EdgeDB

## Overview

The EdgeDB feature allows the saving of user data into our EdgeDB storage and to be able to use the data in segmenting decisions without needing
to pass that data in our SDKs every time. The data is stored and retrieved by the `user_id` allowing you to store data about the users cross-platform.

## Usage

### Rest API

We are able to support updates to users using our EdgeDB Public Rest API. The docs for it can be found [here](https://docs.devcycle.com/bucketing-api/).

You are able to use this to update users with all of the supported data, along with custom data, and be able to use that data for segmenting in the
SDKs without having to explicitly pass all of the data when `identifyUser` is called.

```
curl --location --request PATCH 'https://sdk-api.devcycle.com/v1/edgedb/my-user' \
--header 'Authorization: <YOUR-CLIENT-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": "my-user",
    "customData": {
        "amountSpent": 50
    }
}'
```

This will make the custom data `amountSpent` available to segment on when identifying that same user in the SDKs without having to actually pass in 
the custom data. The only required piece of data is `user_id`.

### Supported SDKs

#### Client SDKs
- [JS SDK](https://docs.devcycle.com/docs/sdk/client-side-sdks/javascript#edgedb)
- [iOS SDK](https://docs.devcycle.com/docs/sdk/client-side-sdks/ios#edgedb)
- [Android SDK](https://docs.devcycle.com/docs/sdk/client-side-sdks/android#edgedb)

#### Server SDKs
- [Go SDK](https://docs.devcycle.com/docs/sdk/server-side-sdks/go#edgedb)
- [Java SDK](https://docs.devcycle.com/docs/sdk/server-side-sdks/java#edgedb) 
- [PHP SDK](https://docs.devcycle.com/docs/sdk/server-side-sdks/php#edgedb)
- [Python SDK](https://docs.devcycle.com/docs/sdk/server-side-sdks/python#edgedb)
- [Ruby SDK](https://docs.devcycle.com/docs/sdk/server-side-sdks/ruby#edgedb)