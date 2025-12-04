---
title: Mock Testing with DevCycle
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Mock testing allows you to test your application's behavior with specific Feature and Variable configurations without making API calls to DevCycle. This enables faster, more reliable tests that don't depend on external services.

## Methods for Mock Testing

### DevCycleUser

```
mockUser = DevCycleUser(
  user_id='test_user',
  email='test@example.com',
  country='CA',
  customData={
    customKey='value'
  } 
)
```

### Variable and VariableValue

Test retrieving a Variable value through the `.variable()` or `.variableValue()` method.
<Tabs>
  <TabItem value="python" label="Python (unittest)">

  ```python
  def test_variable_string(self, mock_client):
    """Test getting a string variable value"""

    mock_variable = Variable(
        _id='var_str',
        key='example-text',
        type='String',
        value='step-1'
    )
    
    mock_client.variable.return_value = mock_variable
    
    result = mock_client.variable(self.mock_user, 'example-text', 'default')
    
    # Assertions
    self.assertEqual(result.value, 'step-1')
    self.assertEqual(result.key, 'example-text')
    self.assertEqual(result.type, 'String')
  ```
  </TabItem>
</Tabs>

### AllVariables

Test retrieving all active Variables through the `allVariable()` or `all_variables()` method.
<Tabs>
  <TabItem value="python" label="Python (unittest)">

  ```python
  def test_all_variables(self, mock_client):
    """Test retrieving all variables for a user"""

    mock_variables = {
      'feature-flag-1': Variable(
        _id='var1',
        key='feature-flag-1',
        type='Boolean',
        value=True,
        eval=EvalReason(
            reason='TARGETING_MATCH',
            details='ALL USERS',
            target_id='targeting_rule1'
        )
      ),
      'feature-flag-2': Variable(
        _id='var2',
        key='feature-flag-2',
        type='String',
        value='variant-a',
        eval=EvalReason(
            reason='SPLIT',
            details='Random Distribution | Audience Match',
            target_id='targeting_rule2'
        )
      ),
    }

    mock_client.all_variables.return_value = mock_variables
    mock_client.is_initialized.return_value = True
    
    # Call the method
    result = mock_client.all_variables(self.mock_user)
    
    # Assertions
    self.assertEqual(len(result), 2)
    self.assertTrue(result['feature-flag-1'].value)
    self.assertEqual(result['feature-flag-2'].value, 'variant-a')
    mock_client.all_variables.assert_called_once_with(self.mock_user)
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

## Server-Side SDKs: Local Bucketing

Server-side SDKs with Local Bucketing mode enabled, will allow you to provide the SDK a local configuration file or mock data.

```javascript
// Example for Node.js SDK
const devcycleClient = initializeDevCycle(
  '<DEVCYCLE_SERVER_SDK_KEY>',
  {
    configCDN: 'https://your-test-config.com/config.json',
    // or use local file
  }
)
```

## Best Practices

- Use consistent test configurations across your test suite
- Test both enabled and disabled states of Features
- Test Variables and Variations to ensure all code paths are covered
- Keep mock configurations close to your test files for easy maintenance