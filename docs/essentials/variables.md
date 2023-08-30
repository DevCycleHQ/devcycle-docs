---
title: Variables
sidebar_position: 6
---

Variables are the elements that can change within a Feature. 

> For example, if you have a Feature that controls a new UI element, a Variable could be the color of that element. 

By default, upon creation of a Feature, a `Boolean Variable`` will be created which has the same name as the Feature's key for easier reference. 

:::tip Already understand the variable essentials?
Be sure to check out our advanced variable documentation which covers topics like:
- [Variable Schemas](/extras/advanced-variables/variable-schemas)
:::
---

## Managing Variables


### From the CLI

Once you have installed and authorized the CLI, select your relevant organization and project then run one of the following commands depending on your use case:

To retrieve all variables for a project from the management API.

```bash
dvc variables get
```  
You should be presented with something which looks like the following (which represents three existing variables named `variable-alpha`, `variable-beta` and `feature-b` with the first two active and the final archived.):

```json

[
  {
    "_id": "q1w2e3r4t5y6u7i",
    "_project": "p0o9i8u7y6t5",
    "name": "feature-b",
    "key": "feature-b",
    "type": "Boolean",
    "status": "archived",
    "defaultValue": false,
    "source": "dashboard",
    "_createdBy": "google-oauth2|113009494912133793971",
    "createdAt": "2023-07-26T20:51:59.421Z",
    "updatedAt": "2023-07-26T21:01:17.592Z"
  },
  {
    "_id": "q1w2e3r4t5y6u7i",
    "_project": "p0o9i8u7y6t5",
    "_feature": "e3r4t5y6u7u7",
    "name": "Variable Beta",
    "key": "variable-beta",
    "description": "New String Variable",
    "type": "String",
    "status": "active",
    "source": "cli",
    "_createdBy": "google-oauth2|q1w2e3r4t5",
    "createdAt": "2023-07-26T20:46:49.209Z",
    "updatedAt": "2023-07-26T21:07:23.402Z"
  },
  {
    "_id": "q1w2e3r4t5y6u7i",
    "_project": "p0o9i8u7y6t5",
    "_feature": "e3r4t5y6u7u7",
    "name": "Variable Alpha",
    "key": "variable-alpha",
    "description": "",
    "type": "Boolean",
    "status": "active",
    "source": "dashboard",
    "_createdBy": "google-oauth2|q1w2e3r4t5t",
    "createdAt": "2023-07-26T20:28:03.057Z",
    "updatedAt": "2023-07-26T21:04:17.638Z"
  }
]
```

To list the keys of all variable in a project enter:
```bash
dvc variations list
```
You should be presented with something which looks like the following:
```json
[
  "feature-b",
  "variable-beta",
  "variable-alpha",
]
```

### From the Dashboard

To view the Variables and Variations within a Feature, navigate to the 'Variables' section on a Feature page sidebar. This will lead the user to a table containing all of the Variables used by this Feature and all of their values across all Variations:

Each Feature manages its own set of Variables. **By default, upon creation of a Feature, a Boolean Variable will be created which has the same name as the Feature's key for easier reference.** 

Depending on the Feature type, the default Variations will be pre-set. The most common of which will be the Variations of "Variation OFF" and "Variation ON", with the boolean Variable being set to false and true, respectively.

:::info
For more information on variations please visit the [variations section](/essentials/variations) of the documentation.
:::

#### Global Variables Dashboard

You can also view variables through the Variables dashboard, a collection of all Variables used within a project on a single list. In more complex or longer running projects, the Variables dashboard is useful to quickly find exactly what Feature is controlling a Variable (if any). 

To navigate to this page, use the `Variables` button on DevCycle dashboard's top bar, which will lead you to the Variables list which will show:

|        |                            |
|--------|----------------------------|
| **Variable Name** | The name given to the Variable upon its creation |
| **Feature** | The name of the Feature that is currently managing a variable. **Note** that Variables can only be managed by a single Feature at a time. If you wish to change what Feature is managing a Variable, first remove that Variable from a feature as outlined in [Creating Variables and Variations](/essentials/variables). If the Variable is NOT being managed by a Feature, this column will note the lack of Feature. **Click on a Feature name to navigate directly to the Feature managing this Variable** |
| **Type** | The type of the feature flag. This type can one of: Boolean, JSON, Number, Boolean, or String. |
| **Created At** | The time this Variable was first created. |


##### Variable Details

To access variable details, click "View Info" on the Variables list page for your Desired Variable. This page contains two sections:

| Section | Description |
|---------|-------------|
| **Variable Info** | This section allows for the modification of the display name of the Variable, as well as the ability to provide a more detailed description of the Variable. |
| **Code References** | The Code References section is a collection of all of the areas within your codebase this Variable is actually being referenced, with a link out to the exact location within your GitHub codebase.  |

:::info

To use the Code Refs feature, the [DevCycle action for Code References](/integrations/github/gh-feature-usage-action) must be enabled within your repository.

:::



---

## Creating a New Variable


### From the CLI

Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc variables create
```
You will be prompted to set a Name, Key, Description (Optional), Type of Variable (String, Boolean, Number or JSON) and the feature to which you would like to assign the variable. 

If successful you will receive something which resembles the following (which demonstrates creating a new `string` variable called `variable-beta` and adding it to the feature named `feature-a`):

