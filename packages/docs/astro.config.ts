import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import {
  createStarlightTypeDocPlugin,
  type StarlightTypeDocOptions,
} from 'starlight-typedoc';
const [chatkitStarlightTypeDoc, chatkitTypeDocSidebarGroup] =
  createStarlightTypeDocPlugin();

const typeDocConfig: StarlightTypeDocOptions['typeDoc'] = {
  useCodeBlocks: true,
  parametersFormat: 'htmlTable',
  propertyMembersFormat: 'htmlTable',

  disableSources: true,
  expandObjects: true,
  expandParameters: true,
  formatWithPrettier: true,
  prettierConfigFile: '../../.prettierrc',
  excludeExternals: true,
  entryPointStrategy: 'Packages',
  sort: ['source-order'],
  plugin: [
    'typedoc-plugin-zod',
    'typedoc-plugin-frontmatter',
    'typedoc-plugin-no-inherit',
  ],
  tableColumnSettings: {
    hideSources: true,
    hideModifiers: true,
    hideOverrides: true,
  },
  visibilityFilters: {
    protected: true,
    private: true,
    external: false,
  },
};

const sidebar = [
  { label: 'Overview', link: '/' },
  {
    label: 'Authenticate users',
    collapsed: true,
    items: [
      {
        label: 'Hosted backend (client secrets)',
        link: '/guides/authenticate-hosted',
      },
      {
        label: 'Custom backend (custom fetch)',
        link: '/guides/authenticate-custom',
      },
    ],
  },
  {
    label: 'Customize',
    collapsed: true,
    items: [
      { label: 'Overview', link: '/guides/customize' },
      { label: 'Theme', link: '/guides/customize-theme' },
      { label: 'Header & history', link: '/guides/customize-header-history' },
      { label: 'Start screen', link: '/guides/customize-start-screen' },
      { label: 'Composer', link: '/guides/customize-composer' },
      {
        label: 'Thread item actions',
        link: '/guides/customize-thread-item-actions',
      },
    ],
  },
  {
    label: 'Connect to your app',
    collapsed: true,
    items: [
      { label: 'Register callbacks', link: '/guides/register-callbacks' },
      { label: 'Call ChatKit methods', link: '/guides/methods' },
      {
        label: 'Handle runtime events',
        link: '/guides/runtime-events',
      },
    ],
  },
  {
    label: 'Go live',
    collapsed: true,
    items: [
      { label: 'Overview', link: '/guides/go-live' },
      { label: 'Provide domain keys', link: '/guides/provide-domain-keys' },
      { label: 'Monitor logs', link: '/guides/monitor-logs' },
      // { label: 'Update CSP settings', link: '/guides/update-csp-settings' },
      // { label: 'Scope user data', link: '/guides/scope-user-data' },
      { label: 'Localization', link: '/guides/localization' },
    ],
  },
  chatkitTypeDocSidebarGroup,
  {
    label: 'Custom Backends',
    items: [
      {
        label: 'Python SDK',
        link: 'https://openai.github.io/chatkit-python',
      },
    ],
  },
  {
    label: 'Examples',
    items: [
      {
        label: 'Starter App',
        link: 'https://github.com/openai/openai-chatkit-starter-app',
      },
      {
        label: 'Advanced Samples',
        link: 'https://github.com/openai/openai-chatkit-advanced-samples',
      },
    ],
  },
];

export default defineConfig({
  site: 'https://openai.github.io',
  base: '/chatkit-js',

  integrations: [
    starlight({
      plugins: [
        chatkitStarlightTypeDoc({
          sidebar: { label: 'API Reference' },
          entryPoints: ['../chatkit', '../chatkit-react'],
          tsconfig: '../chatkit/tsconfig.json',
          typeDoc: typeDocConfig,
        }),
      ],
      title: 'OpenAI Agent Embeds',
      components: {
        SiteTitle: './src/components/Title.astro',
        PageTitle: './src/components/PageTitle.astro',
        SocialIcons: './src/components/SocialIcons.astro',
        Sidebar: './src/components/Sidebar.astro',
        MobileMenuFooter: './src/components/MobileFooter.astro',
      },
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      editLink: {
        baseUrl:
          'https://github.com/openai/openai-agents-js/edit/main/packages/docs/',
      },
      sidebar,
      expressiveCode: {
        themes: ['github-light', 'github-dark'],
      },
      customCss: ['./src/styles/global.css'],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
