import React from 'react'
import CodeBlock from '@theme/CodeBlock'

type AIPoweredInstallProps = {
  promptContent: string
}

export default function AIPoweredInstall(
  { promptContent }: AIPoweredInstallProps,
): JSX.Element {
  const onCopy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      void navigator.clipboard.writeText(promptContent)
    } catch (err) {
      // no-op
    }
  }

  return (
    <>
      {/* Only render the AI Prompt copy row. The MCP Install lives inline on each page. */}

      <div className="aiPromptRow alert alert--info">
        <div className="aiPromptSummary">
          <span><strong>AI Prompt</strong></span>
          <a
            href="#"
            onClick={onCopy}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__item navbar__link header-signup-link"
          >
            <span>Copy Prompt</span>
          </a>
        </div>
      </div>
    </>
  )
}


