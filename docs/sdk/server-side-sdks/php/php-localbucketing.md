---
title: PHP Server SDK Local Bucketing
sidebar_label: Local Bucketing
sidebar_position: 4
description: hidden
sidebar_custom_props: {icon: rocket}
---

## Local Bucketing in PHP

Due to how PHP executes, and the application lifecycle - we can't implement the local bucketing functionality the same way 
as other SDKs. 

As a result - we have a "proxy" process that can either run on the same host as your PHP application, or on a different host. 
We expose two functionality modes for it - unix domain sockets for localhost usage and TCP sockets for remote usage and localhost usage.
This proxy mimics the cloud bucketing endpoints but allows for higher speed variable evaluations due to the lack of network latency, and config caching 
thanks to the underlying Go Server SDK.

The local bucketing proxy can be downloaded as a binary or package from here: https://github.com/DevCycleHQ/local-bucketing-proxy/releases

### Proxy Configuration

The proxy can be configured via environment variables or command line arguments - see the README for the latest values:
https://github.com/DevCycleHQ/local-bucketing-proxy/blob/main/README.md#options

To get up and running - the only environment variable needed for basic operation is `DVC_LB_PROXY_SDK_KEY` - which must be set to your SDK Token for your PHP application.
The rest of the values can be left unchanged for basic operation. This will default to starting an HTTP server on port 8080.

#### OS Packaged Version
If you've installed an OS packaged version - the binary will be installed to `/usr/bin/local-bucketing-proxy`.
There currently is not any supervisor/orchestrator like systemd or upstart scripts for the packaged version - so you will need to create your own if you need a long lived process.


### PHP SDK Configuration
Because this is a new endpoint - the configuration for the PHP sdk needs to set the target host for all the requests to be `localhost:8080`.

This can be by the following:


```php
$config = DevCycle\Configuration::getDefaultConfiguration()
    ->setApiKey('Authorization', $_ENV["DVC_SERVER_SDK_KEY"])
    ->setHost("http://localhost:8080");
```

The SDK needs no other configuration for this to work. Ensure that the proxy is started and running before the PHP application makes a request to it.
