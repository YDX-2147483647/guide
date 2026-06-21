---
tags: [math]
links:
  - https://github.com/typst/typst/issues/1528
  - https://github.com/typst/codex/pull/132
  - https://github.com/typst/typst/pull/8330
---

# 如何输入胖胖的好看的空集符号？

::: tip ✅ Typst 0.15 已变化
[#7597](https://github.com/typst/typst/pull/7597) 将 New Computer Modern 字体的版本更新到了 7.1.0。新版字体修改了 ∅ 的设计，现在默认就是圆的了。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#sys.version 默认 $A inter B = emptyset$
```

如需恢复旧版设计，可如下使用`emptyset.zero`或设置`cv02`。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
$emptyset, emptyset.zero$

#show math.equation: set text(features: ("cv02",))
$emptyset$
```

:::

也就是 LaTeX 的 `\varnothing` 或者 `\diameter`

```typst v0.14.2
-- #set page(width: auto, height: auto, margin: 1em)
-- #set align(right)
#sys.version 默认 $A inter B = emptyset$

#show math.equation: set text(features: ("cv01",))
修改结果 $A inter B = emptyset$
```

热知识：这个符号实际上是直径的意思；默认的写法，0 加一条斜线才是正版的空集。在 CAD 尺寸标注中，⌀20 表示直径 20mm。
