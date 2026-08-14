---
outline: [2, 3]
tags: [font, text, chinese]
links:
  - https://github.com/typst/typst/issues/185
---

# 如何设置（中文）字体？

Typst 内置字体不含汉字，请按下文设置中文字体，否则随机选出的中文字体可能[非常魔幻](./strange-fonts.md)。

## 简单需求

在`*.typ`文档开头添加以下代码，即可设置语言为中文，设置字体为 Noto Serif CJK SC（谷歌发行的思源宋体简体中文版）。

```typst no-render
#set text(lang: "zh", font: "Noto Serif CJK SC")
```

以上设置只有安装了 Noto Serif CJK SC 字体才会生效。[typst.app](https://typst.app/app/) 已预装该字体，保证生效；如果本地使用发现无效，请按以下步骤安装思源宋体，或者参考后文[使用自己安装的其它字体](#view-fonts)。

1. 前往 [CERNET 校园网联合镜像站 → Adobe 字体 → 思源宋体 → 下载链接](https://help.mirrors.cernet.edu.cn/adobe-fonts/#source-han-serif-download)，保持默认选项，复制 Regular、Bold 两个链接并下载。

2. 安装上一步所得`*.otf`，一般双击文件即可。

3. （仅限 VS Code 用户）重启 VS Code。

4. 编辑`*.typ`文档，在开头添加以下代码。

   ```typst no-render
   #set text(lang: "zh", font: "Source Han Serif SC")
   ```

## 复杂需求

### 中英文分设字体 {#lang-fonts}

请如下设置，详见专门页面[中英文如何使用不同字体](./lang-fonts.md)。

```typst
-- #set page(width: 18em, height: auto, margin: 1em)
#set text(lang: "zh", font: (
  (name: "New Computer Modern", covers: "latin-in-cjk"), // English
  "Source Han Serif SC", // 中文
))
分别设置“中文”和English字体
```

### 使用自己安装的其它字体 {#view-fonts}

安装字体很简单，上传到 typst.app 或本地双击就行；但确定字体名称有时比较复杂。比如系统里显示「霞鹜文楷」，而 typst 的`#set text(font: …)`目前只认`LXGW WenKai`；再比如系统里显示 jf-openhuninn-2.1，而 typst 反而只认`jf open 粉圓 2.1`。

确定字体名称有下面这些方法。

- 编辑`*.typ`文档，输入`#set text(font: "`，利用自动补全确定字体名。

- 用 VS Code 打开`*.typ`文档，单击左边栏 → Tinymist → TOOL → Fonts，在新出现的窗口中搜索查看字体，单击 Copy / Insert / #set。

  如果左边栏没有 Tinymist，可按 F1 调出命令面板，搜索 Typst: Show Font View 或「Typst: 显示字体视图」，回车。

- 在命令行调用`typst fonts`。

  调用`typst fonts --variants`可显示字体文件路径，再加参数`--ignore-system-fonts --font-path …`可限制搜索目录。详见[`typst fonts --help`](https://man.archlinux.org/man/extra/typst/typst-fonts.1.en)。

### 设置的字体未生效？

1. 如果**全篇**都无效，请[检查字体**名称**](#view-fonts)是否有误

   这种情况编译应该会警告`warning: unknown font family: …`。

2. 如果**只是粗体**、斜体无效，请保证字体有所需**变体**

   这种情况编译没有警告。

   可用 VS Code Tinymist 字体视图或`typst fonts --variants`查看字体变体。

   若缺少，请检查是否完全安装了字体；确实没有可考虑用其它方法补救：[粗](./chinese-bold.md)、[斜](./chinese-skew.md)。

   <details>
   <summary><code>typst fonts --variants</code>输出示例</summary>

   以下 Source Han Serif 有多种字重（weight），支持加粗；

   ```
   Source Han Serif
     ├ C:\WINDOWS\Fonts\SourceHanSerifCN-ExtraLight.otf
     │   Style: Normal, Weight: 250, Stretch: 100%
     ├ C:\WINDOWS\Fonts\SourceHanSerifCN-Light.otf
     │   Style: Normal, Weight: 300, Stretch: 100%
     ├ C:\WINDOWS\Fonts\SourceHanSerifCN-Regular.otf
     │   Style: Normal, Weight: 400, Stretch: 100%
     ├ C:\WINDOWS\Fonts\SourceHanSerifCN-Medium.otf
     │   Style: Normal, Weight: 500, Stretch: 100%
     ├ C:\WINDOWS\Fonts\SourceHanSerifCN-Bold.otf
     │   Style: Normal, Weight: 700, Stretch: 100%
     ├ C:\WINDOWS\Fonts\SourceHanSerifCN-SemiBold.otf
     │   Style: Normal, Weight: 600, Stretch: 100%
     └ C:\WINDOWS\Fonts\SourceHanSerifCN-Heavy.otf
         Style: Normal, Weight: 900, Stretch: 100%
   ```

   而以下 SimSun 只有 400 一种常规字重，不支持加粗。

   ```
   SimSun
     └ C:\WINDOWS\Fonts\simsun.ttc
         Style: Normal, Weight: 400, Stretch: 100%
   ```

   </details>

### 使用不全局安装的字体 {#font-path}

如果不想全局安装字体，可将 font path(s) 指向字体所在目录。

- 命令行：使用参数`--font-path`或环境变量`$TYPST_FONT_PATHS`。详见`typst info`和[`typst compile --help`](https://man.archlinux.org/man/extra/typst/typst-compile.1.en)。
- VS Code Tinymist：设置`tinymist.fontPaths`。不过注意使用 VS Code 打开单文件（区别于打开文件夹）时这一功能可能不可用。
