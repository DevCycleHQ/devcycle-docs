---
title: Webhooks
sidebar_position: 1
---

This topic explains how to create and use webhooks in DevCycle.

Webhooks allow you to build your own integrations that subscribe to Feature changes in DevCycle. Use webhooks to update external ticket trackers, notify teammates of new features, targeting changes, and more. 


## Outbound Webhooks

### Creating a Webhook

To create a webhook:

1. Navigate to the Integrations page.
2. Navigate to the "Webhooks" section and click `+ New Webhook`. The "Create a Webhook" modal appears.
4. (Optional) Give the webhook a description. 
5. Enter a Payload URL.
6. Click `Create Webhook`. From there, you will be taken to the Webhook details page. 
7. Select if you'd like events sent for all Features in your project or a single Feature. 
8. Select which events will be sent through the webhook. 
9. Click `Save`. 

### Example Payload 

This is for cases of project level Webhooks where the Feature isn't necessarily implied. 

```json

[
type AuditLogChangeWithId = AuditLogChange & {
	id?: FeatureId | FeatureKey
}

export type AuditLogChange = {
    type: string
    newContents: Partial<HistoryContent> | null
    previousContents: Partial<HistoryContent> | null
    _environments?: string[]
    metadata?: AuditLogMetadata
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
	events: Webhook['events']

	/** 
	 * The key of the Feature 
	 */
	key: FeatureKey

	/** 
	 * The key of the project
	 */
	projectId: ProjectKey

	/**
	 * The version of the payload so we can have different versions
	 * in the future
	 */
	version: string

	/**
	 * The changes that were made
	 */
	changes: AuditLogChangeWithId[]

	/**
	 * The date this Webhook triggered the URL on
	 */
	date: Date

	/**
	 * The user that triggered the change
	 */
	user: User
}
]
```

For example, a user edits a Feature’s key and adds a new variable, the data posted to the user’s Webhook URL would be:

```json
{
	events: ['modifiedFeature', 'addedVariable'],
	key: 'feature-key',
	date: '',
	user: {
		name: 'Jason',
		email: 'jason@email.com'
	},
	version: '1'
	changes: [
		{
				type: 'modifiedFeature',
				newContents: {
					key: 'new-feature-key'
				},
				previousContents: {
					key: 'feature-key'
				}
		},
		{
				type: 'addedVariable',
				newContents: {
					... // new variable object
				},
				previousContents: null
		},
	]
}
```

### Testing a Webhook

To test a webhook:

1. Navigate to the Integrations page.
2. Navigate to the "Webhooks" section.
3. Click the expand arrows next to the Add integration button.
4. Navigate to the Test section of the Webhook details page. 
5. Click `Test Connection` to verify the Webhook Url is accessible. The API response will be displayed below. 


### Deleting a Webhook

To delete a webhook:

1. Navigate to the Integrations page.
2. Navigate to the "Webhooks" section.
3. Click on the Webhook that you wish to delete.
4. Navigate to the Settings section of the Webhook details page. 
5. Click `Delete Webhook`. A confirmation modal will appear.
6. Click `Delete`.

## Incoming Webhooks (Coming Soon)