---
title: SDK Release Lifecycle
sidebar_position: 2
---

# SDK Release Lifecycle

DevCycle supports each SDK version according to the policies outlined below. If an SDK is out of support, we recommend
upgrading to a supported version to ensure you have access to the latest features, improvements, and security updates.

We only backport critical bug fixes and security patches to previous major versions of our SDKs. New features and
non-critical bug fixes are only added to the latest major version.

We follow [Semantic Versioning](https://semver.org/) for all our SDKs. This means that version numbers are in the format
of `MAJOR.MINOR.PATCH`, where:

- **MAJOR** version is incremented for incompatible API changes,
- **MINOR** version is incremented for adding functionality in a backwards-compatible manner, and
- **PATCH** version is incremented for backwards-compatible bug fixes and security updates.

For our SDKs, the latest version is defined as the highest MAJOR.MINOR version available. To see the latest version of
each SDK, visit the respective SDK GitHub repository or package manager page in the case of JS/Node SDKs.

## Support Timeline

We actively support the 2 most recent minor versions of each SDK. For example, if the latest versions are 2.1.0 and 2.0.0, both are supported, but 1.9.0 is not. Support includes:

- Bug fixes
- Security patches
- Technical support

Due to the rapid pace of development, we cannot guarantee updates for versions older than the most recent 2 releases. We
recommend upgrading to a supported version to ensure you have access to the latest features and improvements. Critical
Security patches may be backported to older versions at our discretion.

## Upgrade Policy

When a new major version of an SDK is released, we recommend upgrading to the latest version as soon as possible to take
advantage of new features and improvements. If required, we provide detailed release notes and migration guides to
assist with the upgrade process.

## End of Support (EOS)

SDK versions automatically transition to EOS status 6 months after a new major version is released.
When an SDK version reaches its end of support, we cannot guarantee technical support for that
version.

## End of Life (EOL)

SDK versions automatically transition to EOL status 12 months after a new major version is released.
When an SDK version reaches its end of life, we will no longer provide support or updates for that version.

