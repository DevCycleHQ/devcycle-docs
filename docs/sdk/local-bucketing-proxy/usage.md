---
title: Usage
---

## Running the Proxy

The proxy only requires a single
The proxy can be started by just executing the binary:

```bash

$ devcycle-local-bucketing-proxy

HTTP server started on port 8080
```

At this point the proxy is live and ready to accept requests from any SDK that is supported.

# SDK Configuration

Not all SDK's are configured the same way. Please see the SDK documentation for specific configuration instructions.
Certain SDK's are not recommended, or supported to be used with the proxy; specifically all Mobile SDK's are not supported.
The default configuration of the proxy will start run at `localhost:8080` and the SDKs would be configured as follows:
The below configurations are verified to work with the proxy:

## PHP SDK Configuration

### HTTP Socket Configuration
```php
use DevCycle\DevCycleConfiguration;

$config = DevCycleConfiguration::getDefaultConfiguration()
    ->setApiKey("Authorization", getenv("DEVCYCLE_SERVER_SDK_KEY"))
    ->setHost("http://localhost:8080");
```

### Unix Socket Configuration

```php
use DevCycle\DevCycleConfiguration;

$config = DevCycleConfiguration::getDefaultConfiguration()
    ->setApiKey("Authorization", getenv("DEVCYCLE_SERVER_SDK_KEY"))
    ->setHost("http:/v1")
    ->setUDSPath("/path/to/socket/file.sock");
```


## Python SDK Configuration

```python
from devcycle_python_sdk import DevCycleLocalOptions

options = DevCycleLocalOptions(config_cdn_uri = "http://localhost:8080/", events_api_uri = "http://localhost:8080/")
```

## C# SDK Configuration

### Local Bucketing

```csharp
using DevCycle.SDK.Server.Common.Model.Local;
var options = new DevCycleLocalOptions
                { CdnUri = "http://localhost:8080/", EventsApiUri = "http://localhost:8080/" };
```

### Cloud Bucketing

```csharp
using DevCycle.SDK.Server.Common.API;
var restOptions = new DevCycleRestClientOptions { BaseUrl = new Uri("http://localhost:8080/") };
```