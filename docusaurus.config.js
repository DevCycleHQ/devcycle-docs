require('dotenv').config()
const path = require('path')
const remarkYoutube = require('gridsome-plugin-remark-youtube')

/**
 * Pinned version of the CLI to use for docs
 * When bumping the version, add any new commands to the documents array
 */
const DVC_CLI_VERSION = 'v5.7.0' // auto updated by dvc cli release workflow

const VSCODE_EXTENSION_VERSION = '1.0.1' // auto updated by extension release workflow

const removeDocsSections = (content, sectionNames, headerIdentifier = "##") => {
  let result = content
  for (const sectionName of sectionNames) {
    const regex = new RegExp(`${headerIdentifier} ${sectionName}[\\s\\S]*?(?=## |#$|$)`, 'g');

    result = result.replace(regex, '')
  }
  return result
}

/**
 * @type {Partial<import('@docusaurus/types').DocusaurusConfig>}
 */
const config = {
  clientModules: [
    require.resolve('./src/modules/analyticsModule.js'),
    require.resolve('./src/modules/rudderstackClientModule.js'),
  ],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  plugins: [
    () => {
      // ...
      return {
        name: 'tailwind',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(
            require('postcss-import'),
            require('tailwindcss'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 4,
            }),
          )
          return postcssOptions
        },
      }
    },
    path.resolve(__dirname, 'plugins', 'custom-gtm'),
    path.resolve(__dirname, 'plugins', 'custom-beamer'),
    [
      '@devcycle/docusaurus-plugin',
      {
        sdkKey: process.env.DEVCYCLE_CLIENT_SDK_KEY || 'dvc_client_sdk_key',
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'cli',
        sourceBaseUrl: `https://raw.githubusercontent.com/DevCycleHQ/cli/${DVC_CLI_VERSION}`,
        outDir: 'docs/cli',
        documents: [
          'README.md',
          'docs/alias.md',
          'docs/autocomplete.md',
          'docs/cleanup.md',
          'docs/diff.md',
          'docs/environments.md',
          'docs/features.md',
          'docs/generate.md',
          'docs/help.md',
          'docs/identity.md',
          'docs/keys.md',
          'docs/login.md',
          'docs/logout.md',
          'docs/organizations.md',
          'docs/overrides.md',
          'docs/projects.md',
          'docs/repo.md',
          'docs/status.md',
          'docs/targeting.md',
          'docs/usages.md',
          'docs/variables.md',
          'docs/variations.md',
        ],
        performCleanup: true,
        modifyContent: (filename, content) => {
          if (filename.includes('README')) {
            return {
              // reduce headers to use with table of contents
              content: content.replace(/#\s/g, '## '),
            }
          }
          return undefined
        },
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'vscode-extension',
        sourceBaseUrl: `https://raw.githubusercontent.com/DevCycleHQ/vscode-extension/${VSCODE_EXTENSION_VERSION}`,
        outDir: 'docs/integrations/vscode-extension',
        documents: [
          'README.md',
        ],
        performCleanup: true,
        modifyContent: (filename, content) => {
          if (filename.includes('README')) {
            const noTitle = content.replace(/# [\s\S]*?##/, '# DevCycle VSCode Extension \n##')
            return {
              content: removeDocsSections(noTitle, ['About DevCycle', 'Documentation', 'Sign Up for DevCycle', 'Contributing'])
            }
          }
          return undefined
        },
      },
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        docs: {
          editUrl: ({ versionDocsDirPath, docPath }) =>
            `https://github.com/devcyclehq/devcycle-docs/edit/main/${versionDocsDirPath}/${docPath}`,
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          editCurrentVersion: true,
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [
            [remarkYoutube, { width: '100%', align: 'auto' }],
            require('remark-docusaurus-tabs'),
          ],
          rehypePlugins: [],
          routeBasePath: '/',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
      },
    ],
    [
      'redocusaurus',
      {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        specs: [
          {
            id: 'management-api',
            spec: 'https://api.devcycle.com/swagger.json',
            route: '/management-api/',
          },
          {
            id: 'bucketing-api',
            spec: 'bucketing-api.yaml',
            route: '/bucketing-api/',
          },
        ],
        theme: {
          primaryColor: '#365EDA',
          redocOptions: { hideDownloadButton: false },
        },
      },
    ],
  ],

  /** ************ Rest of your Docusaurus Config *********** */
  title: 'DevCycle Docs',
  tagline: 'DevCycle Feature Management and Experimentation',
  customFields: {
    meta: {
      description:
        'The DevCycle documentation site includes guides and API documentation for the complete platform including the management dashboard, management APIs, SDKs, and more. If you need help along the way feel free to reach out to support and if you don’t have an account yet, you can create a free account now.',
    },
    DEVCYCLE_CLIENT_SDK_KEY: process.env.DEVCYCLE_CLIENT_SDK_KEY,
  },
  url:
    process.env.VERCEL_ENV === 'production'
      ? 'https://docs.devcycle.com'
      : process.env.VERCEL_URL
      ? 'https://' + process.env.VERCEL_URL
      : 'http://localhost:3000',
  baseUrl: '/',
  favicon: 'devcycle_favicon.svg',
  scripts: [
    {
      src: 'https://use.fontawesome.com/releases/v5.15.4/js/all.js',
      async: true,
    },
  ],
  themeConfig: {
    announcementBar: {
      id: 'support_us',
      content:
        'Ready to start feature flagging? Sign-up for a free <a target="_blank" rel="noopener noreferrer" href="https://devcycle.com">DevCycle account</a> today 🏳️',
      backgroundColor: 'rgb(17 24 39)',
      textColor: '#FFFFFF',
      isCloseable: false,
    },
    image: 'devcycle_card.png',
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    prism: {
      additionalLanguages: [
        'ruby',
        'go',
        'php',
        'swift',
        'kotlin',
        'java',
        'clike',
        'scala',
        'hcl',
        'yaml',
        'csharp',
        'dart',
      ],
    },
    algolia: {
      appId: '6TW93YPS4X',
      apiKey: '2a9dbde35586f5ae29571b19dacc71c6', // Public API key: it is safe to commit it
      indexName: 'prod_DEVCYCLE_DOCS',
      contextualSearch: true,
    },
    navbar: {
      logo: {
        alt: 'DevCycle Logo',
        src: 'devcycle-docs-full-colour.svg',
        srcDark: 'devcycle-docs-white.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'sdk/index',
          position: 'left',
          collapse: 'false',
          label: 'SDKs',
        },
        {
          type: 'dropdown',
          label: 'APIs',
          position: 'left',
          items: [
            {
              label: 'Management API',
              to: '/management-api/',
            },
            {
              label: 'Bucketing API',
              to: '/bucketing-api/',
            },
          ],
        },
        {
          type: 'doc',
          docId: 'integrations/index',
          position: 'left',
          collapse: 'false',
          label: 'Integrations',
        },
        {
          label: 'CLI',
          to: '/cli/',
        },
        {
          type: 'dropdown',
          label: 'Resources',
          position: 'left',
          items: [
            {
              to: '/best-practices/',
              label: 'Best Practices',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: [
            {
              label: 'Calendar',
              to: '/community/calendar',
            },
            {
              href: 'https://www.meetup.com/devcycle/',
              label: 'MeetUps',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://www.devcycle.com/blog',
              label: 'Blog',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://discord.gg/pKK4fJgGxG',
              label: 'Discord',
              target: '_blank',
              rel: null,
            },
          ],
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://devcycle.com/contact/request-demo',
          position: 'right',
          label: 'Book a Demo',
          className: 'navbar-book-demo',
        },
        {
          href: 'https://app.devcycle.com/?isSignUp=true',
          position: 'right',
          className: 'header-signup-link',
          label: 'Sign Up',
        },
        {
          href: 'https://discord.gg/pKK4fJgGxG',
          position: 'right',
          className: 'header-discord-link',
          'aria-label': 'Discord',
        },
        {
          href: '#',
          position: 'right',
          className: 'header-beamer-link',
          'aria-label': 'Beamer',
        },
      ],
    },
    footer: {
      logo: {
        alt: 'DevCycle Logo',
        src: 'togglebot.png',
      },
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'DevCycle home',
              href: 'https://Devcycle.com',
            },
            {
              label: 'Dashboard',
              href: 'https://app.devcycle.com',
            },
            {
              label: 'Github',
              href: 'https://github.com/devcyclehq',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/pKK4fJgGxG',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://devcycle.com/company/developer-blog',
            },
            //   {
            //     label: 'Status',
            //   href: 'https://status.DevCycle.com/'
            // },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/devcyclehq',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/pKK4fJgGxG',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DevCycle.`,
    },
  },
}

module.exports = config
