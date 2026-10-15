/**
 * Wraps @signalwire/docusaurus-plugin-llms-txt and tidies the generated
 * llms.txt index after it is written:
 * - drops the category description the plugin prints under a section heading
 *   when the same description is repeated on the index page link right below
 * - collapses the extra blank lines left by sections without an index page
 * - adds the missing blank line after the `## Optional` heading
 *
 * llms-full.txt starts with a copy of llms.txt, so that prefix is replaced too.
 *
 * It also removes backslash escapes the Markdown serializer adds where they are
 * not needed (`user\_id`, `?a=1\&b=2`) from the generated pages, since LLMs
 * copy identifiers and URLs verbatim. Code blocks and inline code are untouched.
 */
const fs = require('fs/promises')
const path = require('path')
const { loadFreshModule } = require('@docusaurus/utils')

function tidyIndex(content) {
  const lines = content.split('\n')
  const out = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const next = lines[i + 2]
    if (
      /^#{2,} /.test(lines[i - 2] ?? '') &&
      line &&
      !line.startsWith('- ') &&
      next?.startsWith('- [') &&
      next.endsWith(`: ${line}`)
    ) {
      i++ // also skip the blank line after the description
      continue
    }
    out.push(line)
  }
  return out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^## Optional\n(?=-)/m, '## Optional\n\n')
}

function unescapeProse(markdown) {
  let fence = null
  return markdown
    .split('\n')
    .map((line) => {
      const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1]
      if (marker) {
        if (!fence) fence = marker
        else if (marker[0] === fence[0] && marker.length >= fence.length)
          fence = null
        return line
      }
      if (fence) return line
      return line
        .split(/(`+[^`]*`+)/)
        .map((part, i) =>
          i % 2
            ? part
            : part
                .replace(/(?<=[A-Za-z0-9])\\_(?=[A-Za-z0-9])/g, '_')
                .replace(/\\&(?![A-Za-z0-9#]+;)/g, '&'),
        )
        .join('')
    })
    .join('\n')
}

// Generated pages sit next to the HTML page they were made from, unlike
// Markdown files copied from static/
async function generatedPages(outDir) {
  const files = await fs.readdir(outDir, { recursive: true })
  const all = new Set(files)
  return files.filter(
    (f) =>
      f.endsWith('.md') &&
      (all.has(f.replace(/\.md$/, '.html')) ||
        all.has(path.join(f.replace(/\.md$/, ''), 'index.html'))),
  )
}

async function rewrite(file, fn) {
  const content = await fs.readFile(file, 'utf8').catch(() => null)
  if (content !== null) await fs.writeFile(file, fn(content))
}

module.exports = async function llmsTxtPlugin(context, options) {
  // Load the plugin the way Docusaurus does, since its ESM build uses
  // extensionless imports that Node's native loader rejects
  const { default: plugin } = await loadFreshModule(
    require.resolve('@signalwire/docusaurus-plugin-llms-txt'),
  )
  const instance = plugin(context, options)
  return {
    ...instance,
    async postBuild(props) {
      await instance.postBuild(props)
      const { outDir } = props
      for (const page of await generatedPages(outDir)) {
        await rewrite(path.join(outDir, page), unescapeProse)
      }
      const llmsPath = path.join(outDir, 'llms.txt')
      const original = await fs.readFile(llmsPath, 'utf8')
      const tidied = tidyIndex(original)
      await fs.writeFile(llmsPath, tidied)
      await rewrite(path.join(outDir, 'llms-full.txt'), (full) =>
        unescapeProse(
          full.startsWith(original)
            ? tidied + full.slice(original.length)
            : full,
        ),
      )
    },
  }
}
