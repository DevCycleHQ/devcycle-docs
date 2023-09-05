---
title: Installation 
---

# Installation

We provide the proxy in a few formats for usage:

- Raw Source (Go)
- Docker Image
- OS Packaged Binary

The raw source can be used if needing to integrate a custom docker image; or if you need to build a custom binary for
your environment that will use the exposed API to instanitate the proxy.

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

| KEY                                                    | TYPE          | DEFAULT | DESCRIPTION                                                                     |
|--------------------------------------------------------|---------------|---------|---------------------------------------------------------------------------------|
| DVC_LB_PROXY_CONFIG                                    | String        |         | The path to a JSON configuration file.                                          |
| DVC_LB_PROXY_UNIX_SOCKET_PATH                          | String        |         | The path to the Unix socket.                                                    |
| DVC_LB_PROXY_HTTP_PORT                                 | Integer       | 8080    | The port to listen on for HTTP requests. Defaults to 8080.                      |
| DVC_LB_PROXY_UNIX_SOCKET_ENABLED                       | True or False | false   | Whether to enable the Unix socket. Defaults to false.                           |
| DVC_LB_PROXY_HTTP_ENABLED                              | True or False | true    | Whether to enable the HTTP server. Defaults to true.                            |
| DVC_LB_PROXY_SDK_KEY                                   | String        |         | The Server SDK key to use for this instance.                                    |
| DVC_LB_PROXY_PLATFORMDATA_SDKTYPE                      | String        |         | Internal variable, setting a value other than default is not recommended.       |
| DVC_LB_PROXY_PLATFORMDATA_SDKVERSION                   | String        |         | Internal variable, setting a value other than default is not recommended.       |
| DVC_LB_PROXY_PLATFORMDATA_PLATFORMVERSION              | String        |         | Internal variable, setting a value other than default is not recommended.       |
| DVC_LB_PROXY_PLATFORMDATA_DEVICEMODEL                  | String        |         | Internal variable, setting a value other than default is not recommended.       |
| DVC_LB_PROXY_PLATFORMDATA_PLATFORM                     | String        |         | Internal variable, setting a value other than default is not recommended.       |
| DVC_LB_PROXY_PLATFORMDATA_HOSTNAME                     | String        |         | Internal variable, setting a value other than default is not recommended.       |
| DVC_LB_PROXY_SDKCONFIG_EVENT_FLUSH_INTERVAL_MS         | Duration      |         | The interval at which events are flushed to the events api in milliseconds.     |
| DVC_LB_PROXY_SDKCONFIG_CONFIG_POLLING_INTERVAL_MS      | Duration      |         | The interval at which the SDK polls the config CDN for updates in milliseconds. |
| DVC_LB_PROXY_SDKCONFIG_REQUEST_TIMEOUT                 | Duration      |         | The timeout for requests to the config CDN and events API in milliseconds.      |
| DVC_LB_PROXY_SDKCONFIG_DISABLE_AUTOMATIC_EVENT_LOGGING | True or False | false   | Whether to disable automatic event logging. Defaults to false.                  |
| DVC_LB_PROXY_SDKCONFIG_DISABLE_CUSTOM_EVENT_LOGGING    | True or False | false   | Whether to disable custom event logging. Defaults to false.                     |
| DVC_LB_PROXY_SDKCONFIG_MAX_EVENT_QUEUE_SIZE            | Integer       |         | The maximum number of events to be in the queue before dropping events.         |
| DVC_LB_PROXY_SDKCONFIG_FLUSH_EVENT_QUEUE_SIZE          | Integer       |         | The minimum number of events to be in the queue before flushing events.         |
| DVC_LB_PROXY_SDKCONFIG_CONFIG_CDN_URI                  | String        |         | The URI of the Config CDN - leave unspecified if not needing an outbound proxy. |
| DVC_LB_PROXY_SDKCONFIG_EVENTSAPIURI                    | String        |         | The URI of the Events API - leave unspecified if not needing an outbound proxy. |

## Post-Installation

If you have installed an OS packaged version of the proxy - the binary will be installed
to `/usr/bin/devcycle-local-bucketing-proxy`.

You will need to configure a separate supervisor/orchestrator such as `systemd` or `upstart` if no you need to create a
long-lived process.

We recommend keeping the logging output of the proxy available as it streams to `stdout` and `stderr` by default.
To enable debug http logging, set the `GIN_MODE` environment variable to `debug`.