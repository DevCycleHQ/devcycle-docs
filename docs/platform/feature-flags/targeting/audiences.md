---
title: Audiences
sidebar_position: 2
---

This topic explains how to create and manage Audiences via our API or within the DevCycle dashboard. 

Audiences allow you to define an audience using filters, and then reuse the audience in user targeting for features.  Audiences are lists of users, defined by “filters” that you can use to manage flag targeting behaviour in bulk. Audiences are useful for managing groups of users, like `internal-users` or `loyalty-tier-gold`. 

## Creating an Audience

### From the API

The first step is to create an audience through the Management API:

```jsx
curl --location 'https://api.devcycle.com/v1/projects/{project-key}/audiences' \
--header 'Authorization: Bearer $TOKEN'
--header 'Content-Type: application/json' \
--data '{
    "name": "Reusable-Audience",
    "key": "reusable-audience",
    "description": "A reusable audience!",
    "filters": {
        "filters": [
            {
                "type": "user",
                "subType": "user_id",
                "comparator": "=",
                "values": [
                    "my-user"
                ]
            }
        ],
        "operator": "and"
    }
}'
```
This will return you a response of the created resource which includes an `_id` field which will be used to include the Audience in the targeting rules of your feature.

*Refer to the [Management API docs](https://docs.devcycle.com/management-api/#operation/AudiencesController_create) for more information.*

To use your new audience in a feature, you must use the [Feature Configuration](https://docs.devcycle.com/management-api/#tag/Feature-Configurations) endpoint to update the targeting rules:

```jsx
curl --location --request PATCH 'https://api.devcycle.com/v1/projects/{project-key}/features/{feature-key}/configurations?environment={environment-key}' \
--header 'Authorization: Bearer {token}' \
--header 'Content-Type: application/json' \
--data '{
    "targets": [
        {
            "name": "Feature Enabled",
            "distribution": [
                {
                    "percentage": 1.0,
                    "_variation": "variation-a"
                }
            ],
            "audience": {
                "name": "Reusable Audience",
                "filters": {
                    "filters": [
												// Audience Match Filter
                        {
                            "type": "audienceMatch",
                            "comparator": "=",
                            "_audiences": [
																// Audience _id from creating a reusable
																// audience from the Management API
                                "63dd5a34cf6c623a40078a32"
                            ]
                        }
                    ],
                    "operator": "and"
                }
            }
        }
    ],
    "status": "active"
}'
```

Under the `filters` array, you can list an `Audience Match` filter that is used to reference any Audiences in the `_audiences` array by `_id`.

You will see this in the Targeting Rules section of the feature page as a **read-only** field:
![Read-only resuable audience in feature dashboard](/march-1-2023-readonly-resuableaudience.png)

### From the Dashboard

When Audiences have been enabled for your organization, you will see an Audiences tab at the top of your navigation bar. Here you will be able to view all Audiences that have been created within your project.

![Audiences Tab](/july-2023-audiences-tab-example.png)

To create a new Audience within the DevCycle Dashboard:
1. Navigate to the **Audiences** tab.
2. Click **Create New Audience** and the Create New Audience modal will appear. 
![Create New Audience Modal](/july-2023-create-audience-modal-filled.png)
3. Give your segment a human-readable **Audience Name**.
4. Enter an **Audience Key** for this Audience (this field auto-populates based on the Audience Name, but you can change it if you need to) 
5. *(Optional)* Add a **Description**.
6. *(Optional)* Add **Tags**.
7. Click Create and you’ll be taken to your newly created Audience details page. The Info section will have the same details that you entered into the modal. 
![Audience Details Page](/july-2023-audience-editing-page.png)
8. Scroll down or click on Definition in the side bar. Click `Define Audience` and the same interface that is used to create targeting rules will appear. We have also introduced the ability to have top-level ORs within an Audience. 
![Audience Definition](/july-2023-audience-definition-OR-callout.png)
9. Define your Audience. 
![Audience Definition](/july-2023-audience-definition.png)
10. Click Save at the top of the page when complete. 
11. You can now use this Audience when defining a Targeting Rule within a Feature

In addition to the Audience Info & Definition, in the Feature Usage secion for the Audience Detials page you will also be able to view the Features that are actively using that Audience.

![Audience Details Page Feature Usage](/july-2023-audience-details-page-feature-usage.png)

## Updating Audiences 

To see all your created Audiences, click the Audiences tab on the navigation bar: 
![Audiences Tab](/march-1-2023-audiences-tab.png)

This lists all Audiences created through the Management API. At the moment, the audiences can only be modified through the Management API. As such, all the Audiences on this page are **read-only**.

To view more information about the Audience, click the `View Definition` button to see more:
![Audiences Tab](/march-1-2023-resuableaudience-viewdefinition.png)

If you wish to update or edit an active Audience, a warning message will appear that displays all Features that are actively using that Audience. 

![Audience Editing Active Audience Pop-up](/july-2023-audience-details-page-editing-active-audience.png)


## Using an Audience

Once you've created an Audience, you will now be able to use it in a Targeting Rule for one or multiple features. 

To use an Audience in a Targeting Rule: 

1. Navigate to the Users & Targeting section of a feature page

2. Give your Targeting Rule a descriptive Name. 

3. Open the user property dropdown, and select **Audience**

![Audience Targeting Rule User Property Dropdown](/july-2023-targeting-rule-filter-audience.png)

4. Choose a comparator. 

![Audience Targeting Rule Comparators](/july-2023-targeting-rule-audience-comparator.png)

5. Choose the Audience(s) that you would like to use in this targeting rule. When multiple Audiences are selected within the same rule, they audiences will act like a a top-level OR, e.g. if the user/target is in `audience-1` or `audience-2`. 

![Audience Targeting Rule Dropdown](/july-2023-targeting-rule-audience-dropdown.png)

6. Choose a variation to serve. 

7. *(Optional)* Choose a schedule. 

8. Click Save at the top of the page when complete.
