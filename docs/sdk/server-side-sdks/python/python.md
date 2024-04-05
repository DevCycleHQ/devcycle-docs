---
title: Python SDK
---

import CustomDocCardList from '@site/src/components/CustomDocCardList' import {useCurrentSidebarCategory} from
'@docusaurus/theme-common';

# DevCycle Python Server SDK

Welcome to the DevCycle Python Server SDK. There are two modes for the SDK, Local Bucketing (using the local bucketing
engine) and Cloud bucketing (using the [DevCycle Bucketing API](/bucketing-api/#tag/devcycle)).

We recommend using the Local Bucketing mode by default, as it performs fast local evaluations of your feature flags. If
you need access to [EdgeDB](https://docs.devcycle.com/extras/edgedb) you will need to use the Cloud Bucketing mode of
the SDK.

<CustomDocCardList items={useCurrentSidebarCategory().items} columnWidth={4} />

The SDK is available as a package on PyPI. It is also open source and can be viewed on Github.

[![PyPI](https://badgen.net/pypi/v/devcycle-python-server-sdk)](https://pypi.org/project/devcycle-python-server-sdk/)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/python-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/python-server-sdk)
