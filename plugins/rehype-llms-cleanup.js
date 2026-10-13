/**
 * Rehype plugins that normalize Docusaurus-rendered HTML before
 * @signalwire/docusaurus-plugin-llms-txt converts it to Markdown.
 *
 * rehypeLlmsCleanup (runs before the built-in link rewriting):
 * - drops heading permalinks, buttons, comments, and the AI prompt copy row
 * - replaces YouTube embeds with a plain link
 * - restores code block languages and line breaks from Prism output
 * - labels each tab panel instead of emitting a detached list of tab names
 * - turns admonitions into blockquotes with a bold label
 * - turns doc card grids into a bullet list instead of a run of headings
 * - turns <details> summaries into a bold line
 * - drops decorative images (empty alt) and inlined base64 images, decodes
 *   alt text, and makes image URLs absolute
 * - turns <br> outside tables into a line break and moves spaces out of bold
 *   and italic elements
 *
 * rehypeLlmsFixIndexLinks (runs after the built-in link rewriting and the
 * HTML-to-Markdown conversion, so it walks Markdown link nodes):
 * - fixes links to trailing-slash routes, which the plugin emits as `/path/.md`
 * - points absolute links to doc pages (e.g. https://docs.devcycle.com/cli),
 *   which the plugin leaves alone, at their `.md` versions
 * - points links to excluded routes back at the HTML page, since they have no
 *   `.md` version
 */

const { createMatcher } = require('@docusaurus/utils')

const classList = (node) => {
  const cls = node.type === 'element' ? node.properties?.className : undefined
  if (Array.isArray(cls)) return cls.map(String)
  return typeof cls === 'string' ? cls.split(' ') : []
}

const hasClass = (node, name) => classList(node).includes(name)

const hasClassPrefix = (node, prefix) =>
  classList(node).some((c) => c.startsWith(prefix))

const textOf = (node) =>
  node.type === 'text'
    ? node.value
    : node.children
      ? node.children.map(textOf).join('')
      : ''

const findAll = (node, pred, out = []) => {
  if (node.type === 'element' && pred(node)) out.push(node)
  else if (node.children) node.children.forEach((c) => findAll(c, pred, out))
  return out
}

const find = (node, pred) => findAll(node, pred)[0]

const el = (tagName, children, properties = {}) => ({
  type: 'element',
  tagName,
  properties,
  children,
})

const txt = (value) => ({ type: 'text', value })

