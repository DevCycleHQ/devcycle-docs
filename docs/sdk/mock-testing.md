---
title: Mock Testing with DevCycle
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Mock testing allows you to test your application's behavior with specific Feature and Variable configurations without making API calls to DevCycle. This enables faster, more reliable tests that don't depend on external services.

## Mock Testing Strategy

The general testing strategy we'd recommend is to mock DevCycle's Variable and Variable value calls as opposed to mocking the full DevCycle client. To achieve this, you'd want to perform network level mocking to intercept the Variables or Variable by key requests to provide your own Variable response.

## Server-Side SDKs: Cloud Bucketing

DevCycle's Server-side SDKs can operate on Cloud or Local Bucketing modes. We'd recommend using Cloud Bucketing for mock testing. Cloud Bucketing uses the [DevCycle Bucketing API](/bucketing-api/#tag/Bucketing-API) behind the scenes to fetch and retrive Variable values. You may mock the response of the `Get Variable by Key` or `Get Variables` endpoints in order to replicate the output of your Server-side SDK.

### Setup

The SDK Key does not need to be a valid SDK key, but it needs to be in a correctly formatted starting with `dvc_server` or `server`.

<Tabs>
  <TabItem value="python" label="Python (unittest)">

  ```python
  def setUp(self):
    self.sdk_key = "dvc_server_test_key_12345678"
    self.bucketing_api_base = "https://bucketing-api.devcycle.com"
    self.options = DevCycleCloudOptions(
      bucketing_api_uri=self.bucketing_api_base,
      request_timeout=5,
      request_retries=0,
    )
    self.client = DevCycleCloudClient(self.sdk_key, self.options)

  def tearDown(self):
    if self.client:
      self.client.close()
    responses.reset()

  def _get_variable_url(self, key: str) -> str:
    """Get the URL for a single variable request"""
    return f"{self.bucketing_api_base}/v1/variables/{key}"

  def _get_variables_url(self) -> str:
    """Get the URL for all variables request"""
    return f"{self.bucketing_api_base}/v1/variables"
  ```
  </TabItem>
</Tabs>

### Variable and VariableValue Test

Test retrieving a Variable value through the `.variable()` or `.variableValue()` method.
<Tabs>
  <TabItem value="python" label="Python (unittest)">

  ```python
  def test_variable_value_string(self):
    """Test variable_value() with a string variable"""
    variable_key = "string-test-var"
    expected_value = "var-on"
    
    responses.add(
      responses.POST,
      self._get_variable_url(variable_key),
      json={
        "_id": "12345",
        "key": variable_key,
        "type": "String",
        "value": expected_value,
        "eval": {
          "reason": "TARGETING_MATCH",
          "details": "All Users",
          "target_id": "54321"
        }
      },
      status=200,
    )

    user = DevCycleUser(user_id="test-user-123")
    result = self.client.variable_value(user, variable_key, "default-value")

    self.assertEqual(result, expected_value)
    # Verify the request was made
    self.assertEqual(len(responses.calls), 1)
    self.assertEqual(responses.calls[0].request.method, "POST")
  ```
  </TabItem>
</Tabs>

### AllVariables Test

Test retrieving all active Variables through the `.allVariable()` method.
<Tabs>
  <TabItem value="python" label="Python (unittest)">

  ```python
  def test_all_variables(self):
    """Test retrieving all variables using all_variables()"""
    responses.add(
      responses.POST,
      self._get_variables_url(),
      json={
        "string-test-var": {
          "_id": "123456",
          "key": "string-test-var",
          "type": "String",
          "value": "var-on",
          "eval": {
            "reason": "TARGETING_MATCH",
            "details": "All Users",
            "target_id": "654321"
          }
        },
        "bool-test-var": {
          "_id": "123456",
          "key": "bool-test-var",
          "type": "Boolean",
          "value": True,
          "eval": {
            "reason": "TARGETING_MATCH",
            "details": "All Users",
            "target_id": "654321"
          }
        }
      },
      status=200,
    )

    user = DevCycleUser(user_id="test-user-123")
    result = self.client.all_variables(user)

    # Verify the response structure
    self.assertIsInstance(result, dict)
    self.assertIn("string-test-var", result)
    self.assertIn("bool-test-var", result)
    
    # Verify variable values
    self.assertEqual(result["string-test-var"].value, "var-on")
    self.assertEqual(result["string-test-var"].key, "string-test-var")
    self.assertEqual(result["string-test-var"].type, "String")
    
    self.assertTrue(result["bool-test-var"].value)
    self.assertEqual(result["bool-test-var"].key, "bool-test-var")
    self.assertEqual(result["bool-test-var"].type, "Boolean")
    
    # Verify the request was made to the correct URL
    self.assertEqual(len(responses.calls), 1)
    self.assertEqual(responses.calls[0].request.method, "POST")
    self.assertEqual(responses.calls[0].request.url, self._get_variables_url())
  ```
  </TabItem>
</Tabs>

## Client-Side SDKs: Bootstrapping

Client-side Web SDKs (JavaScript, React, Next.js) support bootstrapping, which allows you to pass a pre-configured DevCycle configuration during initialization.

```javascript
const bootstrapConfig = {
  // Your test configuration here
}

const devcycleClient = initializeDevCycle(
  '<DEVCYCLE_CLIENT_SDK_KEY>',
  user,
  { bootstrapConfig }
)
```

## Best Practices

- Use consistent test configurations across your test suite
- Test both enabled and disabled states of Features
- Test Variables and Variations to ensure all code paths are covered
- Keep mock configurations close to your test files for easy maintenance