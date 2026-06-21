---
tags: [math]
links:
  - https://github.com/typst/typst/issues/1191
  - https://github.com/typst/typst/issues/1478
  - https://github.com/typst/typst/issues/1767
  - https://github.com/typst/typst/issues/2562
  - https://github.com/typst/typst/issues/8516
---

# 如何让 cases 中某列右对齐？

<!-- https://github.com/typst-doc-cn/guide/issues/21#issuecomment-2912537322 -->

`cases`中的内容[刻意全部左对齐](https://github.com/typst/typst/issues/1478#issuecomment-2229249197)。

```typst
-- #set page(height: auto)
$ f = cases(
  137 & "if" (n+1) in NN,
  0   & "otherwise",
) $
```

若想让“otherwise”这列右对齐，可以换用`lr`，[使用`&`交替左右对齐](https://typst.app/docs/reference/math/#alignment)：

```typst {1-4}
-- #set page(height: auto)
#let lrcases(it) = math.lr(${$ + box(
  baseline: (at: horizon, shift: -0.25em),
  it,
))

#lrcases($
  & 137 & "if" (n+1) in NN \
  & 0   &      "otherwise"
$)

$ f = #lrcases($
  & 137 & "if" (n+1) in NN \
  & 0   &      "otherwise"
$) $
```

不过这样括号大小与两行间距可能与原版`cases`略有差异。如果介意，可调整[`lr`的`size`参数](https://typst.app/docs/reference/math/lr/#functions-lr-size)或[`box`的`inset`参数](https://typst.app/docs/reference/layout/box/#parameters-inset)，例如设置`math.lr(size: 110%, …)`或`box(inset: (y: 0.1em), …)`。

::: details 适用于 Typst v0.14.2 的旧方法

```typst v0.14.2 {1}
-- #set page(height: auto)
#let lrcases(it) = math.lr($\{$ + block(it))

#lrcases($
  & 137 & "if" (n+1) in NN \
  & 0   &      "otherwise"
$)

$ f = #lrcases($
  & 137 & "if" (n+1) in NN \
  & 0   &      "otherwise"
$) $
```

:::
