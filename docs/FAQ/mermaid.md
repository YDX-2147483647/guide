---
tags: [svg, mermaid, tool]
outline: [2, 3]
---

# 为什么 mermaid/draw.io 生成的 SVG 图片导入后没有文字？

参考 [Working with mermaid in typst](https://github.com/typst/typst/discussions/3090#discussioncomment-7960440)，[mermaid](https://mermaid.js.org/) 和 [draw.io](https://app.diagrams.net/) 默认生成的 SVG 图片含有 HTML [Foreign Object](https://github.com/typst/typst/issues/1421)，因此只能在浏览器中正常显示，导入到 Typst 后文字会消失。

目前推荐首先使用 [mermaid cli](https://github.com/mermaid-js/mermaid-cli) 导出 PDF，再使用 [mutool draw](https://mupdf.readthedocs.io/en/latest/tools/mutool-draw.html) 将 PDF 转换为 SVG。

::: details 如何下载 mutool

[前往 MuPDF Releases 并选择 MuPDF](https://mupdf.com/releases?product=MuPDF)，然后下载最新的`mupdf-*-windows.zip`（~90 MB），使用其中的`mutool.exe`（~40 MB）。

注意每个 1.x 版本的最后若干 0.x.y patch 版本只提供源代码（source only），没有能直接下载的可执行文件。请在页面内搜索`-windows.zip`找能下载的版本。

:::

```bash
# mermaid → PDF
mmdc --input in.mmd --output out.pdf --pdfFit

# PDF → SVG
mutool draw -o final.svg out.pdf

# 去除 mutool 自动加的页码
mv final1.svg final.svg
```

或直接使用位图格式（PNG/JPG）。

## 另法：直接在 Typst 内画图

另外也可考虑用[各种 Typst 包](https://typst.app/universe/search/?q=mermaid)直接绘图。这些包通常采用 rust 复刻版 mermaid.js，往往与原版不完全兼容。

::: details oxdraw

[oxdraw – Typst Universe](https://typst.app/universe/package/oxdraw)
[![typst repo stars](https://img.shields.io/github/stars/hongjr03/typst-oxdraw?style=flat-square&label=typst%20repo%20stars){class="badge"}](https://github.com/hongjr03/typst-oxdraw)
[![upstream repo stars](https://img.shields.io/github/stars/RohanAdwankar/oxdraw?style=flat-square&label=upstream%20repo%20stars){class="badge"}](https://github.com/RohanAdwankar/oxdraw)

不过 oxdraw 使用 [rust 复刻版 oxdraw](https://github.com/RohanAdwankar/oxdraw) 渲染，语法与原版 mermaid 不完全兼容。例如，`-->`前不允许换行，不然会报以下错误。

> plugin errored with: Failed to parse diagram: encountered empty node reference

oxdraw 由国人打包，所以中文支持相对好一些。

````typst
-- #set page(height: auto, width: auto, margin: 1em)
#import "@preview/oxdraw:0.1.0": oxdraw

#oxdraw(```mermaid
graph LR
  subgraph 五行
    金[金 🔑]
    木[木 🌳]
    土[土 ⛰️]
    水[水 🌊]
    火[火 🔥]
  end
  subgraph 四元素
    earth[土 ⛰️]
    water[水 🌊]
    air[气 💨]
    fire[火 🔥]
  end

  火 --> fire
  土 --> earth
  水 --> water
```)
````

:::

::: details mmdr (mermaid-rs-renderer)

[mmdr – Typst Universe](https://typst.app/universe/package/mmdr)
[![typst repo stars](https://img.shields.io/github/stars/HSGamer/typst-mmdr?style=flat-square&label=typst%20repo%20stars){class="badge"}](https://github.com/HSGamer/typst-mmdr)
[![upstream repo stars](https://img.shields.io/github/stars/1jehuang/mermaid-rs-renderer?style=flat-square&label=upstream%20repo%20stars){class="badge"}](https://github.com/1jehuang/mermaid-rs-renderer)

不过 mmdr 使用 [rust 复刻版 mermaid-rs-renderer](https://github.com/1jehuang/mermaid-rs-renderer)渲染，语法与原版 mermaid 不完全兼容。例如，`-->`前不允许换行，否则会理解为`- →`。

此外，在 https://typst.app 上，`土`等汉字无法显示。

````typst
-- #set page(height: auto, width: auto, margin: 1em)
#import "@preview/mmdr:0.2.2": mermaid

#mermaid(
  ```mermaid
  flowchart LR
    subgraph 五行
      金[金 🔑]
      木[木 🌳]
      土[土 ⛰️]
      水[水 🌊]
      火[火 🔥]
    end
    subgraph 四元素
      earth[土 ⛰️]
      water[水 🌊]
      air[气 💨]
      fire[火 🔥]
    end

    火 --> fire
    土 --> earth
    水 --> water
  ```.text,
  base-theme: "default"
)
````

:::

::: details merman

[merman – Typst Universe](https://typst.app/universe/package/merman)
[![repo stars](https://img.shields.io/github/stars/Latias94/merman?style=flat-square&label=repo%20stars){class="badge"}](https://github.com/Latias94/merman)

不过 merman 使用 [rust 复刻版 merman](https://github.com/Latias94/merman)渲染，语法与原版 mermaid 不完全兼容。例如 node 名称不能包含汉字，不然会报以下错误。

> panicked with: Diagram parse error (flowchart-v2): `User { error: LexError { message: "Unexpected character at ○○" } }`

````typst
-- #set page(height: auto, width: auto, margin: 1em)
#import "@preview/merman:0.1.0": mermaid

#mermaid(
  ```mermaid
  flowchart LR
    subgraph 五行
      Metal[金 🔑]
      Wood[木 🌳]
      Earth[土 ⛰️]
      Water[水 🌊]
      Fire[火 🔥]
    end
    subgraph 四元素
      earth[土 ⛰️]
      water[水 🌊]
      air[气 💨]
      fire[火 🔥]
    end

    Fire --> fire
    Earth --> earth
    Water --> water
  ```.text,
)
````

:::
