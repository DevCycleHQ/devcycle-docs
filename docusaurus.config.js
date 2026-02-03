require('dotenv').config()
const path = require('path')
import remarkEmbedder from '@remark-embedder/core'
const YouTubeTransformer = {
  name: 'YouTubeTransformer',
  shouldTransform(url) {
    const ytEndpoints = [
      {
        schemes: [
          'https://*.youtube.com/watch*',
          'https://*.youtube.com/v/*',
          'https://youtu.be/*',
          'https://*.youtube.com/playlist?list=*',
          'https://youtube.com/playlist?list=*',
          'https://*.youtube.com/shorts*',
        ],
        url: 'https://www.youtube.com/oembed',
        discovery: true,
      },
    ]

    for (const endpoint of ytEndpoints) {
      if (
        endpoint.schemes?.some((scheme) =>
          new RegExp(scheme.replace(/\*/g, '(.*)')).test(url),
        )
      ) {
        return true
      }
    }
    return false
  },
  // default config function returns what it's given
  getHTML(url, options = {}) {
    function getVideoID(userInput) {
      var res = userInput.match(
        /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#\&\?]*).*/,
      )
      if (res) return res[1]
      return false
    }
    const videoID = getVideoID(url)
    return `<div style="width: ${options.width || '100%'}; margin: 0 ${
      options.align || '0'
    };"><div style="position: relative; padding-bottom: 56.25%; padding-top: 25px; height: 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/${videoID}"></iframe></div></div>`
  },
}
/**
 * Pinned version of the CLI to use for docs
 * When bumping the version, add any new commands to the documents array
 */
const DVC_CLI_VERSION = 'v6.2.1' // auto updated by dvc cli release workflow

const VSCODE_EXTENSION_VERSION = 'v1.4.10' // auto updated by extension release workflow

const AI_PROMPTS_VERSION = 'main' // AI prompts repository branch

