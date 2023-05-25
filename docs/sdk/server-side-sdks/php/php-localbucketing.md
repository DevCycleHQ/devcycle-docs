---
title: PHP Server SDK Local Bucketing
sidebar_label: Local Bucketing
sidebar_position: 4
description: hidden
sidebar_custom_props: {icon: rocket}
---

## Local Bucketing in PHP

Due to complexities with the PHP application lifecycle and state management, local bucketing functionality requires a different approach compared to the other server SDKS. 

To access this functionality in PHP, DevCycle provides **proxy** process that can run alongside your PHP application or on a separate host in your environment. This proxy mimics the Cloud Bucketing API but provides for higher speed variable evaluations due to the reduction of network latency and config caching; all powered by DevCycle's high performance Go Server SDK.

The proxy handles two modes of operation, either as an HTTP server with TCP port or as a process exposing Unix domain sockets. The latter is recommended for servers that will deploy the proxy on the same machine as the PHP process using the SDK, removing the need for network calls. 

The local bucketing proxy can be downloaded as a binary or package from here: https://github.com/DevCycleHQ/local-bucketing-proxy/releases

### Proxy Configuration

Once the proxy is downloaded and installed, it can be configured via either environment variables or command line arguments. See the README for the configuration options:
https://github.com/DevCycleHQ/local-bucketing-proxy/blob/main/README.md#options

At a minimum, you will need set the `DVC_LB_PROXY_SDK_KEY` environment variable to activate the proxy. This should be set to your SDK key for your PHP application.
The rest of the values can be left unchanged for basic operation. This will default to starting an HTTP server on port 8080.


### Running the Proxy

The proxy can be started by just executing the binary:

```bash

$ local-bucketing-proxy

HTTP server started on port 8080

```

At this point the proxy is live and ready to accept requests from the PHP SDK.

#### OS Packaged Version
If you have installed an OS packaged version of the proxy - the binary will be installed to `/usr/bin/local-bucketing-proxy`.

You will need to configure a separate supervisor/orchestrator such as `systemd` or `upstart` if no you need to create a long-lived process. 

### PHP SDK Configuration
Once the local bucketing proxy is up and running, you will need to update the configuration for your PHP SDK to point at the proxy host.  

The default configuration of the proxy will start run at `localhost:8080` and the PHP SDK would be setup as follows: 

```php
$config = DevCycle\Configuration::getDefaultConfiguration()
    ->setApiKey('Authorization', $_ENV["DVC_SERVER_SDK_KEY"])
    ->setHost("http://localhost:8080");
```

No other configuration is necessary. Ensure that the local bucketing proxy is running before the PHP application makes a request to it.
