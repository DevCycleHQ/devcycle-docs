import { useVariableValue } from '@devcycle/devcycle-react-sdk'
import { usePluginData } from '@docusaurus/useGlobalData'
import useIsBrowser from '@docusaurus/useIsBrowser'

export default function (props) {
  const { allVariables } = usePluginData('@devcycle/docusaurus-theme-devcycle')
  const isBrowser = useIsBrowser()
  const value = isBrowser
    ? useVariableValue(props.variableKey, props.defaultValue)
    : allVariables?.[props.variableKey]?.value || props.defaultValue
  return value === props.comparison ? props.children : null
}
