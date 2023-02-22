---
title: Custom Domains
tags: [sdk]
sidebar_position: 7
---

## Overview

When using client-side SDKs, particularly web client SDKs there is the potential for Ad Blockers and browser privacy features to block requests and third-party cookies. Custom Domains with DevCycle ensures all cookies and requests used are first-party and will not be blocked by ensuring requests are sent through your recognized domain. A DNS CNAME needs to be created to leverage this feature.

:::info

**Setting Up Custom Domains:**

Custom Domains is an enterprise feature and requires manual setup on both your end as well as DevCycle's. If you are interested in getting set up these docs will guide you through the steps, but please reach out to support@devcycle.com for assistance.

:::

### Custom Certificate
If you'd like to have a custom certificate for the endpoint to be used, please contact your account representative. This requires additional steps that change the flow of this process.

## Setup Steps

1. **Identifying a Hostname**
- The first step involves **identifying** a hostname to use as the CNAME for DevCycle's endpoint. Provide this to DevCycle upon requesting to enable this feature. The hostname should look something like this `https://api-alias.your-domain.com`.
    - If there is more than one service in use, each one will need a unique CNAME. This is also true for using DevCycle on multiple domains. Each domain needs its own CNAME.

2. **DNS Validation**
Once the setup is complete, two DNS records will be provided by DevCycle and you will need to add those records to your DNS provider (TXT validation records). 
- The first DNS record will be a TXT verification record to ensure that you own the domain that you are asking DevCycle to use as a custom hostname.
- The second DNS record will be a TXT verification record to ensure that you have permission to create an SSL certificate for said domain. This record will conflict with any existing A/AAAA or CNAME records on the hostname and require them to be removed before adding the verification record.

Once these records have been added, please let DevCycle know. 

3. **Additional Setup Step**
Once validation is complete and DevCycle has confirmed the records are set properly, there may be an extra step involved here with DevCycle depending on your SDK configuration. DevCycle will let you know if this is needed.

4. **Creating a CNAME**
Once all steps are complete, DevCycle will send the details for the DNS CNAME. Once added, the service will be immediately available at the given hostname.

### SDK Implementation

Once you have completed the above setup to create a CNAME, proceed in modifying your existing JS SDK initialization to include the `alias_host` start option. 

**JS SDK Initialization Update**

Add the `alias_host` start option and your CNAME domains

```javascript
const dvcClient = initialize('<DVC_CLIENT_SDK_KEY>', user, {
    alias_host: {
        api_host: 'https://api-alias.your-domain.com'
    }
});
```

After completing the steps above, users should be able to freely maneuver around AdBlockers and prevent them from blocking requests to our API servers and our SDK.

If you have any questions regarding this process, please reach out to our [support](mailto:support@devcycle.com) team.
