// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ternoa',
  tagline: 'All resources you\'ll need to build the future on Ternoa',
  url: 'https://ternoa-docs-fzygq3gum-ternoa.vercel.app/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onDuplicateRoutes: 'warn', 
  favicon: 'img/favicon.ico',
  noIndex: true, //
  staticDirectories: ['public', 'static'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Ternoa', // Usually your GitHub org/user name.
  projectName: 'Ternoa-doc', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-GB',
        calendar: 'gregory',
        path: 'en'
      },
      fr: {
        label: 'Français',
        direction: 'ltr',
        htmlLang: 'fr-FR',
        calendar: 'gregory',
        path: 'fr',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      /*algolia: {
        appId: '', 
        apiKey: '', 
        indexName: '',
        contextualSearch: true,
      },*/
      announcementBar: {
        id: 'annoucementBar-0',
        content:
          'FR version WIP <a target="_blank" rel="noopener noreferrer" href="#">english version</a>.',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      navbar: {
        hideOnScroll: false, 
        title: 'Ternoa',
        logo: {
          alt: 'Ternoa Logo',
          src: '/img/ternoa_logo.svg',
          width: 40,
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/capsule-corp-ternoa',
            label: 'GitHub',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true, 
        }
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ternoa, Inc. Built with Docusaurus.`,
      },
      colorMode: {
          defaultMode: 'dark', 
          disableSwitch: false, 
          respectPrefersColorScheme: false,
        },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
