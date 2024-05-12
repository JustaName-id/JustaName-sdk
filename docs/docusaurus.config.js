// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "JustaName",
  tagline: "JustaName SDK",
  url: "https://docs.justaname.id",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "JustaName-id", // Usually your GitHub org/user name.
  projectName: "JustaName-sdk", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          remarkPlugins: [
            [require("remark-oembed"), { syncWidget: true }],
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
              [require("remark-math"), { sync: true}]
          ],
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
        },
      },
      navbar: {
        title: "JustAName Docs",
        logo: {
          alt: "JustAName Logo",
          src: "img/jan-logo.webp",
        },
        items: [
          {
            label: "SDK",
            position: "left",
            to: "/sdk",
          },
          {
            label: "API Reference",
            position: "left",
            to: "/api-reference",
          },
          {
            label:'GitHub',
            href: 'https://github.com/JustaName-id/JustaName-sdk',
            position: 'right',
          }
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Welcome",
                to: "/",
              },
              {
                label: "SDK",
                to: "/sdk",
              },
              {
                label: "API Reference",
                to: "/api-reference",
              }
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/justaname_id",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/JustaName-id/JustaName-sdk",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} JustAName. Built by JustALab.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["ruby", "csharp", "php"],
      },
    }),

  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        id:'sdk-core',
        entryPoints: [
          '../packages/@justaname.id/sdk/src/index.ts'
        ],
        tsconfig: '../packages/@justaname.id/sdk/tsconfig.json',
        out: 'sdk/core',
        sidebar: {
          categoryLabel: 'Core SDK',
          collapsed: false,
          position: 2,
        }
      }
    ],
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        id:'sdk-react',
        entryPoints: [
          '../packages/@justaname.id/react/src/index.ts'
        ],
        tsconfig: '../packages/@justaname.id/react/tsconfig.json',
        out: 'sdk/react',
        sidebar: {
          categoryLabel: 'React SDK',
          collapsed: false,
          position: 2,
        }
      }
    ],
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          siwe: {
            specPath: "swagger/swagger.json",
            outputDir: "docs/api-reference",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          },
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
};

module.exports = config;
