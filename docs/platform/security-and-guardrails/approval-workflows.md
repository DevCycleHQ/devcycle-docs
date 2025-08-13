---
title: Approval Workflows
sidebar_position: 1
---

# Approval Workflows

:::info
Approval Workflows are an Enterprise feature. To learn more, read about our [pricing](https://devcycle.com/pricing). To upgrade your plan, please contact your Account Manager or our [Sales](mailto:sales@devcycle.com) team. 
:::

With Approval Workflows, when a DevCycle user wants to change a Feature, they must request a review and approval from a Publisher within their DevCycle organization. Approval Workflows give people greater visibility on Feature changes and act as a safeguard for your team. These review-style approvals mirror common code review workflows, such as pull request (PR) reviews in GitHub. 

Anyone with a Publisher, or Owner role can approve a Change Request, regardless of whether or not their review has been requested. Publishers whom the requester selects receive an email notifying them that their review has been requested, as well as an in-dashboard notification on DevCycle's homepage.

The following actions do not trigger an approval request:
* Self-Targeting
* Adding or removing Metrics

## Setting Up Approval Workflows for a DevCycle Project

:::info
[Permissions](/platform/security-and-guardrails/permissions) must be enabled for Organizations to use Approval Workflows. Please contact our [support](mailto:support@devcycle.com) team to get started with Permissions if you wish to use this feature.  
:::

Approval Workflows are a Project-level setting within DevCycle. 

To enable Approval Workflows in a project: 

1. Navigate to your chosen Project's settings page and find the Approval Workflows section. 
2. Select `Enabled` from the dropdown. 
3. You may also choose whether Publishers can skip the approval process and save changes directly without requiring review from another teammate. 
4. Click `Save` and Approval Workflows will now be active for that project. 

![Project Settings for Approval Workflows](/july-2024-project-settings-approval.png)

## Requesting a Review for a Change Request

Once Approval Workflows have been enabled, every team member, regardless of their permission level, will require approval on Feature changes in <b> all environments </b> from a Publisher or Owner within your DevCycle organization. 

1. Once you've made your desired Feature changes, click on the `Submit Change Request` button at the top-right corner of the Feature page. 
2. Review and confirm the changes displayed in the Review Change modal.
3. Enter a brief description that helps your reviewers understand the changes you made.
4. Select one or more reviewers from the Reviewers menu and click Submit. 

![Submit Change Request Modal](/july-2024-submit-cr.png)

After the Change Request is submitted, the Feature form will be locked for <b> all users </b> until the active Change Request is approved, rejected, or canceled. 

Members who do not have permission to approve requests can still view the Change Request at the top of the Feature form. 

![Active Change Request on Feature Form](/july-2024-active-change-request-feature-form.png)

## Force Applying a Change Request as a Publisher

Force applying changes to bypass the review process for Publishers is only available if the <b> "Publishers can skip the review process" </b> setting has been turned on for your Project. This feature is intended to reduce friction for users who have publishing permissions. 

The button `Force Apply` will appear on the Change Request modal for these users. 

If a user chooses to `Force Apply` then they are required to include a change description, however they cannot select other reviewers. 

![Force Apply Change Request Modal](/july-2024-force-apply..png)

## Approving or Rejecting a Change Request

1. If selected by the requester, reviewers receive an email, an in-app dashboard notification on the Homepage informing them approve your Change Request. Click `Review Change Request` button on the email or navigate to the Feature page.  
2. Once on the Feature Page, click `Review Change Request` to open up the Review Change Request modal. 

![Approve & Apply Change Request](/july-2024-approve-apply-change-request.png)

3. If you `Approve and Apply Changes`, the proposed changes will be saved immediately. 
4. If you `Reject` the Change Request, you will need to provide a reason for the rejection that will be sent back to the requester via an email notification. 

![Reject Change Request](/july-2024-reject-change-request.png)

*Note: Anyone with a Publisher, or Owner can approve a Change Request, regardless of whether or not their review has been requested.


## Cancelling a Change Request 

As the requester, you can cancel your Change Request in the Review Change Request modal and clicking on `Cancel Request`.

![Cancel Change Request](/july-2024-cancel-change-request.png)



