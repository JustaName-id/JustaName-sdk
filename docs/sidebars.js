/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig[]} */
const janSidebar = require("./docs/api-reference/sidebar.js")

const janSideBarWithSignMessage = janSidebar.map((sidebar) => {
    if(sidebar.label === 'Siwe'){
      return {
        ...sidebar,
        items: [
          sidebar.items[0],
          {
            "type": "doc",
            "id": "api-reference/siwe-sign-message",
            "label": "Sign Message",
            "className": "api-method sign"
          },
            sidebar.items[1]
        ]
      }
    }
    return sidebar;
})

const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  openApiSidebar: [
    {
      type: "category",
      label:"API",
      link: {
        type: "generated-index",
        title: "JustaName API",
        description:
            "This is the JustaName API reference documentation",
        slug: "/api-reference",

      },
      items:janSideBarWithSignMessage
    }
  ],
    // But you can create a sidebar manually
  tutorialSidebar: [
    'welcome',
    {
      type: 'category',
      label: "Purpose",
      items: ['purpose/why-we-exist']
    },

    {
      type: 'category',
      label: "Core Concepts",
      items: ['core-concepts/ens', 'core-concepts/ens-architecture' , 'core-concepts/ccip-read', 'core-concepts/justaname']
    }
  ],
};

module.exports = sidebars;
