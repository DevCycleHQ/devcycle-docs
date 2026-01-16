---
title: Mock Testing with DevCycle
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Mock testing allows you to test your application's behavior with specific Feature and Variable configurations without making API calls to DevCycle. This enables faster, more reliable tests that don't depend on external services.

## Mock Testing Strategy

The general testing strategy we'd recommend is to mock DevCycle's Variable and Variable value method calls as opposed to mocking the full DevCycle client. To achieve this, you'd want to perform network-level mocking to intercept the Variables or Variable by key requests to provide your own Variable response. This approach ensures your tests focus on application logic rather than SDK implementation details.

## Server-Side SDKs: Cloud Bucketing

DevCycle's Server-side SDKs can operate in Cloud or Local Bucketing modes. We'd recommend using Cloud Bucketing for mock testing, as it makes network-level mocking straightforward. Cloud Bucketing uses the [DevCycle Bucketing API](/bucketing-api/#tag/Bucketing-API) behind the scenes to fetch and retrieve Variable values. You may mock the response of the `Get Variable by Key` or `Get Variables` endpoints in order to replicate the output of your Server-side SDK.

### Setup

The SDK Key does not need to be a valid SDK key, but it needs to be correctly formatted and start with `dvc_server` or `server`.

<Tabs>
  <TabItem value="python" label="Python (unittest)">

  ```python
  def setUp(self):
    self.sdk_key = "dvc_server_<token>_hash"
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
    """Get the URL for the all variables request"""
    return f"{self.bucketing_api_base}/v1/variables"
  ```
  </TabItem>
</Tabs>

### Variable and VariableValue Testing

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

### AllVariables Testing

Test retrieving all active Variables through the `.allVariables()` method.

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

## Client-Side SDKs

DevCycle's Client-side SDKs use the DevCycle SDK API to fetch and retrieve Variable values. You can test the `variable()` and `allVariables()` methods by creating mock Variable objects to replicate the Variable response from Client-side SDK configs.

### Setup

Create a mock Variable object that contains the Variables and Variable values you want to test. We'd recommend creating a default Variable test case as well to ensure your application handles missing Variables gracefully.

<Tabs>
  <TabItem value="javascript" label="JavaScript (Jest)">

  ```javascript
  describe('DevCycle Variable method mocking', () => {
  
    const mockVariables = {
      'togglebot-speed': {
        key: 'togglebot-speed',
        value: 'fast',
        type: 'String',
        isDefaulted: false,
        eval: {
          reason: "TARGETING_MATCH",
          details: "All Users",
          target_id: "target-1"
        }
      },
      'mock-testing-variable': {
        key: 'mock-testing-variable',
        value: true,
        type: 'Boolean',
        isDefaulted: false,
        eval: {
          reason: "SPLIT",
          details: "Random Distribution | Audience Match",
          target_id: "target-2"
        }
      }
    };
    
    // Helper function to create a mock client with the shared mockVariables
    const createMockDevcycleClient = () => {
      return {
        variable: jest.fn((key, defaultValue) => {
          // Return mocked variable if it exists, otherwise return default
          if (mockVariables[key]) {
            return mockVariables[key];
          }
          
          return {
            key: key,
            value: defaultValue,
            type: typeof defaultValue === 'string' ? 'String' : typeof defaultValue === 'boolean' ? 'Boolean' : 'Number',
            isDefaulted: true,
            eval: {
              reason: "DEFAULT",
              details: "User Not Targeted"
            }
          };
        }),
        allVariables: jest.fn(() => {
          // Return all mocked variables
          return mockVariables;
        })
      };
    };

    // Test Cases...

  });
  ```
  </TabItem>
</Tabs>

### Variable Testing

Test retrieving a Variable value through the `.variable()` method. You may also want to test [Evaluation Reasons](/sdk/features#evaluation-reasons) if you plan on utilizing this data for reporting or analytics.

<Tabs>
  <TabItem value="javascript" label="JavaScript (Jest)">

  ```javascript
  describe('DevCycle Variable method mocking', () => {
  
    // Mock DevCycleClient Setup...

    test('should return mocked variable value using variable method', () => {
      const mockDevcycleClient = createMockDevcycleClient();
      
      // Test variable exists in mock config
      const togglebotSpeed = mockDevcycleClient.variable('togglebot-speed', 'defaultValue');
      expect(togglebotSpeed.value).toBe('fast');
      expect(togglebotSpeed.eval.reason).toBe("TARGETING_MATCH");
      
      // Verify the method was called with correct arguments
      expect(mockDevcycleClient.variable).toHaveBeenCalledWith('togglebot-speed', 'defaultValue');
      
      // Test default value behavior
      const nonExistent = mockDevcycleClient.variable('non-existent', 'default');
      expect(nonExistent.value).toBe('default');
      expect(nonExistent.eval.reason).toBe("DEFAULT");
    });
  });
  ```
  </TabItem>
</Tabs>

### AllVariables Testing

Test retrieving all Variables through the `.allVariables()` method.

<Tabs>
  <TabItem value="javascript" label="JavaScript (Jest)">

  ```javascript
  describe('DevCycle Variable method mocking', () => {

    // Mock DevCycleClient Setup...

    test('should return all mocked variables using allVariables method', () => {
        const mockDevcycleClient = createMockDevcycleClient();
        
        // Get all variables
        const allVariables = mockDevcycleClient.allVariables();
        
        // Verify all variables are returned
        expect(allVariables).toBeDefined();
        expect(Object.keys(allVariables)).toHaveLength(2);
        expect(allVariables['togglebot-speed']).toBeDefined();
        expect(allVariables['mock-testing-variable']).toBeDefined();
        
        // Verify variable values
        expect(allVariables['togglebot-speed'].value).toBe('fast');
        expect(allVariables['mock-testing-variable'].value).toBe(true);
      });
  });
  ```
  </TabItem>
</Tabs>

## Bootstrapping

The Node.js and Next.js SDKs support bootstrapping, which allows you to pass a pre-configured DevCycle configuration during initialization. This is particularly useful for testing scenarios where you want to avoid network requests entirely and work with a static configuration. 

You can find more information in our [Boostrapping and Server-Side Rendering](/sdk/server-side-sdks/node/node-bootstrapping) docs.

```javascript
const bootstrapConfig = {
  // Your test configuration here
};

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
- Include edge cases such as missing Variables, default values, and different evaluation reasons