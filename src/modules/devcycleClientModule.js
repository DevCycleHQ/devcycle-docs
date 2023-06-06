import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import siteConfig from '@generated/docusaurus.config'

if (ExecutionEnvironment.canUseDOM) {
  window.dvcClient = window.DevCycle.initialize(
    siteConfig?.customFields?.DEVCYCLE_CLIENT_SDK_KEY,
    {},
  )
}
