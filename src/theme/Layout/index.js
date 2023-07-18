import React from 'react'
import Layout from '@theme-original/Layout'
import Toggle from '@theme/MDXComponents/Toggle'
import Head from '@docusaurus/Head'
import { Analytics } from '@vercel/analytics/react'

export default function LayoutWrapper(props) {
  return (
    <>
      <Toggle
        variableKey="enable-kapa-ai"
        defaultValue={false}
        comparison={true}
      >
        <Head>
          <script
            src="//widget.kapa.ai/kapa-widget.bundle.js"
            data-website-id="585d136a-8362-4153-888c-8f4e60966007"
            data-project-name="DevCycle"
            data-project-color="#1F2937"
            data-project-logo="//images.g2crowd.com/uploads/product/image/large_detail/large_detail_23a6ffcf221b44d55e965ca45eedbfd9/devcycle.jpg"
            async="true"
          />
        </Head>
      </Toggle>
      <Layout {...props} />
      <Analytics />
    </>
  )
}
