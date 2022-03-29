const path = require('path')

/**
 * @type {Partial<import('@docusaurus/types').DocusaurusConfig>}
 */
const config = {
  trailingSlash: false,
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
      };
    },
    path.resolve(__dirname, 'plugins', 'custom-gtm')
  ],


  presets: [
    [
      '@docusaurus/preset-classic',
      {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        docs: {
          editUrl: ({versionDocsDirPath, docPath}) => `https://github.com/devcyclehq/devcycle-docs/edit/main/${versionDocsDirPath}/${docPath}`,
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          editCurrentVersion: true,
          sidebarPath: require.resolve('./sidebars.js')
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
            spec: 'https://docs.devcycle.com/bucketing-api.yaml',
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
      description: 'The DevCycle documentation site includes guides and API documentation for the complete platform including the management dashboard, management APIs, SDKs, and more. If you need help along the way feel free to reach out to support and if you don’t have an account yet, you can create a free account now.',
    },
  },
  url: (process.env.VERCEL_ENV === 'production') ? "https://docs.devcycle.com" : (process.env.VERCEL_URL) ? "https://" + process.env.VERCEL_URL : 'http://localhost:3000',
  baseUrl: '/',
  favicon: 'devcycle_favicon.ico',
  themeConfig: {
    prism: {
      additionalLanguages: ['ruby', 'go', 'php', 'swift', 'kotlin', 'java', 'clike', 'scala']
    },
    algolia: {
      appId: '6TW93YPS4X',
      apiKey: '2a9dbde35586f5ae29571b19dacc71c6', // Public API key: it is safe to commit it
      indexName: 'prod_DEVCYCLE_DOCS',
    },
    navbar: {
      logo: {
        alt: 'DevCycle Logo',
        src: 'devcycle-docs-full-colour.svg',
        srcDark: 'devcycle-docs-white.svg',
      },
      items: [
        {
          position: 'left',
          label: 'DevCycle Usage',
          docId: 'home/introduction',
          collapse: 'false',
          type: 'doc'
        },
        {
          type: 'doc',
          docId: 'sdk/sdk-types',
          position: 'left',
          collapse: 'false',
          label: 'SDKs',
        },
        {
          docId: 'tools-and-integrations/integrations',
          position: 'left',
          label: 'Tools & Integrations',
          type: 'doc'
        },
        {
          label: 'Management API',
          position: 'left',
          to: '/management-api/',
        },
        {
          label: 'Bucketing API',
          position: 'left',
          to: '/bucketing-api/',
        },
        {
          // type: 'page',
          to: '/coming-soon',
          position: 'left',
          label: 'Best Practices',
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
              label: 'Medium',
              href: 'https://medium.com/devcycle',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DevCycle.`,
    },
  },
};

module.exports = config;
