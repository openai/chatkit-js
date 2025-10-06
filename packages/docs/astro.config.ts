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
    label: 'Guides',
    items: [
      { label: 'Authentication', link: '/guides/authentication' },
      {
        label: 'Theming & Customization',
        link: '/guides/theming-customization',
      },
      { label: 'Methods', link: '/guides/methods' },
      { label: 'Events', link: '/guides/events' },
      { label: 'Client Tools', link: '/guides/client-tools' },
      { label: 'Entity tagging', link: '/guides/entities' },
      { label: 'Custom Backends', link: '/guides/custom-backends' },
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
];

export default defineConfig({
  site: 'https://openai.github.io/chatkit-js/',

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
