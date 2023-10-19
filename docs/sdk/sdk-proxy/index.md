---
title: Overview

---

# SDK Proxy

Deployment scenarios exist where either the deployed SDK cannot reach out to the DevCycle Config CDN or Events API, or
the Bucketing API in the case of a Cloud SDK.
The proxy was created to solve the problem of certain languages not supporting the concepts needed to maintain an
efficient
local bucketing environment for the DevCycle SDKs (i.e. PHP). This has since expanded to support a larger set of
functionality
to enable more deployment scenarios.

The DevCycle SDK Proxy is a standalone process that can be run alongside your application or on a separate
host in your environment.
This proxy is wrapped around the Go Native Bucketing SDK to provide the fastest evaluation times possible for high scale
environments.

## How It Works

The proxy has two operation modes: HTTP over TCP and HTTP over Unix sockets, depending on which deployment method you
want to use for your environment there are some different benefits. We generally only recommend using the HTTP over Unix
sockets for PHP deployments.

| Feature                              | HTTP over TCP | HTTP over Unix Sockets |
|--------------------------------------|---------------|------------------------|
| Centralized Proxy for multiple hosts | Yes           | **No**                 |
| Sidecar deployment                   | Yes           | Yes                    |
| Multiple concurrent proxies          | Yes           | Yes                    |

## Architecture

### Without SDK Proxy

Each instance of a local bucketing SDK will connect to the DevCycle Config CDN; as well as the DevCycle Events API to
submit events. While Cloud bucketing server SDKs will connect to the Bucketing API which then handles the config
retrieval and event submission for variable evaluations.

### With SDK Proxy

With the SDK Proxy in between - the proxy will handle the config retrieval and caching that
config using the underlying Go SDK's cache.

The SDKs would be configured to submit events to the proxy, as well as retrieve configs from the proxy.
In the case of a cloud bucketing SDK - the proxy will emulate the endpoints for variable and feature evaluation, using
the underlying Go SDK's bucketing engine.

| Server SDK                                       | SDK Proxy                                      |
|--------------------------------------------------|------------------------------------------------|
| ![Server SDK Topology](/server-sdk-topology.svg) | ![SDK Proxy Topology](/sdk-proxy-topology.svg) |
