---
title: Usage
---

## Running the SDK Proxy

For a quick setup and test environment, the proxy only requires a single environment variable to be set; `DVC_LB_PROXY_SDK_KEY`. 
This key is used to authenticate to the CDN and Events API.
You can alternatively pass in a full configured file instead of the environment variables via the `-c` flag.

Once the environment variable has been set - start the proxy binary.

```bash
devcycle-local-bucketing-proxy
```

At this point the proxy is live and ready to accept requests from any SDK that is supported. 
By default a TCP server will be started on `localhost:8080`.

# SDK Configuration

Currently only Server SDKs are supported. The default configuration of the proxy will run at `localhost:8080` 
in HTTP TCP mode.
Not all SDKs are configured the same way. Please see the SDK documentation for specific configuration instructions.

Sample configurations for each SDK verified to work with the proxy are below. In a production environment, the configured
hostnames should be changed to reflect the real hostname of the proxy.

## PHP SDK Configuration

### HTTP Socket Configuration
```php
use DevCycle\Model\DevCycleOptions;

$options = new DevCycleOptions(
    enableEdgeDB: false, 
    bucketingApiHostname = "hostname for sdk proxy here"
);
```

### Unix Socket Configuration

```php
use DevCycle\Model\DevCycleOptions;

$options = new DevCycleOptions(
    enableEdgeDB: false, 
    bucketingApiHostname: "http:/localhost",
    unixSocketPath: "/path/to/unix/socket"
);
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
