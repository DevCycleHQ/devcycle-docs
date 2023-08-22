---
title: Overview

---

# Local Bucketing Proxy

Deployment scenarios exists where either the deployed SDK cannot reach out to the DevCycle Config CDN or Events API, or
the Bucketing API in the case of a Cloud SDK.
The proxy was created to solve the problem of certain languages not supporting the concepts needed to maintain an efficient
local bucketing environment for the DevCycle SDK's (PHP). This has since expanded to support a larger set of functionality
to enable more deployment scenarios.

The DevCycle Local Bucketing Proxy is a standalone process that can be run alongside your application or on a separate
host in your environment.
This proxy is wrapped around the Go native bucketing sdk to provide the fastest evaluation times possible for high scale
environments.

## How it works

The proxy has two operation modes: HTTP over TCP and HTTP over Unix sockets, depending on which deployment method you
want to use for your environment there are some different benefits. We generally only recommend using the HTTP over Unix
sockets for PHP deployments.

| Feature                              | HTTP over TCP | HTTP over Unix Sockets |
|--------------------------------------|---------------|------------------------|
| Centralized Proxy for multiple hosts | Yes           | **No**                 |
| Sidecar deployment                   | Yes           | Yes                    |
| Multiple concurrent proxies          | Yes           | Yes                    |


## Architecture

Below is an example of the connections that are made by a server SDK in various configurations to help better understand
the deployment options and hw

### Without Local Bucketing Proxy

Each instance of a local bucketing SDK will connect to the Config CDN; as well as the Events API to submit events. While 
Cloud bucketing server SDK's will connect to the Bucketing API which then handles the config retrieval and event 
submission for variable evaluations.


![Server SDK Topology](/server-sdk-topology.svg)

### With Local Bucketing Proxy

With the local bucketing proxy in between - the Local bucketing proxy will handle the config retrieval and caching that 
config using the underlying Go SDK's cache.

The SDK's would be configured to submit events to the proxy, as well as retrieve configs from the proxy.
In the case of a cloud bucketing SDK - the proxy will emulate the endpoints for variable and feature evaluation, using 
the underlying Go SDK's bucketing engine.


![Server SDK Topology](/local-bucketing-proxy-server-sdk-topology.svg)