---
title: Overview

---

# Local Bucketing Proxy

Deployment scenarios exists where either the deployed SDK cannot reach out to the DevCycle Config CDN or Events API, or
the Bucketing API in the case of a Cloud SDK.

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


