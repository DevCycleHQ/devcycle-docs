import React from 'react'
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'

// Default implementation, that you can customize
function Root({ children }) {
  return <>{children}</>
}

export default withDVCProvider({
  sdkKey: process.env.DEVCYCLE_CLIENT_SDK_TOKEN,
})(Root)
