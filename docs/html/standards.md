# 什么是严格模式与混杂模式

在 HTML 文档中，浏览器可以以两种模式解析页面：**严格模式 (Standards Mode)** 和 **混杂模式 (Quirks Mode)**。这两种模式直接影响浏览器如何渲染网页的内容和表现。

---

### 严格模式 (Standards Mode)

严格模式是浏览器根据最新的 **W3C 标准** 来解析和渲染网页内容的模式。它保证了网页尽可能按照现代浏览器的标准进行渲染，确保跨浏览器的一致性。

- **特点**：

- 页面严格遵循 HTML 和 CSS 的最新标准。
- 渲染效果更符合现代浏览器的渲染标准。
- 提供了更好的兼容性和一致性，减少不同浏览器之间的显示差异。

- **如何启用严格模式**：

- 在 HTML 文档的开头声明 `<!DOCTYPE html>`，即可让浏览器以严格模式渲染页面（推荐使用 HTML5 的 `DOCTYPE` 声明）。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>严格模式示例</title>
  </head>
  <body>
    <p>这是一个严格模式的页面。</p>
  </body>
</html>
```

### 混杂模式 (Quirks Mode)

混杂模式是为了兼容一些旧版浏览器的渲染规则。早期的浏览器渲染网页时没有遵循标准，存在很多不同的实现。因此，浏览器为了兼容这些旧标准，提供了混杂模式，在该模式下，浏览器会采用早期的非标准行为来渲染页面。

- 特点：

1. 浏览器使用旧的、不完全符合标准的渲染方式，特别是在 CSS 布局上表现出不同。
2. 它通常会导致各个浏览器之间的显示差异，特别是在处理盒模型、浮动和定位等方面。

- 如何进入混杂模式：

1. 如果 HTML 文档中没有正确声明 DOCTYPE，或者使用的是过时的 DOCTYPE 声明，浏览器可能会进入混杂模式。

```html
<!-- 缺少 DOCTYPE 声明，浏览器会进入混杂模式 -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>混杂模式示例</title>
  </head>
  <body>
    <p>这是一个混杂模式的页面。</p>
  </body>
</html>
```

### 严格模式与混杂模式的区别

- 标准遵循：严格模式完全遵循 W3C 标准，而混杂模式为了兼容早期浏览器，不遵循标准。
- 浏览器渲染差异：严格模式下，浏览器之间的渲染更加一致，而混杂模式下可能出现较大的差异。
- 盒模型的不同：在严格模式中，盒模型按照 W3C 标准计算；而在混杂模式中，盒模型的计算可能与标准不同，导致布局问题。
- 性能：严格模式通常性能更好，因为它遵循标准化的渲染流程，而混杂模式需要处理大量的兼容性问题，可能会影响性能。

### 总结

- **严格模式** 是现代浏览器渲染网页的标准方式，保证了跨浏览器的一致性和兼容性。
- **混杂模式** 主要为了向后兼容老旧的非标准网页，可能会导致页面显示效果不一致，不推荐使用。
- 为了避免进入混杂模式，始终在 HTML 文档的开头使用正确的 DOCTYPE 声明，例如 `<!DOCTYPE html>`（HTML5 标准声明）。