const youtubeId = (src) =>
  /youtube(?:-nocookie)?\.com\/embed\/([^?&#/]+)/.exec(src)?.[1]

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// Docusaurus escapes image alt text twice, leaving entities like `&#39;`
const decodeEntities = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

const INLINE_EMPHASIS = new Set(['b', 'strong', 'em', 'i'])

// Move leading/trailing spaces out of `<b> text </b>`, which would otherwise
// be serialized as `**text&#x20;**`
function hoistWhitespace(element) {
  const first = element.children[0]
  const last = element.children[element.children.length - 1]
  const lead = first?.type === 'text' ? /^\s+/.exec(first.value)?.[0] : null
  const trail = last?.type === 'text' ? /\s+$/.exec(last.value)?.[0] : null
  if (lead) first.value = first.value.slice(lead.length)
  if (trail && last.value) last.value = last.value.slice(0, -trail.length)
  return [lead && txt(' '), element, trail && txt(' ')].filter(Boolean)
}

function transform(node, options, inTable = false) {
  const out = []
  for (const child of node.children) {
    if (child.type === 'comment') continue
    if (child.type !== 'element') {
      out.push(child)
      continue
    }
    if (
      hasClass(child, 'hash-link') ||
      hasClass(child, 'aiPromptRow') ||
      child.tagName === 'button'
    ) {
      continue
    }

    if (child.tagName === 'iframe') {
      const id = youtubeId(String(child.properties?.src ?? ''))
      if (id) {
        const href = `https://www.youtube.com/watch?v=${id}`
        out.push(el('p', [txt('Video: '), el('a', [txt(href)], { href })]))
      }
      continue
    }

    if (child.tagName === 'pre') {
      const lang = classList(child).find((c) => c.startsWith('language-'))
      const lines = findAll(child, (n) => hasClass(n, 'token-line')).map(textOf)
      const code = lines.length ? lines.join('\n') : textOf(child)
      out.push(
        el('pre', [el('code', [txt(code)], lang ? { className: [lang] } : {})]),
      )
      continue
    }

    if (hasClass(child, 'tabs-container')) {
      const labels = findAll(child, (n) => n.properties?.role === 'tab').map(
        textOf,
      )
      const panels = findAll(child, (n) => n.properties?.role === 'tabpanel')
      panels.forEach((panel, i) => {
        out.push(el('p', [el('strong', [txt(labels[i] ?? `Tab ${i + 1}`)])]))
        out.push(...transform(panel, options, inTable).children)
      })
      continue
    }

    if (hasClass(child, 'theme-admonition')) {
      const heading = find(child, (n) => hasClassPrefix(n, 'admonitionHeading'))
      const content = find(child, (n) => hasClassPrefix(n, 'admonitionContent'))
      const title = capitalize(heading ? textOf(heading).trim() : 'Note')
      const label = /[.:?!]$/.test(title) ? title : `${title}:`
      const body = content ? transform(content, options, inTable).children : []
      const first = body.find((n) => n.type === 'element')
      if (first?.tagName === 'p') {
        first.children.unshift(el('strong', [txt(label)]), txt(' '))
      } else {
        body.unshift(el('p', [el('strong', [txt(label)])]))
      }
      out.push(el('blockquote', body))
      continue
    }

    const cards =
      child.tagName === 'section'
        ? findAll(child, (n) => n.tagName === 'a' && hasClass(n, 'card'))
        : []
    if (cards.length) {
      const items = cards.map((card) => {
        const title = textOf(find(card, (n) => n.tagName === 'h2') ?? card)
        const desc = textOf(find(card, (n) => n.tagName === 'p') ?? txt(''))
        const link = el('a', [txt(title.trim())], {
          href: card.properties.href,
        })
        return el('li', desc.trim() ? [link, txt(`: ${desc.trim()}`)] : [link])
      })
      out.push(el('ul', items))
      continue
    }

    // The plugin keeps <br> as inline HTML so table cells stay on one line;
    // elsewhere a plain line break reads better
    if (child.tagName === 'br' && !inTable) {
      out.push(txt('\n'))
      continue
    }

    if (INLINE_EMPHASIS.has(child.tagName)) {
      out.push(...hoistWhitespace(transform(child, options, inTable)))
      continue
    }

    // Collapsibles: keep the summary as a bold line, then the content
    if (child.tagName === 'summary') {
      const label = textOf(child).replace(/\s+/g, ' ').trim()
      if (label) out.push(el('p', [el('strong', [txt(label)])]))
      continue
    }

    if (child.tagName === 'img') {
      if (child.properties?.alt === '') continue
      // Small images are inlined by the bundler as base64 data URIs
      if (String(child.properties?.src ?? '').startsWith('data:')) continue
      if (typeof child.properties?.alt === 'string') {
        child.properties.alt = decodeEntities(child.properties.alt)
      }
      const src = String(child.properties?.src ?? '')
      if (src.startsWith('/') && !src.startsWith('//')) {
        child.properties.src = options.siteUrl + src
      }
    }

    out.push(
      transform(
        child,
        options,
        inTable || child.tagName === 'td' || child.tagName === 'th',
      ),
    )
  }
  node.children = out
  return node
}

function rehypeLlmsCleanup(options = {}) {
  const siteUrl = (options.siteUrl ?? '').replace(/\/$/, '')
  return (tree) => {
    transform(tree, { siteUrl })
  }
}

function rehypeLlmsFixIndexLinks(options = {}) {
  const origins = (options.siteUrls ?? []).map((u) => u.replace(/\/$/, ''))
  const isExcluded = createMatcher(options.excludeRoutes ?? [])
  const toMarkdown = (url) => {
    const origin = origins.find((o) => url.startsWith(`${o}/`))
    if (!origin) return url
    const [, pathname, suffix] = /^([^?#]*)(.*)$/.exec(url.slice(origin.length))
    if (pathname === '/') return url
    // Excluded pages have no .md version, so link to the HTML page
    if (pathname.endsWith('.md')) {
      const route = pathname.slice(0, -'.md'.length)
      return isExcluded(route) ? `${origin}${route}${suffix}` : url
    }
    if (/\.[a-z0-9]+$/i.test(pathname)) return url
    const route = pathname.replace(/\/$/, '')
    return isExcluded(route) ? url : `${origin}${route}.md${suffix}`
  }
  const fix = (node) => {
    if (node.type === 'link' || node.type === 'definition') {
      node.url = toMarkdown(node.url.replace(/\/\.md(?=$|[?#])/, '.md'))
    }
    node.children?.forEach(fix)
  }
  return fix
}

module.exports = { rehypeLlmsCleanup, rehypeLlmsFixIndexLinks }
