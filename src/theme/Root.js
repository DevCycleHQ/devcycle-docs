import React, { useEffect } from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'

const injectKapa = () => {
  const kapaScript = document.createElement('script')
  kapaScript.src = '//widget.kapa.ai/kapa-widget.bundle.js'
  kapaScript.setAttribute(
    'data-website-id',
    '585d136a-8362-4153-888c-8f4e60966007',
  )
  kapaScript.setAttribute('data-project-name', 'DevCycle')
  kapaScript.setAttribute('data-project-color', '#1F2937')
  kapaScript.setAttribute(
    'data-project-logo',
    '//images.g2crowd.com/uploads/product/image/large_detail/large_detail_23a6ffcf221b44d55e965ca45eedbfd9/devcycle.jpg',
  )
  kapaScript.setAttribute('async', true)
  document.body.appendChild(kapaScript)
}

const styleKapa = () => {
  const kapaWidgetPosition = dvcClient.variableValue(
    'kapa-widget-position',
    'right',
  )
  const interval = setInterval(() => {
    const kapaElement = document.querySelector('#kapa-widget-container button')
    if (kapaElement) {
      kapaElement.style[kapaWidgetPosition] = '20px'
      kapaElement.style['z-index'] = 9999
      clearInterval(interval)
    }
  }, 100)
}

// Default implementation, that you can customize
export default function Root({ children }) {
  const isBrowser = useIsBrowser()
  useEffect(() => {
    if (isBrowser) {
      window?.dvcClient?.onClientInitialized(() => {
        const enableKapaAi = window.dvcClient.variableValue(
          'enable-kapa-ai',
          false,
        )
        if (enableKapaAi) {
          injectKapa()
          styleKapa()
        }
      })
    }
  }, [isBrowser])
  return <>{children}</>
}
