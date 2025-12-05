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
  { label: 'Quickstart', link: '/quickstart' },
  { label: 'Customize', link: '/customize' },
  chatkitTypeDocSidebarGroup,
  {
    label: 'Managed backend',
    items: [
      {
        label: 'ChatKit API',
        link: 'https://platform.openai.com/docs/guides/chatkit',
      },
    ],
  },
  {
    label: 'Self-hosted backend',
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
