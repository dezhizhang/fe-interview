# HTML 中 src、href 和 link 的区别

## 1. src 属性

- **定义**：src（source）属性用于指定外部资源的 URL，通常用于嵌入内容。
- **常用元素**：
- `<img>`：指定图片来源。

```html
<img src="image.jpg" alt="描述" />
```

- <script>：指定 JavaScript 文件来源。

```html
<script src="script.js"></script>
```

- `<iframe>`：指定嵌入的文档来源。

```html
<iframe src="https://example.com"></iframe>
```

## 2. href 属性

- **定义**：href（hypertext reference）属性用于指定链接的目标 URL。
- **常用元素**：
- `<a>`：超链接，用于导航到其他页面或资源。
  ```html
  <a href="https://example.com">访问网站</a>
  ```
- `<link>`：在文档中定义外部样式表。
  ```html
  <link href="styles.css" rel="stylesheet" />
  ```

## 3. <link> 元素

- **定义**：`<link>`元素用于在 HTML 文档中链接外部资源，通常是样式表。
- **属性**：
- href：指定资源的 URL。
- `rel`：定义与目标资源的关系，如 `stylesheet` 表示链接的是样式表。
- **示例**：

```html
<link href="styles.css" rel="stylesheet" />
```
