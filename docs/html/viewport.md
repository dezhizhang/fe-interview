### `<meta name="viewport">` 的作用

`<meta name="viewport">` 标签用于控制浏览器的视口（viewport）设置，主要用于响应式网页设计。它在移动设备上特别重要，帮助开发者控制页面的缩放、布局和显示。

---

#### 1. 视口的定义

视口是指浏览器可视区域的大小。在移动设备上，视口的大小通常会影响页面的渲染和用户体验。通过设置适当的视口属性，可以确保网页在不同设备上的适配性。

---

#### 2. 主要作用

- **控制缩放**：
- 通过设置 `initial-scale`、`maximum-scale` 和 `minimum-scale` 属性，开发者可以控制页面的初始缩放比例及用户的缩放限制。
- **适配不同设备**：

- 通过设置 `width` 属性为 `device-width`，网页能够自动适配不同屏幕尺寸的设备，避免横向滚动条的出现。

- **改善用户体验**：
- 适当设置视口可以提高用户在移动设备上的阅读和交互体验，使内容更加易读和易操作。

---

#### 3. 常用设置

以下是常见的 `<meta name="viewport">` 设置示例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- width=device-width：设置视口宽度为设备宽度，使页面宽度与设备屏幕宽度一致。
- initial-scale=1.0：设置页面的初始缩放比例为 1，即不缩放。

#### 4. 常见属性

- width：设置视口的宽度。可以使用 device-width 表示设备宽度，也可以设置为具体的像素值。
- height：设置视口的高度（不常用）。
- initial-scale：定义页面的初始缩放比例。
- maximum-scale：定义用户可以放大的最大缩放比例。
- minimum-scale：定义用户可以缩小的最小缩放比例。
- user-scalable：定义用户是否可以手动缩放页面。设置为 no 可禁止用户缩放。
