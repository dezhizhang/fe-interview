# 前端页面的三层构成

前端页面通常由以下三层组成，每一层负责不同的功能，协同工作构建出完整的网页：

1. **结构层 (Structure Layer) — HTML**

- **作用**: 用于定义网页的内容和结构。
- **技术**: 主要使用 **HTML (HyperText Markup Language)** 来编写。
- **功能**: HTML 定义了页面的标题、段落、列表、图片、链接等内容的排列方式，确保页面内容有逻辑地展现在浏览器上。

```html
<h1>页面标题</h1>
<p>这是一个段落。</p>
<ul>
  <li>列表项 1</li>
  <li>列表项 2</li>
</ul>
```

2. **表现层 (Presentation Layer) — CSS**

- **作用**: 用于控制网页的视觉样式和布局。
- **技术**: 主要使用 CSS (Cascading Style Sheets) 来编写。
- **功能**: CSS 控制页面的颜色、字体、布局、间距、响应式设计等视觉效果，使页面更美观和用户友好。

```css
h1 {
  color: blue;
  font-size: 24px;
}
p {
  color: gray;
  line-height: 1.5;
}
```

2. **行为层 (Behavior Layer) — JavaScript**

- **作用**: 用于实现网页的交互功能和动态行为。
- **技术**: 主要使用 JavaScript 以及相关框架（如 React、Vue、Angular）来编写。
- **功能**: JavaScript 负责用户交互、事件处理、动态数据更新、异步请求等功能，使网页能够响应用户的操作，提供更好的用户体验。

```js
document.querySelector('button').addEventListener('click', function () {
  alert('按钮被点击了！');
});
```

### 三层的关系

- HTML 是页面的骨架，定义了内容的组织和呈现；
- CSS 负责美化和布局，控制内容的外观；
- JavaScript 提供交互和动态功能，使页面更加生动和响应用户的操作。

### 总结

- 前端页面由结构层（HTML）、表现层（CSS）和行为层（JavaScript）共同构成。这三层各司其职，构建了一个完整的用户界面，提供内容展示、视觉样式和交互行为，最终为用户呈现一个功能丰富的网页。
