---
title: Variable Defaults
sidebar_position: 3
---

Variable defaults are the values you provide in code which tell DevCycle SDKs what value to assign to a Variable in
cases where a different value is not available.

It's worth understanding which scenarios a Variable will be defaulted in, as this can differ from other Feature Flagging
platforms.

:::info
If you'd like to understand the underlying cause—such as type mismatches, config issues, or fallback behavior—see our [Evaluation Reasons](/sdk/features/#evaluation-reasons) section.
:::

## When is the default value used?

### Configuration Not Available

If the SDK has not yet received a configuration from DevCycle, it will return the default value for a Variable
as defined in code.

SDKs will attempt to retrieve the configuration until an error is received or a timeout is reached. In these cases,
the configuration will not be obtained and default values will be used for the duration of the SDK instance's lifetime.

### Type Mismatches

In many SDKs, the type of the default value (Boolean, String etc.) determines the "expected" type of the Variable.
On the DevCycle platform, a Variable is configured to have a specific type, and a Feature controls the values of that
given type to assign to the Variable.

But what if the type as defined in DevCycle does not agree with what your code expects? In that scenario, DevCycle
will defer to the code's expected type by preserving the default value and not attempt to override it with the value
from the configuration. This behaviour ensures that the SDK will not cause runtime errors due to type mismatches.

For example, if a Variable is being evaluated in code and the Boolean value `false` is provided as a default value,
the SDK will understand that that Variable should always be a Boolean. If the DevCycle configuration serves a String
value instead, the SDK will ignore it and use the default value of `false` instead.

### Variable Does Not Exist

In cases where the Variable does not exist in the DevCycle platform, the SDK will use the default value provided in code.

### User Does Not Qualify for Targeting, or Feature is Turned Off

In DevCycle, the values of Variables are controlled by Features. Those Features contain Targeting Rules that determine who
is eligible to receive the Feature, and what Variation they should be served. In cases where a user qualifies for a Feature,
the DevCycle configuration will include the Variable values they should be served.

However, if a user does not qualify for a Feature, the Variables it contains will not be given any values in the configuration.
Instead, the SDK will continue to serve the default value as defined in code.

The same is true if a Feature has targeting turned "off" in an environment. The DevCycle platform treats that Feature as essentially
having no effect on the configuration.

This behaviour differs from other Feature Flagging platforms, where you often need to define a "fallback" value that
the platform should serve in cases where no other value has been specified.

We took a different approach, because we believe that the default value in your code is more important than that.
It should always represent a valid value for your application, and usually represents the state the application should
be in if no other rules have been applied to modify its behaviour. By making the default value more than just a "once in a million"
value used when DevCycle is unreachable, we want to encourage developers to treat it as the "baseline" value representing
what users should receive unless otherwise specified by a Feature. We believe this will lead to an approach to feature flagging
where applications are more likely to behave as expected in the very unlikely chance that DevCycle _is_ unreachable,
and also make it easier for developers to reason about the behaviour of an application without having to refer to the DevCycle
dashboard to determine the "baseline" value.

It is always still possible to define your own "fallback" value in the DevCycle platform by adding a final Targeting Rule to a Feature that targets
"All Users" and serves your intended "fallback" variation.
