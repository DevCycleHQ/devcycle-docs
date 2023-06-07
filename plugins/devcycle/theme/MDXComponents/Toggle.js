import { useVariableValue } from '@devcycle/devcycle-react-sdk'

export default function (props) {
  const value = useVariableValue(props.variableKey, props.defaultValue)
  return value === props.comparison ? props.children : null
}
