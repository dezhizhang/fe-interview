# 什么是 DOCTYPE

`DOCTYPE` 是 HTML 文档的声明，位于文档的最顶端，告诉浏览器以什么标准来解析 HTML 文件。它并不是一个 HTML 标签，而是一种声明。

### 作用

1. **声明文档类型**：`DOCTYPE` 的主要作用是告知浏览器当前 HTML 文档使用的是哪种 HTML 或 XML 版本。通过这个声明，浏览器能够按照指定的文档类型渲染网页。

2. **启用标准模式**：
- `DOCTYPE` 启动了浏览器的 **标准模式**，确保页面按现代 HTML 标准进行渲染。
- 如果没有 `DOCTYPE` 声明，浏览器可能会进入 **混杂模式**（Quirks Mode），即使用老式的渲染模式，可能导致页面布局和样式无法正常显示。

### 常见的 DOCTYPE

1. **HTML5 DOCTYPE**：

```html
<!DOCTYPE html>
```

- 这是 HTML5 的文档类型声明，最简洁，也兼容所有浏览器。

2. **HTML5 HTML 4.01 Strict DOCTYPE**：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

- 这是 HTML 4.01 的严格模式文档类型，要求文档完全符合标准，不允许使用过时的元素。

3. **XHTML 1.0 Strict DOCTYPE**：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- 这是 XHTML 1.0 的严格模式，要求文档以 XML 形式编写和渲染。

### 总结

- DOCTYPE 声明在 HTML 文档中起到标明文档类型和开启标准模式的作用，确保浏览器能够按照正确的渲染标准解析和展示页面内容。在现代 HTML5 开发中，推荐使用简洁的 <!DOCTYPE html> 声明。