```json
{
  "_id": "q1w2e3r4t5y6u7i",
  "_project": "p0o9i8u7y6t5",
  "_feature": "e3r4t5y6u7u7",
  "name": "Variable Beta",
  "key": "variable-beta",
  "description": "New String Variable",
  "type": "String",
  "status": "active",
  "source": "cli",
  "_createdBy": "google-oauth2|q1w2e3r4t5y6ui8",
  "createdAt": "2023-07-26T20:46:49.209Z",
  "updatedAt": "2023-07-26T20:46:49.209Z"
}
```


### From the Dashboard

A user can add as many Variables as they desire by simply clicking the "Add Variable" button. 

Give your new Variable a **key**, a **type**, and its **values** for each of the current Variations.

The unique Variable **key** is used to reference the Variable in code. Variables cannot be used in multiple existing Features, so their keys must be unique.

The Variable **Type** helps enforce consistent usage across the team to avoid type mismatches in different use cases.

Variables may be the following types:

* Boolean
* String
* Number
* JSON

The Variable **Values** for each **Variation** will be what the Variable's value will be in SDK and API responses if a targeting rule is targeting those specific Variations. 

:::caution
For JSON variables, the only allowable **Values** are JSON objects with key-value pairs. 
:::

---

## Updating a Variable

### From the CLI
Once you have installed and authorized the CLI, select your relevant organization and project then run the following command:

```bash
dvc variable update
```
You will be prompted to select a variable you would like to update, and can update the name, description or associated feature (not current working), then will receive a response which resembles something like is found below (which demonstrates changing the name of a variable named `Variable Beta` to `Variable Beta (Renamed)`):

```json
{
 "_id": "q1w2e3r4t5y6u7i",
  "_project": "p0o9i8u7y6t5",
  "_feature": "e3r4t5y6u7u7",
  "name": "Variable Beta (Renamed)",
  "key": "variable-beta",
  "description": "New String Variable",
  "type": "String",
  "status": "active",
  "source": "cli",
  "_createdBy": "google-oauth2|113009494912133793971",
  "createdAt": "2023-07-26T20:46:49.209Z",
  "updatedAt": "2023-07-26T21:06:30.024Z"
}
```

### From the Dashboard

DevCycle allows users to edit the Variable Type of existing variables. We understand the importance of type-safety in variable management in addition to having flexibility when creating & editing variables. As such, editing unassociated variable versus associated variables differs slightly so you have as much context as possible on the ramifications of changing a variable type & its impact on your code.

#### Unassociated Variables

To edit an unassociated Variable, navigate to the Variable Details page of the variable you want to edit and select the new type from the dropdown.

#### Associated Variables
If a variable is currently associated with a feature, changes to the Variable Type must be done on the associated feature page. Once on the feature page, click on the edit icon next to the variable key and select a new Variable Type from the dropdown and click Update. 

:::caution
Be cautious when editing variable types as any code that is evaluating this variable must also be updated to expect the new type. A mismatch in variable types between the dashboard and your code will result in your code always returning the default value. 
:::

---

## Removing a Variable

### From the CLI

:::caution
Variable removal is currently unavailable through the CLI.
:::

### From the Dashboard

To remove a Variable from a feature, simply click on the edit icon next to the variable key and select the option to remove the variable from the variable edit modal.

Removing a Variable from this page does not completely remove the Variable from DevCycle. The Variable will still be visible in the [Variable Dashboard](#variables-dashboard), but it will not be associated with any features.

Taking this action will cause all references to the Variable in any code usage to default only to the default value used in your codebase.

:::info
To fully delete a Variable you must do so via our [Management API](/management-api/#operation/VariablesController_remove).
:::


---

## Archiving a Variable

### From the CLI

:::caution
Variable archiving is currently unavailable through the CLI.
:::

### From the Dashboard

Archiving Variables is a good way to clean up the DevCycle dashboard and ensure that it is easy to understand which Variables are available for use and which should no longer be leveraged going forward.

To archive a Variable it must first be [removed from any active features](#removing-a-variable). Variables can be archived at the same time as removing from a feature. When the option to remove has been selected the confirmation modal will also provide the option to archive the Variable.

If a Variable is not archived when it is removed from a feature it will remain active, but it won't be associated with any features and the default value will be delivered whenever the Variable is evaluated in code. If you are archiving a Variable from the Variable list or Variable details page, the Variable must be in this unassociated state.

When archiving a Variable from the Variable list or details page you will need to confirm your desire to archive by entering the Variable's key in the archive confirmation modal.

Once archived, Variables can be viewed by toggling the Variable status filter to either All or Archived Variables on the Variable list page. From here Variables can also be unarchived if desired.

---

## Re-associating a Variable

### From the CLI

:::caution
Variable re-association is currently unavailable through the CLI.
:::

### From the Dashboard

DevCycle has the ability to re-use existing variables and re-associate them to different features. 

In the Variable Key input field, a drop down will display all **unassociated, unarchived** variables that can be re-associated to your feature while also providing you the option to add a net new variable.

If you select an existing, unassociated variable from the dropdown, the Variable type will be populated with the type of the selected variable and cannot be changed. 

If you input a variable key that matches an existing archived variable, the error below will appear, as you must first unarchive the variable.

To use it, click the hyperlinked "**variable**" text, and you'll be directed to the archived variable page where you can unarchive it.

:::info
If you want to move a variable between features, you must first remove it from the previous feature, making it unassociated.
:::


