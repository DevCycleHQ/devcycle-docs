---
title: Self-Hosted Feature Flags with DevCycle
sidebar_position: 3
---

If you are looking for a feature flagging solution there is a chance that you are looking for a solution that is completely self-hosted. Self-hosting is an important feature for many organizations as it provides full control over their infrastructure, typically ensuring enhanced data privacy and compliance, flexibility and control.

The benefits of self-hosting are generally understood, but there are also some important drawbacks to consider when deciding whether or not self-hosting is right for you.

**Benefits of Self-Hosting**

- Data privacy, security and compliance
- Reliability and control
- Flexibility
- Vendor independence

**Drawbacks of Self-Hosting**

- Higher total cost of ownership
- Maintenance overhead
- Upgrade complexity
- Scalability challenges

## The Hybrid Approach

DevCycle's solution focuses on a hybrid approach, where we host the management dashboard, but all of the feature flag decision logic can live within your servers and application. With this approach, you get the best of both worlds, maintaining privacy and compliance, while benefiting from our availability guarantees, upgrade cycle, high quality support and economies of scale to drive down total cost. Below we'll dig into the specifics of how we achieve this.

### Core Components

#### Local Bucketing

DevCycle's Local Bucketing SDKs perform all targeting decisions locally inside the server running the SDK. Upon initialization of the SDK, it will download a DevCycle configuration, and all future SDK calls will determine flag values based on the downloaded data and any locally hosted user data, as opposed to other self-hosted solutions that require network requests in order to retrieve flag values. Accessing flag values through the downloaded DevCycle configuration does not require any network request. Instead, the evaluation will be performed locally on your server, allowing for instantaneous response times and guaranteed reliability on SDK calls to your DevCycle configuration.

Local Bucketing is available on all DevCycle server-side SDKs. Find a list of [SDKs here](https://docs.devcycle.com/sdk/).

Organizations that require strict enforcement of data privacy should consider running DevCycle through an SDK proxy and using private custom data on top of the Local Bucketing SDK. If vendor lock-in or vendor flexibility is a big concern, consider using OpenFeature. More info on those below.

#### SDK Proxy

The SDK Proxy is a service that can be hosted inside your infrastructure to provide a proxy between the DevCycle SDKs and external APIs. The SDK Proxy maintains an up-to-date copy of your DevCycle project's configuration, which can then mimic several DevCycle services, such as the Bucketing API, Event APIs, and configuration CDN. Once implemented, your DevCycle SDK can then be configured to retrieve configs and submit events via the proxy.

Similar to the Local Bucketing SDK, the purpose of the SDK proxy is to maintain a DevCycle configuration on your server so that you can compute flag evaluations in nanoseconds. It also allows you to have a layer of security and control between DevCycle by exposing only a single point of access to DevCycle servers and the ability to precisely control the data that you'd want to be seen by DevCycle.

Find out more on our [SDK proxy](https://docs.devcycle.com/sdk/sdk-proxy/) docs.

#### OpenFeature 

DevCycle is part of the OpenFeature ecosystem which is an open standard that provides a vendor-agnostic, community-driven API for feature flagging. OpenFeature allows you to easily hook up your application to any supported Feature Flagging platform and just as easily migrate off of it. This is achieved through a unified API standard shared across all participating vendors in the ecosystem. An integration with DevCycle's OpenFeature provider gives you access to all of the benefits of running DevCycle standalone, while giving you the flexibility of being vendor independent.

Check out the compatible [DevCycle providers here](https://docs.devcycle.com/integrations/openfeature).

#### Private Data & Event Blocking

All DevCycle SDKs have the option to set private custom data and disable event logging for all users to meet the highest standards of data compliance.

User data provided as `privateCustomData` will be used temporarily to evaluate targeting rules to determine flag values and discarded immediately when it is no longer required. DevCycle never logs or stores private custom data, ensuring you maintain complete control over what data is logged and collected.

Enabling the initialization options `disableAutomaticEventLogging` and `disableCustomEventLogging` will remove all logging that the DevCycle SDK collects. When combined with private custom data, an SDK proxy, and our local bucketing SDKs, you'll receive the maximum level of security and compliance we offer.

A combination of the features listed above gives you complete control over your DevCycle implementation. You can make the choice for your organization on the tradeoff between reporting data and privacy. Whichever combination of options you choose you get all of the benefits of a standard self-hosting solution without the downsides. Specifically, all of the critical DevCycle components, such as the dashboard, CDN, events pipeline, etc will continue to be maintained and upgraded by DevCycle ensuring your feature flagging experience is constantly improving and availability is high.

---

### Key Advantages

#### Data Privacy, Security & Compliance

Data privacy is a big focus for DevCycle, and we give you the tools to decide how much or how little data you want to send us. Even in the most privacy focused organizations, these tools allow first-party customer data to be used for targeting purposes in a completely secure way. You can leverage Local-Bucketing SDKs, Private Custom Data and Event Blocking to customize your DevCycle implementation based on your compliance needs.

#### Performance Optimization

The architecture of our Local Bucketing SDKs allows all flag evaluations to be done locally on your server and/or application since it maintains an up-to-date version of your DevCycle configuration. This ensures that flag evaluations on Local Bucketing SDKs are instant, up to nano-second response times.

#### Reliability and Uptime

Both the SDK Proxy and Local Bucketing SDK store local versions of your DevCycle configuration on your server or application that can be accessed by a device or application when service is interrupted. This ensures the continuous availability of your Project and Features even during service disruptions or failures. You can also benefit from our SLAs and uptime guarantees for any service hosted by DevCycle to ensure better uptime with less overall cost than you can expect from self-hosting.

#### Scalability

Using Cloudflare's cloud worker technology, DevCycle's architecture allows it to scale to meet your organization's demands. The DevCycle CDN is globally replicated to allow DevCycle requests to be sent and received from the nearest host instance ensuring the fastest speed of delivery. Updates made to your flags are also delivered immediately through the same technology. By using DevCycle's solution, you can safely and securely leave the platform's management, storage, and maintenance to us so that you can focus on building your functionality and delivering value to your customers.

#### Lower Total Cost of Ownership

It may seem appealing at first to self-host, assuming that you can manage it in a more cost-effective manner. At DevCycle we aim to pass on the affordability that we get from our modern architecture as well as our economies of scale. We deliver trillions of flag evaluations daily, meaning, whether you're using our Local-Bucketing SDKs or making requests to our CDN we can provide those services in a highly cost-effective way.

#### Vendor Independence

Vendor lock-in can be frustrating as the cost and effort of moving off a Feature Flagging platform can be challenging. By adopting the OpenFeature standard, you can mitigate that risk and choose the platform that best suits your needs at any given time. OpenFeature SDKs share a universal API that works across all Feature Flagging platforms that have opted into the ecosystem, allowing you to easily switch between providers. DevCycle is part of the this ecosystem and are strong supporters of the OpenFeature movement boasting support for all stable versions of the OpenFeature SDKs. 

## Conclusion

DevCycle's hybrid approach to self-hosting offers organizations the best of both worlds - the control, security, and performance benefits of self-hosting, combined with the ease of management and scalability that comes with a managed solution. Through Local Bucketing SDKs, SDK Proxy options, and private custom data handling, organizations can maintain complete control over their data while leveraging DevCycle's powerful feature management capabilities. 

By choosing DevCycle's solution, organizations can focus on building and deploying features rather than managing infrastructure, all while maintaining the highest standards of data security and system performance. This balance of control and convenience makes DevCycle an ideal choice for organizations seeking the benefits of self-hosting without its traditional complexities.