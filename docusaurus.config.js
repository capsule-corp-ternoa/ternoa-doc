// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/dracula');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ternoa Documentation',
  tagline: 'All resources you\'ll need to build the future on Ternoa',
  url: 'https://docs.ternoa.network/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onDuplicateRoutes: 'warn', 
  favicon: 'img/favicon.ico',
  noIndex: true, 
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
      /*fr: {
        label: 'Français',
        direction: 'ltr',
        htmlLang: 'fr-FR',
        calendar: 'gregory',
        path: 'fr',
      },*/
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
        title: 'Ternoa Documentation',
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
            label: 'Docs',
          },
          {
            href: 'https://github.com/capsule-corp-ternoa',
            className: 'pseudo-icon github-icon',
            position: 'right',
          },
          {
            href: 'https://discord.com/invite/mQeEWQj46a',
            className: 'pseudo-icon discord-icon discord-card',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
          /*{
            type: 'localeDropdown',
            position: 'right',
          },*/
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true, 
        }
      },
      footer: {
        style: 'light',
        logo: {
          href: 'https://www.ternoa.com/',
          src: '/img/ternoa_logo.svg',
          alt: 'Ternoa Doc',
          height: '38px',
        },
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Welcome',
                to: '/docs/intro',
              },
              {
                label: 'Ternoa Fundamentals',
                to: '/docs/category/ternoa-fundamentals',
              },
              {
                label: 'For Developers',
                to: '/docs/category/for-developers',
              },
              {
                label: 'For Node Operators',
                to: '/docs/category/for-node-operators',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/mQeEWQj46a',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/ternoa_',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/capsule-corp-ternoa/ternoa-js',
              },
            ],
          },
          {
            title: 'About Ternoa',
            items: [
              {
                label: 'Ternoa',
                href: 'https://www.ternoa.com/',
              },
              {
                label: 'Wiki Ternoa',
                href: 'https://wiki.ternoa.network/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ternoa Documentation, Inc. Built with Docusaurus.`,
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
