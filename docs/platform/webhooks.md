---
title: Webhooks
sidebar_position: 7
---

This topic explains how to create and use Webhooks in DevCycle.

Webhooks allow you to build your own integrations that subscribe to Feature changes in DevCycle.
Use Webhooks to update external ticket trackers, notify teammates of new features, targeting changes, and more.

## Outbound Webhooks

### Creating a Webhook

To create a Webhook:

1. Navigate to the Integrations page.
2. Navigate to the "Webhooks" section and click `+ New Webhook`. The "Create a Webhook" modal appears.
3. Give the Webhook a human-readable name.
4. (Optional) Give the Webhook a description.
5. Enter a Payload URL.
6. Click `Create Webhook`. From there, you will be taken to the Webhook details page.
7. Select if you'd like events sent for all Features in your project or a single Feature.
8. Select which events will be sent through the Webhook.
9. Click `Save`.

### Example Payload

Below is the type definition for the payload that gets sent to the Webhook url:

```typescript
/**
 * The 'newContents' and 'previousContents' type is a subset of the resource
 * that was changed
 */
export type AuditLogChange = {
  type: string
  newContents: Record<string, unknown> | null
  previousContents: Record<string, unknown> | null
  _environments?: string[]
  metadata?: Record<string, unknown>
}

type User = {
  name?: string
  email: string
}

type WebhookPayload = {
  /**
   * An array of types that were triggered, the 'changes' property
   * should have all these events in this array
   */
  events: string[]

  /**
   * The key of the Feature
   */
  key?: string

  /**
   * The key of the project
   */
  projectId: string

  /**
   * The version of the payload so we can have different versions
   * in the future
   */
  version: string

  /**
   * The changes that were made
   */
  changes: AuditLogChange[]

  /**
   * The date this Webhook triggered the URL on
   */
  date: Date

  /**
   * The user that triggered the change
   */
  user: User
}
```

For example, a user edits a Feature’s key and adds a new variable, the data posted to the user’s Webhook URL would be:

```json
{
	"events": ["modifiedFeature", "addedVariable"],
	"key": "feature-key",
	"date": "2024-01-16T18:30:42.796Z",
	"user": {
		"name": "Jason",
		"email": "jason@email.com"
	},
	"version": "1"
	"changes": [
		{
			"type": "modifiedFeature",
			"newContents": {
				"key": "new-feature-key"
			},
			"previousContents": {
				"key": "feature-key"
			}
		},
		{
			"type": "addedVariable",
			"newContents": {
				... // new variable object
			},
			"previousContents": null
		},
	]
}
```

### Testing a Webhook

To test a Webhook:

1. Navigate to the Integrations page.
2. Navigate to the "Webhooks" section.
3. Click the expand arrows next to the Add integration button.
4. Navigate to the Test section of the Webhook details page.
5. Click `Test Connection` to verify the Webhook Url is accessible. The API response will be displayed below.

### Deleting a Webhook

To delete a Webhook:

1. Navigate to the Integrations page.
2. Navigate to the "Webhooks" section.
3. Click on the Webhook that you wish to delete.
4. Navigate to the Settings section of the Webhook details page.
5. Click `Delete Webhook`. A confirmation modal will appear.
6. Click `Delete`.

## Inbound Webhooks (Coming Soon)

This feature will allow the user to create Webhook urls for certain actions, like turning on/off a Feature in production.
If you would like this feature, contact product@devcycle.com!
