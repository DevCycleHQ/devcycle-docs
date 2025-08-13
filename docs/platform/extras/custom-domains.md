---
title: Custom Domains
sidebar_position: 1
---

# Custom Domains

When using client-side SDKs, particularly web client SDKs, there is the potential for ad blockers
and browser privacy features to block requests and third-party cookies. Custom Domains with DevCycle ensures
all cookies and requests used are first-party and will not be blocked by ensuring requests are sent through your
recognized domain.

:::info

Custom Domains are a business and enterprise feature. To learn more, read about our [pricing](https://devcycle.com/pricing). To upgrade your plan, please contact your Account Manager or our [Sales](mailto:sales@devcycle.com) team.

:::

## Requirements

Custom Domains will require some back and forth setup on both your end as well as DevCycle's. A DNS CNAME needs to be created to leverage this feature.

To start the setup process, please reach out to your account representative or to support@devcycle.com and provide the following information:

- Your desired **CNAME domain** with a maximum of one subdomain (e.g. api-alias.your-domain.com). Avoid text that may be blocked by adblockers.
- Your desired **SSL certificate provider** from one of the three providers if required - SSL.com, Google Trust Services, Let's Encrypt. We will select one at random if you do not require a specific provider.
- Your **DevCycle Services** that will use the CNAME (e.g. Client SDKs, Server SDKs, Mobile SDKs)

Once DevCycle receives this information, we can provide you with next steps. A brief outline of the process is shown below and requires involvement from both parties. Please continue to refer to our communications for the correct next steps.

## Setup Process

1. **Identifying a Hostname**: The first step involves **identifying** a hostname to use as the CNAME for DevCycle's endpoint. Provide this to DevCycle on your request to enable Custom Domains. The hostname should look something like this `https://api-alias.your-domain.com`. We do not support two or more subdomains in the hostname (e.g. `a.b.c.com` is not supported).
    - If there is more than one service in use, each service will need a unique CNAME. This is also true for using DevCycle on multiple domains. Each domain needs its own CNAME.

2. **DNS Validation**: Once the setup is complete, two DNS records will be provided by DevCycle and you will need to add those records to your DNS provider (TXT validation records).
   - The first DNS record will be a TXT verification record to ensure that you own the domain that you are asking DevCycle to use as a custom hostname.
   - The second DNS record will be a TXT verification record to ensure that you have permission to create an SSL certificate for said domain. This record will conflict with any existing A/AAAA or CNAME records on the hostname and require them to be removed before adding the verification record.

   Once these records have been added, please let DevCycle know.

3. **DevCycle Additional Setup**: Once validation is complete and DevCycle has confirmed the records are set properly, there may be an extra step involved here with DevCycle depending on your SDK configuration. DevCycle will let you know if this is needed.

4. **Creating a CNAME**: Once all steps are complete, DevCycle will send the details for the DNS CNAME. Once added, the service will be immediately available at the given hostname.

5. **SDK Implementation**: Once you have completed the steps above to create a CNAME, modify your existing SDK initialization to include the `apiProxyURL` initialization option. See below.

## SDK Implementation

In order to use the Custom Domain, you'll have to point the SDK requests to the newly created CNAME domain.

### JavaScript SDK

Add the `apiProxyURL` option and your CNAME domains as per the [JS SDK Initialization Options](https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-gettingstarted#initialization-options).

```javascript
const devcycleClient = initializeDevCycle('<DEVCYCLE_CLIENT_SDK_KEY>', user, {
  apiProxyURL: 'https://api-alias.your-domain.com',
})
```

### iOS SDK

Add the `apiProxyURL` option and your CNAME domains as per the [iOS SDK DevCycle Options Builder](https://docs.devcycle.com/sdk/client-side-sdks/ios/ios-gettingstarted#devcycleoptions-builder).

```swift
let options = DevCycleOptions.builder().apiProxyURL("https://api-alias.your-domain.com").build()
let client =  try? DevCycleClient.builder()
            .sdkKey("<DEVCYCLE_SDK_KEY>")
            .user(user!)
            .options(options)
            .build(onInitialized: nil)
```

After completing the steps above, users should be able to freely maneuver around AdBlockers and prevent them from blocking requests to our API servers and our SDK.

If you have any questions regarding this process, please reach out to our [support](mailto:support@devcycle.com) team.
