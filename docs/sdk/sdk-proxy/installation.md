---
title: Installation 
---

# Installation

We provide the proxy in a few formats for usage:

- Raw Source (Go)
- Docker Image
- OS Packaged Binary

The raw source can be used if building a custom image is required, or if you need to build a custom binary for
your environment that will use the exposed API to instantiate the proxy.

We recommend using the OS packaged version for easy future upgrades and management.

## Deployment

### Debian based

```bash
sudo dpkg -i devcycle-local-bucketing-proxy_*.deb
sudo apt-get install -f
```

### RPM based

```bash
sudo rpm -i devcycle-local-bucketing-proxy_*.rpm
```

## Configuration

A sample config.json file is included in the package and can be found
at `/etc/devcycle-local-bucketing-proxy/config.json.example`. The most current
version of the file can be found on
our [GitHub](https://github.com/DevCycleHQ/local-bucketing-proxy/blob/main/config.json.example).

Alternatively - it can be configured via environment variables. The following environment variables are supported:

### Environment Variables

`DVC_LB_PROXY_SDK_KEY` is the only required environment variable if not using a configuration file

| KEY                                                      | TYPE          | DEFAULT | REQUIRED | DESCRIPTION                                                                     |
|----------------------------------------------------------|---------------|---------|----------|---------------------------------------------------------------------------------|
| DEVCYCLE_PROXY_CONFIG                                    | String        |         |          | The path to a JSON configuration file.                                          |
| DEVCYCLE_PROXY_UNIX_SOCKET_PATH                          | String        |         |          | The path to the Unix socket.                                                    |
| DEVCYCLE_PROXY_HTTP_PORT                                 | Integer       | 8080    |          | The port to listen on for HTTP requests. Defaults to 8080.                      |
| DEVCYCLE_PROXY_UNIX_SOCKET_ENABLED                       | True or False | false   |          | Whether to enable the Unix socket. Defaults to false.                           |
| DEVCYCLE_PROXY_UNIX_SOCKET_PERMISSIONS                   | String        | 0755    |          | The permissions to set on the Unix socket. Defaults to 0755                     |
| DEVCYCLE_PROXY_HTTP_ENABLED                              | True or False | true    |          | Whether to enable the HTTP server. Defaults to true.                            |
| DEVCYCLE_PROXY_SDK_KEY                                   | String        |         | true     | The Server SDK key to use for this instance.                                    |
| DEVCYCLE_PROXY_PLATFORMDATA_SDKTYPE                      | String        |         |          |                                                                                 |
| DEVCYCLE_PROXY_PLATFORMDATA_SDKVERSION                   | String        |         |          |                                                                                 |
| DEVCYCLE_PROXY_PLATFORMDATA_PLATFORMVERSION              | String        |         |          |                                                                                 |
| DEVCYCLE_PROXY_PLATFORMDATA_DEVICEMODEL                  | String        |         |          |                                                                                 |
| DEVCYCLE_PROXY_PLATFORMDATA_PLATFORM                     | String        |         |          |                                                                                 |
| DEVCYCLE_PROXY_PLATFORMDATA_HOSTNAME                     | String        |         |          |                                                                                 |
| DEVCYCLE_PROXY_SDKCONFIG_EVENT_FLUSH_INTERVAL_MS         | Duration      |         |          | The interval at which events are flushed to the events api in milliseconds.     |
| DEVCYCLE_PROXY_SDKCONFIG_CONFIG_POLLING_INTERVAL_MS      | Duration      |         |          | The interval at which the SDK polls the config CDN for updates in milliseconds. |
| DEVCYCLE_PROXY_SDKCONFIG_REQUEST_TIMEOUT                 | Duration      |         |          | The timeout for requests to the config CDN and events API in milliseconds.      |
| DEVCYCLE_PROXY_SDKCONFIG_DISABLE_AUTOMATIC_EVENT_LOGGING | True or False | false   |          | Whether to disable automatic event logging. Defaults to false.                  |
| DEVCYCLE_PROXY_SDKCONFIG_DISABLE_CUSTOM_EVENT_LOGGING    | True or False | false   |          | Whether to disable custom event logging. Defaults to false.                     |
| DEVCYCLE_PROXY_SDKCONFIG_MAX_EVENT_QUEUE_SIZE            | Integer       |         |          | The maximum number of events to be in the queue before dropping events.         |
| DEVCYCLE_PROXY_SDKCONFIG_FLUSH_EVENT_QUEUE_SIZE          | Integer       |         |          | The minimum number of events to be in the queue before flushing events.         |
| DEVCYCLE_PROXY_SDKCONFIG_CONFIG_CDN_URI                  | String        |         |          | The URI of the Config CDN - leave unspecified if not needing an outbound proxy. |
| DEVCYCLE_PROXY_SDKCONFIG_EVENTSAPIURI                    | String        |         |          | The URI of the Events API - leave unspecified if not needing an outbound proxy. |

:::info

For customers on an Enterprise plan, if you would like support in enabling [Realtime Updates](https://docs.devcycle.com/sdk/features#realtime-updates) or 
configuring any other initialization option for the SDK Proxy please [contact support](mailto:support@devcycle.com).

:::

## Post-Installation

If you have installed an OS packaged version of the proxy - the binary will be installed
to `/usr/bin/devcycle-local-bucketing-proxy`.

You will need to configure a separate supervisor/orchestrator such as `systemd` or `upstart` if no you need to create a
long-lived process.

We recommend keeping the logging output of the proxy available as it streams to `stdout` and `stderr` by default.
To enable debug http logging, set the `GIN_MODE` environment variable to `debug`.
