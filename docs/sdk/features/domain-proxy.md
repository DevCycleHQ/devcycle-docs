---
title: Domain Proxying
tags: [sdk]
sidebar_position: 7
---

## Overview

When using client-side SDKs, particularly web client SDKs there is the potential for Ad Blockers to block requests and third-party cookies. Custom Domain Proxying with DevCycle ensures all cookies and requests used are first-party and will not be blocked by ensuring requests are sent through your recognized domain. A CNAME hostname and certificate need to be created in order to leverage this feature and both options can be customized if needed.

### Custom Domain Proxy

1. **Identifying a Hostname and Certificate Owner**
- The first step involves **identifying** a hostname to use as the CNAME to DevCycle's service as well as deciding whether you'd like DevCycle to manage a new certificate or manage the certificate yourselves.
- If there is more than one service in use, each one will need a unique CNAME
- If you'd like to create a custom hostname, you'll need to provide us with the hostname. Otherwise, DevCycle will create one for you
- If you need to manage the certificate instead of having DevCycle manage the renewal, you'll need to provide both the Certificate and Private Key for the certificate(s) that you've created

2. **Setup Hostname and Certificate**
DevCycle to start the setup with the certificate and hostname. We can start this process immediately if you do not need to customize your hostname or certificate.

3. **DNS Validation**
Once the setup is complete, two DNS record will be provided by DevCycle and you will need to add those records to your DNS provider (TXT validation records).

4. **Additional Setup Step**
Once validation is complete, there may be an extra step involved here with DevCycle depending on your SDK configuration. DevCycle will let you know if this is needed.

5. **Creating a CNAME**
Once all steps are complete, DevCycle will send the details for the DNS CNAME. Once added, the service will be immediately available at the given hostname. You can use this hostname for all requests to DevCycle instead.

6. **Self-Managed Certificates** 
If you are managing your own certificate, please provide DevCycle with any new certificates ahead of expiration in the future. Failure to do so will result in an invalid certificate error.

If you have any questions regarding this process, please reach out to our [support](mailto:support@devcycle.com) team.

### CNAME Aliasing

Implementing CNAME aliasing can prevent adblockers from blocking requests to our api servers and our SDK. In order to workaround adblockers, please follow the implementation details below to add the `alias_host` start option and update the url to the SDK. In addition, DevCycle also requires a certificate for the domain that you will create a CNAME record for. If you would prefer not to create a certificate and send it to DevCycle, see the “Using a Reverse Proxy” section below.

**1. Setup a CNAME on a DNS which points to our API Domains:**

`https://sdk-api-alias.your-domain.com` -> `https://sdk-api.devcycle.com`

Once you have generated a CNAME, proceed in modifying your existing JS SDK initialization to include the `alias_host` start option. 

**JS SDK Initialization Update**

Add the `alias_host` start option and your CNAME domains

```javascript
const dvcClient = initialize('YOUR_CLIENT_KEY', user, {
    alias_host: {
        api_host: 'https://api-alias.your-domain.com'
    }
});
```


**2. Generate a new Certificate**

You will then need to create a new Certificate for the domain you wish to whitelist. The certificate will contain 4 files, three of which are required: 
- cert.pem*
- privkey.pem*
- chain.pem*
- fullchain.pem

**Required:** cert.pem, privkey.pem, and chain.pem.

To submit your certificate in addition to completing the setup, please contact DevCycke [support](mailto:support@devcycle.com).

---

### Using a Reverse Proxy

Another way to navigate adblockers is to implement a reverse proxy from your server to ours. In this case, rather than using a CNAME to direct traffic from specific subdomains to our SDK API domain, you will need to implement routes on your server that would proxy traffic from your server to ours. Please note: unlike the CNAME option above, this option does not require a certificate to be created.

Below is a sample NginX configuration exemplifying reverse proxies:

```
location /dvc-sdk-api/ {
 proxy_pass https://sdk-api.devcycle.com/;
}
```

Once you have implemented routes on your servers, proceed in modifying your existing JS SDK initialization to include the `alias_host` start option. 

**JS SDK Initialization Update**

Add the `alias_host` start option and your CNAME domains

```javascript
const dvcClient = initialize('YOUR_CLIENT_KEY', user, {
    alias_host: {
        api_host: 'https://api-alias.your-domain.com'
    }
});
```

After completing the steps above, users should be able to freely maneuver around adblockers and prevent them from blocking requests to our api servers and our SDK.
