# Beta Opt-In

## Overview

When you use the Beta Opt-In feature, you give your users the ability to enable or disable specific features themselves using an automatically generated Opt-In component. 

## Usage

### Project Settings

The Opt-In feature has to be enabled for your project first. It can be configured by selecting Beta Opt-in in the sidebar under Settings.

Under the customization settings, there is a preview of the Opt-In component as well as a codeblock with the component inside an iframe.

![image](/opt-in-project-settings.png "Opt-In Project Settings")
![image](/opt-in-component.png "Opt-In Preview")

### Feature Settings

Once Beta Opt-In is enabled for the project, you will be able to enable Opt-In for specific features. From the feature page, toggle on Beta Opt-In under the feature settings section. You will need to specify a Public Feature Name and Public Feature Description which will be displayed to your users. 

![image](/opt-in-feature.png "Opt-In Feature Settings")

### Opt-In Widget 

Your feature will now be listed in your pre-built Beta Opt-In component. You can add this to your app by inserting the iframe component generated on the Project Settings page. You will need to programatically replace '{{unique_id}}' in the generated URL with the active user id, and make sure the environment key matches the current environment. User choices are environment-specific so, for example, an opt-in saved to the development environment key will only be reflected in the development environment. When a user toggles a feature in the Opt-In Widget, their choice will be stored with their user ID and applied across devices. 

![image](/opt-in-iframe.png "Opt-In iFrame")

The iFrame will reflect the logo, header, description, and colors you choose in the Project Settings.
 
![image](/opt-in-example.png "Opt-In Example")

### Feature Targeting

Users who enable a feature through the your Opt-In iframe component are now targetable under the feature's targeting rules. Select 'User Opt-In' as your target definition and then select the variation users should recieve if they have opted into the feature.  

![image](/opt-in-targeting.png "Opt-In Feature Settings")
