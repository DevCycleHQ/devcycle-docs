---
title: Variable Schemas
sidebar_position: 7
---

Variable Schemas is a new DevCycle feature that lets you define allowable values for your Variables when creating Feature Variations. Variable Schemas help developers ensure that team members can easily select allowable inputs for Variable values without being nervous that a certain value might cause an application crash or negatively impact end user experience. 

## Defining a Variable Schema

To define a Variable Schema for a Variable, navigate to the Schema section of the Variable Details page to select and define a schema for that particular Variable. Variable Schemas can be added to both associated or unassociated Variables. 

There are three different types of schemas that you can define for your Variable: 

- Enum (*String or Number Variable*)
- Regex (*String Variable*)
- JSON (*JSON Variable*)

Each schema type requires a **Brief Description**. For example, when defining an Enum schema for a String Variable that's meant for a greeting message on a sign up page, a sample description could be “Greeting options for sign-up page.” 

You also must set an **Example Value**. The example value will be used as the initial value for each Variation when adding this Variable to a Feature.

:::caution
You will be unable to define or edit a Schema that makes the associated Feature’s values invalid.
:::

### Enum Schema

An **Enum** schema will allow you to input allowable values for a string or number Variable. 

If “Enum” type is selected, users must define the allowable values in the **Enum Values** input field.

*Enum Example:*
![Enum Schema Example](/june-2023-enum-schema-example.png)

### Regex Schema

A **Regex** schema allows you to define a regex pattern. Variation values for a Variable with a Regex schema type must match the pattern defined in the schema.

*Regex Example:* 
![Regex Schema Example](/june-2023-regex-schema-example.png)

### JSON Schema

A **JSON** schema will allow DVC users to define a JSON schema that Variation values must follow. If the “JSON schema” type is selected, users can define a schema themselves in a JSON editor under the **Manual Entry** tab or have AI define a schema for you under the **AI Generated** tab. 

Examples of JSON Schemas and more information about them can be found [here](https://json-schema.org/learn/miscellaneous-examples.html#basic).

*JSON Example:* 
![Image of generated JSON Schema ](/json-schema-ai-gen-example-complete.png)

#### Manual Entry

JSON Schemas can be created manually by providing it with a Description, the Schema and an example of an acceptable value for your schema. You may find out more about creating Schemas and it’s proper syntax from this page [here](https://json-schema.org/learn/miscellaneous-examples#basic).

![Image of manual entry Schema tab](/json-schema-manual-entry-example.png)

#### AI Generated Schema

JSON Schemas can be created automatically by using DevCycle’s AI Generated Schemas. It works by analyzing the Variable, and it’s values within the Feature it’s used in, and generating a schema based on it’s assumption of what the Variable represents.

To start, you can select to Add or Edit the Variable’s Schema and navigate to the AI Generated tab. Here you can select “Generate with AI” to create a new schema, or “Regenerate with AI” to replace your existing one. 

![Image of AI generated JSON Schema tab](/json-schema-ai-gen-tab.png)

After that, you’ll be asked to select a Variation to choose as a example. This example is shown when you’re creating a new Variation and will pre-populate your Variable value for the new Variation.

![Image of AI generated JSON Schema example value](/json-schema-ai-gen-example-value.png)

AI will now create the Variable Schema for you and all you have to do is hit “Save” to apply your changes. You may also edit the Schema further before saving as you may want to include more possible values or allow/do not allow additional properties to be added via a Feature.

## Adding a Variable with a Defined Schema

Once the Variable is created and a schema has been defined, you can add it to a Feature like any other unassociated Variable and select it from the dropdown in the Add New Variable modal within a Feature. 

![Add Variable Modal with Schema Example](/june-2023-adding-variable-with-schema-modal.png)

If a Variable that has a schema is selected, an info box will appear that outlines the schema type and has the Brief Description of the schema defined on the Variable details page. 

You can also click on the word *"here”* to open a side panel which displays the schema definition along with other details about the Variable. 

![Add New Variable JSON Schema Selected](/june-2023-add-new-variable-json-schema-selected.png)


## Adding a New Variation for Variables with a Defined Schema 

When adding a new Variation for a Variable with a schema, you can click on the Variable name (e.g. *inline-search* in this example) to open a side panel which displays the schema definition along with other details about the Variable. 

![Add New Variable JSON Schema Selected](/june-2023-add-new-variation-with-schema.png)

