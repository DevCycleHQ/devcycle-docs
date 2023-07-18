module.exports = {
  home: [
    {
      type: 'category',
      label: 'Introduction',
      items: [{ type: "autogenerated", dirName: "home/introduction" }],
      collapsible: false,
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [{ type: "autogenerated", dirName: "home/getting-started" }],
      collapsible: true,
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [{ type: "autogenerated", dirName: "home/configuration" }],
      collapsible: true,
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [{ type: "autogenerated", dirName: "home/integrations" }],
      collapsible: true,
      collapsed: true,
    },
    {
      type: 'doc',
      label: 'Release Notes',
      id: 'home/release-notes', // The internal path
    },
  ],
  sdks: [
    {
      type: "category",
      label: "SDKs",
      link: {type: 'doc', id: 'sdk/index'},
      collapsed: false,
      collapsible: false,
      items: [{ type: "autogenerated", dirName: "sdk" }],
    }
  ],
  bestPractices: [
    {
    type: "category",
    label: "Best Practices",
    link: {type: 'doc', id: 'best-practices/index'},
    collapsed: false,
    collapsible: false,
    items: [{ type: "autogenerated", dirName: "best-practices" }],
    }
  ],
};
