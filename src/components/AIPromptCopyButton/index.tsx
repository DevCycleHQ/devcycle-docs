import React from 'react'

type AIPromptCopyButtonProps = {
  promptContent: string
}

export default function AIPromptCopyButton(
  { promptContent }: AIPromptCopyButtonProps,
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
            className="navbar__item navbar__link header-signup-link"
          >
            <span>Copy Prompt</span>
          </a>
        </div>
      </div>
    </>
  )
}



