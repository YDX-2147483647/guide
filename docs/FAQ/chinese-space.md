---
tags: [chinese, bug, text]
links:
  - https://github.com/typst/typst/issues/8505
---

# 行内公式与中文之间没有自动空格

相关问题：想问下，typst 的盘古之白什么时候支持公式和文字之间的空格

临时修复方法：

```typst
-- #set page(height: auto, margin: 1em)
#show math.equation.where(block: false): it => h(0.25em, weak: true) + it + h(0.25em, weak: true)
汉字$A$汉字
```

## 已知副作用

若列表某项以公式开头，此法有时会添加多余空隙。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
= 默认效果
- $A$ 正常
+ $A$ 正常
/ term: $A$ 正常

= 此法效果
#show math.equation.where(block: false): it => {
  // 加宽前侧空隙以让副作用更易观察
  h(5em, weak: true) + it + h(0.25em, weak: true)
}

- $A$正常
+ $A$正常
/ term: $A$不正常
- $A$不正常#parbreak()
+ $A$不正常#parbreak()
```
