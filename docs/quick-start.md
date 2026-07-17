# 快速开始

## 在线使用

适用场景：快速，免安装，多人协作。

打开官网 [typst.app](https://typst.app/)，注册账号。新建文档即可。

<!--TODO
截图
--->

（官方出品的 [Pro](https://typst.app/pricing/)，热心的朋友可以试试，算是打赏一下开发者~）

## 本地使用

### VS Code（推荐）

适用场景：深度自定义，离线使用，顾及隐私。（补全体验也比官方好亿点点哦）

1. [安装 VS Code](https://code.visualstudio.com/)。

2. 单击左侧扩展图标，搜索 [Tinymist Typst 插件](https://marketplace.visualstudio.com/items?itemName=myriad-dreamin.tinymist)并安装。

![](images/20240715222928.png)

Tinymist 还集成了 [Typstyle](https://typstyle-rs.github.io/typstyle/) 代码格式化功能，可按 Shift+Alt+F 使用。

安装后 Typst 应该能扫描到系统中安装的字体。如果遇到问题，可参考[如何设置（中文）字体](./FAQ/install-fonts.md)。

::: warning
不要安装 Typst LSP 插件或 Typst Preview 插件，这两个插件已废弃，功能已经整合到 Tinymist 插件中。

如果之前安装了这两个插件请卸载，否则会导致冲突。
:::

### Vim/Helix/Zed/…

请参考 [Editor Frontends – Tinymist Docs](https://myriad-dreamin.github.io/tinymist/frontend/main.html)。

### 命令行

Typst 的命令行工具可以通过多种方式获取，详见 [Typst 官网 → Open Source → Go to downloads](https://typst.app/open-source/#download)。网站为各操作系统提供了手动下载、包管理器等安装方式，并包含`PATH`环境变量的配置说明。

安装后可参考[官方仓库的 README](https://github.com/typst/typst?tab=readme-ov-file#usage) 在命令行编译`*.typ`文档。
