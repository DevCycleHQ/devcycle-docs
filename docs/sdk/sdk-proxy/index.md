---
title: Overview

---

# SDK Proxy

The SDK Proxy is a service that can be hosted inside your infrastructure to provide a proxy between the DevCycle SDKs
and external APIs. This can be useful in scenarios where the DevCycle SDK cannot reach out to the DevCycle APIs.
This may be due to network firewalls or other security policies that prevent access. It is also useful for reducing the
number of connections to DevCycle's servers, as it allows many instances of the SDK to share a single external connection.

The DevCycle SDK Proxy is a standalone process that can be run alongside your application or on a separate
host in your environment.
It is a minimal service written in Go which maintains a copy of the latest DevCycle configuration in order to provide 
the fastest evaluation times possible for high scale environments.

## How It Works

The proxy has two operation modes: HTTP over TCP and HTTP over Unix sockets. Depending on which deployment method you
want to use for your environment there are some different benefits. We generally only recommend using the HTTP over Unix
sockets for PHP SDK deployments.

| Feature                              | HTTP over TCP | HTTP over Unix Sockets |
|--------------------------------------|---------------|------------------------|
| Centralized Proxy for multiple hosts | Yes           | **No**                 |
| Sidecar deployment                   | Yes           | Yes                    |
| Multiple concurrent proxies          | Yes           | Yes                    |

## Architecture

The SDK Proxy maintains an up-to-date copy of the DevCycle project configuration. It then has the ability to mimic
several external DevCycle services, such as the Bucketing and Event APIs as well as the configuration CDN.

The SDKs can then be configured to retrieve configs and submit events via the proxy.
When using a server SDK in "cloud bucketing" mode, the proxy will emulate the endpoints for variable and feature evaluation.

| Server SDK                                       | SDK Proxy                                      |
|--------------------------------------------------|------------------------------------------------|
| ![Server SDK Topology](/server-sdk-topology.svg) | ![SDK Proxy Topology](/sdk-proxy-topology.svg) |
