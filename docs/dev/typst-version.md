---
outline: [2, 3]
---

# 标注 Typst 版本

将 git 历史与 Typst 版本发布记录比较，在每页 [Git-based page histories | Nólëbase Integrations](https://nolebase-integrations.ayaka.io/pages/en/integrations/vitepress-plugin-git-changelog/) 中插入 Typst 历史版本，并在`<Layout>`页脚标注最后更新时针对的 Typst 版本。

## 使用方法

无需专门设置。

## 前提条件

构建文档时，有完整 git 历史。设置方法参考[最后更新于 | VitePress](https://vitepress.dev/zh/reference/default-theme-last-updated#frontmatter-config)。

## 实现细节

### 版本发布记录

为避免依赖 GitHub API，每次 Typst 发布新版本后，需要手动更新。更新方法见`typst_version.ts`。

### 适配 Nólëbase

通过 vite 扩展`TypstTagsForNolebase`创建[虚拟模块](https://vite.dev/guide/api-plugin#virtual-modules-convention)`virtual:zhtyp-guide-typst-version`，然后通过`pnpm patch @nolebase/vitepress-plugin-git-changelog`读取该模块并定制展示方式。
