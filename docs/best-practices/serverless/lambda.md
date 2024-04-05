---
title: AWS Lambda
sidebar_position: 2
---

## AWS Lambda with DevCycle Feature Flags

DevCycle is purpose-built to work at edge, and just because you're building in serverless environments does not mean you
need to stop using feature flags!

If you're a team on AWS and utilizing AWS Lambda, this document will outline exactly how you can get started with
Feature Flags without any difficulty.

### Example Project for AWS Lambda & DevCycle

To get you up and started, we've put together an example repository to be used to follow along with in this guide

[https://github.com/DevCycleHQ/devcycle-lambda-example](https://github.com/DevCycleHQ/devcycle-lambda-example)

### Setting Up Feature Flags for the Example

1. Create a new feature on the DevCycle Dashboard

   ![Screen Shot 2022-09-13 at 11.05.15 AM.png](/Screen_Shot_2022-09-13_at_11.05.15_AM.png)

2. Choose a Release type, and as per our example code we’ll name this feature `event-type`

   ![Screen Shot 2022-09-13 at 4.30.46 PM.png](/Screen_Shot_2022-09-13_at_4.30.46_PM.png)

3. By default, features will all have a boolean flag. Remove the default boolean flag by clicking the edit button next
   to it and “Delete” in the popped up modal

   ![Screen Shot 2022-09-13 at 4.33.22 PM.png](/Screen_Shot_2022-09-13_at_4.33.22_PM.png)

   ![Screen Shot 2022-09-13 at 4.33.49 PM.png](/Screen_Shot_2022-09-13_at_4.33.49_PM.png)

4. “Add Variable” with `String` type and put in the string as below

   ![Screen Shot 2022-09-13 at 4.35.31 PM.png](/Screen_Shot_2022-09-13_at_4.35.31_PM.png)

5. Scroll down to “Users & Targeting” for whichever environment's server key you selected
6. Change the targeting definition to say: `User ID` `is` `test_1` and **click “Save”**

   ![Screen Shot 2022-09-13 at 4.37.20 PM.png](/Screen_Shot_2022-09-13_at_4.37.20_PM.png)

   Now that the feature is set up, we’ll test it out in Lambda!

### Setting Up AWS Lambda

The
[README in the example repo has more details regarding the Lambda Setup.](https://github.com/DevCycleHQ/devcycle-lambda-example#readme)

1. Clone the [devcycle-lambda-example](https://github.com/DevCycleHQ/devcycle-lambda-example) repo
2. In this example, we are using a **_server_ key.** Copy your server key as the `<DEVCYCLE_SERVER_SDK_KEY>`  in
   the `DVC.initialize` call. [(You can get your Server SDK key from the DevCycle dashboard)](/essentials/keys)

```jsx
const devcycleClient = await DVC.initialize("<DEVCYCLE_SERVER_SDK_KEY>").onClientInitialized();
```

3. Create a new bucket for deployment artifacts by executing `1-create-bucket.sh`

```jsx
devcycle-lambda-example$ ./1-create-bucket.sh
make_bucket: devcycle-lambda-example-940d87e83ef56f53
```

4. Build a Lambda layer that contains the function's runtime dependencies by executing `2-build-layer.sh`. (Packaging
   dependencies in a layer reduces the size of the deployment package that you upload when you modify your code.)

```jsx
devcycle-lambda-example$ ./2-build-layer.sh
```

5. Deploy this application by executing `3-deploy.sh`

```jsx
devcycle-lambda-example$ ./3-deploy.sh
added 16 packages from 18 contributors and audited 18 packages in 0.926s
added 17 packages from 19 contributors and audited 19 packages in 0.916s
Uploading to e678bc216e6a0d510d661ca9ae2fd941  2737254 / 2737254.0  (100.00%)
Successfully packaged artifacts and wrote output template to file out.yml.
Waiting for changeset to be created..
Waiting for stack create/update to complete
Successfully created/updated stack - devcycle-lambda-example
```

6. To invoke the function, execute `4-invoke.sh`

```jsx
devcycle-lambda-example$ ./4-invoke.sh
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
[{
		"user_id":"test_1",
		"clientDate":"2022-04-29T14:18:01Z",
		"target":"my_target","featureVars":{},
		"metaData":{"key":"value","example":123},
		"type":"my-new-event","value":3
},{
		"user_id":"test_2",
		"clientDate":"2022-04-29T14:18:01Z",
		"target":"my_target",
		"featureVars":{},
		"metaData":{"key":"value","example":17},
		"type":"my_event","value":60
}]
```

7. The output should show two events:

   The first event is for the user with `user_id: test_1`. This event should have its type changed to `my-new-event`, as
   the user_id matches the targeting rule, resulting in the variation being ON.

   Let the script invoke the function a few times and then press `CRTL+C`to exit.

8. To delete the application, you can run `5-cleanup.sh`. The cleanup script deletes the application stack, which
   includes the function and execution role, and local build artifacts. You can choose to delete the bucket and function
   logs as well.

```jsx
devcycle-lambda-example$ ./5-cleanup.sh
Deleted devcycle-lambda-example stack.
Delete deployment artifacts and bucket (lambda-artifacts-4475xmpl08ba7f8d)?y
delete: s3://devcycle-lambda-example-940d87e83ef56f53/6f2edcce52085e31a4a5ba823dba2c9d
delete: s3://devcycle-lambda-example-940d87e83ef56f53/3d3aee62473d249d039d2d7a37512db3
remove_bucket: devcycle-lambda-example-940d87e83ef56f53
Delete function logs? (log group /aws/lambda/devcycle-lambda-example-function-1RQTXMPLR0YSO)y
```
