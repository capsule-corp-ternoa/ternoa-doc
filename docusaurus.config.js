// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/dracula");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Build your web3 project on Ternoa",
  tagline: "Accelerate your web3 development with our easy-to-use Ternoa.js SDK, guides, and tutorials",
  url: "https://docs.ternoa.network/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  onDuplicateRoutes: "warn",
  favicon: "img/favicon.ico",
  noIndex: true,
  staticDirectories: ["public", "static"],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Ternoa", // Usually your GitHub org/user name.
  projectName: "Ternoa-doc", // Usually your repo name.
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    path: "i18n",
    localeConfigs: {
      en: {
        label: "English",
        direction: "ltr",
        htmlLang: "en-GB",
        calendar: "gregory",
        path: "en",
      },
      /*fr: {
        label: 'Français',
        direction: 'ltr',
        htmlLang: 'fr-FR',
        calendar: 'gregory',
        path: 'fr',
      },*/
    },
  },

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // {
          //   to: "/discover-ternoa",
          //   from: [
          //     "/welcome",
          //     "/general",
          //     "/general/join-the-community",
          //     "/general/contibutors",
          //     "/general/ambassador-program",
          //     "/general/accelerator-program",
          //     "/general/code-of-conduct",
          //   ],
          // },
          {
            to: "/wiki/how-to-stake-on-ternoa",
            from: "/general/how-to-stake-on-ternoa",
          },
          {
            to: "/category/features",
            from: [
              "/category/nft-primitives",
              "/wiki/nft-features/collections",
              "/wiki/nft-features/marketplace",
              "/wiki/nft-features/auctions",
              "/wiki/nft-features/rental",
            ],
          },
          {
            to: "/for-developers/overview",
            from: "/wiki/explorer",
          },
        ],
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-WVJQ0JRBZK",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: "JDLVU0U8IU",
        apiKey: "970f1b0558f5a511df9cc0ad33a97c09",
        indexName: "ternoa_doc",
        contextualSearch: true,
      },
      /*announcementBar: {
        id: 'annoucementBar-0',
        content:
          'FR version WIP <a target="_blank" rel="noopener noreferrer" href="#">english version</a>.',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },*/
      navbar: {
        hideOnScroll: false,
        title: "ternoa",
        logo: {
          alt: "Ternoa Logo",
          src: "/img/ternoa_logo.svg",
          width: 40,
        },
        items: [
          // {
          //   type: 'dropdown',
          //   label: 'Docs',
          //   position: 'left',
          //   items: [
          //     {
          //       type: 'doc',
          //       label: 'Discover Ternoa',
          //       docId: 'discover-ternoa/index',
          //     },
          //     {
          //       type: 'doc',
          //       label: 'What is Ternoa',
          //       docId: 'discover-ternoa/what-is-ternoa',
          //     },
          //     {
          //       type: 'doc',
          //       label: 'Explore Features',
          //       docId: 'discover-ternoa/explore-ternoa-features',
          //     },
          //   ],
          // },
          {
            type: 'dropdown',
            label: 'SDK',
            position: 'left',
            items: [
              {
                type: 'doc',
                label: 'Overview',
                docId: 'for-developers/overview',
              },
              {
                type: 'doc',
                label: 'Developer Guides',
                docId: 'for-developers/guides/index',
              },
              {
                type: 'doc',
                label: 'Advanced Guides',
                docId: 'for-developers/advanced-guides/index',
              },
            ],
          },
          {
            href: "https://github.com/capsule-corp-ternoa",
            className: "pseudo-icon github-icon",
            position: "right",
          },
          {
            href: "https://discord.com/invite/mQeEWQj46a",
            className: "pseudo-icon discord-icon discord-card",
            position: "right",
          },
          {
            type: "search",
            position: "right",
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: "light",
        logo: {
          href: "https://www.ternoa.network/",
          src: "/img/ternoa_logo.svg",
          alt: "Ternoa Doc",
          height: "38px",
        },
        links: [
          {
            title: "Documentation",
            items: [
              // {
              //   label: "Welcome",
              //   to: "discover-ternoa/what-is-ternoa",
              // },
              {
                label: "Ternoa Wiki",
                to: "/category/wiki",
              },
              {
                label: "For Developers",
                to: "/for-developers",
              },
              {
                label: "For Node Operators",
                to: "/category/for-node-operators",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/mQeEWQj46a",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/ternoa_",
              },
              {
                label: "GitHub",
                href: "https://github.com/capsule-corp-ternoa/ternoa-js",
              },
            ],
          },
          {
            title: "About Ternoa",
            items: [
              {
                label: "Ternoa",
                href: "https://www.ternoa.network/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ternoa Documentation, Inc. Built with Docusaurus.`,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["rust"],
      },
    }),
};

module.exports = config;
