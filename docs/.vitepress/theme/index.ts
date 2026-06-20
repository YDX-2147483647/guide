import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client';
import '@nolebase/vitepress-plugin-git-changelog/client/style.css';

import 'virtual:uno.css';

import Layout from './Layout.vue';
import FAQList from './FAQList.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: Layout,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('FAQList', FAQList);
    app.use(NolebaseGitChangelogPlugin);
  },
} satisfies Theme;