const removeDocsSections = (content, sectionNames, headerIdentifier = '##') => {
  let result = content
  for (const sectionName of sectionNames) {
    const regex = new RegExp(
      `${headerIdentifier} ${sectionName}[\\s\\S]*?(?=## |#$|$)`,
      'g',
    )

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
          'docs/mcp.md',
          'docs/organizations.md',
          'docs/overrides.md',
          'docs/projects.md',
          'docs/repo.md',
          'docs/status.md',
          'docs/targeting.md',
          'docs/usages.md',
          'docs/variables.md',
          'docs/variations.md',
          'mcp-worker/README.md',
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
        documents: ['README.md'],
        performCleanup: true,
        modifyContent: (filename, content) => {
          if (filename.includes('README')) {
            const noTitle = content.replace(
              /# [\s\S]*?##/,
              '# DevCycle VSCode Extension \n##',
            )
            return {
              content: removeDocsSections(noTitle, [
                'About DevCycle',
                'Documentation',
                'Sign Up for DevCycle',
                'Contributing',
              ]),
            }
          }
          return undefined
        },
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'github.feature-usage-action',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/DevCycleHQ/feature-flag-code-usage-action/main/',
        outDir: 'docs/integrations/github/feature-usage-action',
        documents: ['README.md'],
        performCleanup: true,
        modifyContent: (filename, content) => ({
          content:
            '# GitHub: Feature Flag Code Usages \n' +
            'Get the integration on the [GitHub Marketplace](https://github.com/marketplace/actions/devcycle-feature-flag-code-usages)\n' +
            content,
        }),
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'github.pr-insights-action',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/DevCycleHQ/feature-flag-pr-insights-action/main/',
        outDir: 'docs/integrations/github/pr-insights-action',
        documents: ['README.md'],
        performCleanup: true,
        modifyContent: (filename, content) => ({
          content:
            '# GitHub: Feature Flag Change Insights on Pull Request \n' +
            'Get the integration on the [GitHub Marketplace](https://github.com/marketplace/actions/devcycle-feature-flag-insights-for-pull-requests)\n' +
            content,
        }),
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'bitbucket.feature-usage-action',
        sourceBaseUrl:
          'https://bitbucket.org/devcyclehq/devcycle-code-refs-pipe/raw/main/',
        outDir: 'docs/integrations/bitbucket/feature-usage-action',
        documents: ['README.md'],
        performCleanup: true,
        modifyContent: (filename, content) => ({
          content:
            '# Bitbucket: Feature Flag Code Usages\n' +
            'Get the integration on the [Bitbucket Marketplace](https://bitbucket.org/product/features/pipelines/integrations?&p=devcyclehq/devcycle-code-refs-pipe)\n' +
            content,
        }),
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'bitbucket.pr-insights-action',
        sourceBaseUrl:
          'https://bitbucket.org/devcyclehq/devcycle-pr-insights-pipe/raw/main/',
        outDir: 'docs/integrations/bitbucket/pr-insights-action',
        documents: ['README.md'],
        performCleanup: true,
        modifyContent: (filename, content) => ({
          content:
            '# Bitbucket: Feature Flag Change Insights on Pull Request\n' +
            'Get the integration on the [Bitbucket Marketplace](https://bitbucket.org/product/features/pipelines/integrations?&p=devcyclehq/devcycle-pr-insights-pipe)\n' +
            content,
        }),
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'gitlab.feature-usage-action',
        sourceBaseUrl:
          'https://gitlab.com/devcycle/devcycle-usages-ci-cd/-/raw/main/',
        outDir: 'docs/integrations/gitlab/feature-usage-action',
        documents: ['README.md'],
        performCleanup: true,
        modifyContent: (filename, content) => ({
          content:
            '# GitLab: Feature Flag Code Usages \n' +
            'Get the integration here: https://gitlab.com/devcycle/devcycle-usages-ci-cd\n' +
            content,
        }),
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'gitlab.pr-insights-action',
        sourceBaseUrl:
          'https://gitlab.com/devcycle/devcycle-pr-insights-ci-cd/-/raw/main/',
        outDir: 'docs/integrations/gitlab/pr-insights-action',
        documents: ['README.md'],
        performCleanup: true,
        modifyContent: (filename, content) => ({
          content:
            '# GitLab: Feature Flag Change Insights on Merge Request\n' +
            'Get the integration here: https://gitlab.com/devcycle/devcycle-pr-insights-ci-cd\n' +
            content,
        }),
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'ai-prompts',
        sourceBaseUrl: `https://raw.githubusercontent.com/DevCycleHQ/AI-Prompts-And-Rules/${AI_PROMPTS_VERSION}/install-prompts/`,
        // Output into static so we can import via raw-loader and not compile as docs
        outDir: 'static/ai-prompts',
        documents: [
          'android-openfeature.md',
          'android.md',
          'angular.md',
          'dotnet-openfeature.md',
          'dotnet.md',
          'flutter.md',
          'go-openfeature.md',
          'go.md',
          'ios-openfeature.md',
          'ios.md',
          'java-openfeature.md',
          'java.md',
          'javascript-openfeature.md',
          'javascript.md',
          'nestjs-openfeature.md',
          'nestjs.md',
          'nextjs.md',
          'nodejs-openfeature.md',
          'nodejs.md',
          'php-openfeature.md',
          'php.md',
          'python-openfeature.md',
          'python.md',
          'react-native.md',
          'react-openfeature.md',
          'react.md',
          'roku.md',
          'ruby-openfeature.md',
          'ruby.md',
        ],
        performCleanup: true,
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
            [remarkEmbedder, { transformers: [[YouTubeTransformer]] }],
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
            spec: 'https://api.devcycle.com/openapi.json',
            route: '/management-api/',
          },
          {
            id: 'bucketing-api',
            spec: 'https://bucketing-api.devcycle.com/openapi.yaml',
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
  url: process.env.CF_PAGES
    ? 'https://docs.devcycle.com'
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
    // announcementBar: {
    //   id: 'support_us',
    //   content:
    //     'Ready to start feature flagging? Sign-up for a free <a target="_blank" rel="noopener noreferrer" href="https://devcycle.com">DevCycle account</a> today 🏳️',
    //   backgroundColor: 'rgb(17 24 39)',
    //   textColor: '#FFFFFF',
    //   isCloseable: false,
    // },
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
        'swift',
        'kotlin',
        'java',
        'clike',
        'scala',
        'hcl',
        'yaml',
        'csharp',
        'dart',
        'python',
        // Leave php disabled until this issue is fixed upstream: https://github.com/PrismJS/prism/issues/2769
        //'php'
      ],
    },
    algolia: {
      appId: 'JGOR5DGG3D',
      apiKey: 'da4a01ced1f7fb787b8a39cc7a719adf', // Public API key: it is safe to commit it
      indexName: 'DevCycle Documentation',
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
          type: 'docSidebar',
          sidebarId: 'home',
          position: 'left',
          collapse: 'false',
          label: 'Home',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sdks',
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
          type: 'docSidebar',
          sidebarId: 'cli_mcp',
          position: 'left',
          collapse: 'false',
          label: 'CLI / MCP',
        },
        {
          label: 'Best Practices',
          to: '/best-practices/',
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: [
            {
              href: 'https://blog.devcycle.com',
              label: 'Blog',
              target: '_blank',
              rel: null,
            },
          ],
        },
        {
          type: 'search',
          position: 'right',
        },
        // {
        //   href: 'https://devcycle.com/contact/request-demo',
        //   position: 'right',
        //   label: 'Book a Demo',
        //   className: 'navbar-book-demo',
        // },
        {
          href: 'https://app.devcycle.com/?isSignUp=true',
          position: 'right',
          className: 'header-signup-link',
          label: 'Sign Up',
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
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://blog.devcycle.com',
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
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DevCycle.`,
    },
  },
}

module.exports = config
