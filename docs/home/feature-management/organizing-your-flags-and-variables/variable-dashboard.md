---
title: The Variable Dashboard
sidebar_position: 4
---

## Overview

This article serves to describe the Variables page and its uses. For deeper information on creating and managing Variables within a feature, read [Creating Variables and Variations](/docs/home/feature-management/features-and-variables/creating-variables-and-variations). 

### Using the Variables Page

The Variables page is a collection of all Variables used within a project on a single list. In more complex or longer running projects, the Variables dashboard is useful to quickly find exactly what Feature is controlling a Variable (if any). 

To navigate to this page, use the variables button on DevCycle dashboard's top bar:

![DevCycle Dashboard top bar with arrow pointing to Variables Dashboard button](/variable-button.png)

This will lead you to the Variables list:

![Variables dashboard page with list of variables as well as search functionality](/variables.png)

The list will show:

* **Variable Name**
    
    The name given to the Variable upon its creation

* **Feature**
    
    The name of the Feature that is currently managing a variable. **Note** that Variables can only be managed by a single Feature at a time. If you wish to change what Feature is managing a Variable, first remove that Variable from a feature as outlined in [Creating Variables and Variations](/docs/home/feature-management/features-and-variables/creating-variables-and-variations). If the Variable is NOT being managed by a Feature, this column will be blank. **Click on a Feature name to navigate directly to the Feature managing this Variable**

* **Type**

    The type of the feature flag. This type can one of: Boolean, JSON, Number, Boolean, or String.

* **Created At**

    The time this Variable was first created.


