---
title: Variable Schemas
sidebar_position: 3
---

Variable Schemas is a new DevCycle feature that lets you define allowable values for your variables when creating feature variations. Variable Schemas help developers ensure that team members can easily select allowable inputs for variable values without being nervous that a certain value might cause an application crash or negatively impact end user experience. 

## Defining a Variable Schema

To define a Variable Schema for a variable, navigate to the Schema section of the Variable Details page to select and define a schema for that particular variable. Variable Schemas can be added to both associated or unassociated variables. 

There are three different types of schemas that you can define for your variable: 

- Enum (*String or Number Variable*)
- Regex (*String Variable*)
- JSON (*JSON Variable*)

Each schema type requires a **Brief Description**. For example, when defining an Enum schema for a String variable that's meant for a greeting message on a sign up page, a sample description could be “Greeting options for sign-up page.” 

You also must set an **Example Value**. The example value will be used as the initial value for each variation when adding this variable to a feature.

:::caution
You will be unable to define or edit a Schema that makes the associated Feature’s values invalid.
:::

An **Enum** schema will allow you to input allowable values for a string or number variable. 

If “Enum” type is selected, users must define the allowable values in the **Enum Values** input field.

*Enum Example:*
![Enum Schema Example](/june-2023-enum-schema-example.png)


A **Regex** schema allows you to define a regex pattern. Variation values for a variable with a Regex schema type must match the pattern defined in the schema.

*Regex Example:* 
![Regex Schema Example](/june-2023-regex-schema-example.png)

A **JSON** schema will allow DVC users to define a JSON schema that variation values must follow. If “JSON schema” type is selected, users can define the schema below in a JSON editor. Example JSON Schemas and more information about them can be found [here](https://json-schema.org/learn/miscellaneous-examples.html#basic).

*JSON Example:* 
![JSON Schema Example](/june-2023-json-schema-example.png)

Once a variable is created and schema has been defined, click save and then you can add this variable to a feature. 

## Adding a Variable with a Defined Schema

Once the variable is created and a schema has been defined, you can add it to a feature like any other unassociated variable and select it from the dropdown in the Add New Variable modal within a feature. 

![Add Variable Modal with Schema Example](/june-2023-adding-variable-with-schema-modal.png)

If a variable that has a schema is selected, an info box will appear that outlines the schema type and has the Brief Description of the schema defined on the Variable details page. 

You can also click on the word *"here”* to open a side panel which displays the schema definition along with other details about the variable. 

![Add New Variable JSON Schema Selected](/june-2023-add-new-variable-json-schema-selected.png)


## Adding a New Variation for Variables with a Defined Schema 

When adding a new variation for a variable with a schema, you can click on the variable name (e.g. *inline-search* in this example) to open a side panel which displays the schema definition along with other details about the variable. 

![Add New Variable JSON Schema Selected](/june-2023-add-new-variation-with-schema.png)

