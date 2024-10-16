# CSS 选择器及其优先级、使用场景和继承规则

CSS 选择器用于选择和应用样式到 HTML 元素。不同类型的选择器具有不同的优先级和使用场景。

## 1. CSS 选择器类型

### 基础选择器

- **通用选择器（`*`）**

- **优先级**：0
- **场景**：选择所有元素
- **示例**：`* { margin: 0; }`

- **类型选择器（元素选择器）**

- **优先级**：1
- **场景**：选择特定类型的元素
- **示例**：`p { color: blue; }`

- **类选择器（`.`）**

- **优先级**：10
- **场景**：选择带有特定类名的元素
- **示例**：`.class-name { font-size: 16px; }`

- **ID 选择器（`#`）**
- **优先级**：100
- **场景**：选择具有特定 ID 的元素
- **示例**：`#unique-id { background-color: yellow; }`

### 组合选择器

- **后代选择器（`ancestor descendant`）**

- **优先级**：按选择器具体权重计算
- **场景**：选择某个元素下的后代元素
- **示例**：`div p { color: red; }`

- **子选择器（`parent > child`）**

- **优先级**：按选择器具体权重计算
- **场景**：选择直接子元素
- **示例**：`ul > li { list-style-type: none; }`

- **相邻兄弟选择器（`previous + next`）**

- **优先级**：按选择器具体权重计算
- **场景**：选择紧接着的兄弟元素
- **示例**：`h1 + p { margin-top: 0; }`

- **一般兄弟选择器（`previous ~ siblings`）**
- **优先级**：按选择器具体权重计算
- **场景**：选择所有后续兄弟元素
- **示例**：`h1 ~ p { color: green; }`

### 伪类选择器

- **伪类选择器（`:`）**
- **优先级**：10
- **场景**：选择元素的特定状态
- **示例**：`a:hover { color: red; }`

### 伪元素选择器

- **伪元素选择器（`::`）**
- **优先级**：10
- **场景**：选择元素的一部分
- **示例**：`p::first-line { font-weight: bold; }`

## 2. 选择器优先级计算

优先级的计算是根据以下规则：

- 内联样式：1000
- ID 选择器：100
- 类选择器、伪类、属性选择器：10
- 元素选择器、伪元素：1
- 通用选择器：0

## 3. 继承规则

- **可以继承的属性**：如 `color`、`font-family`、`line-height`、`text-align` 等。
- **不能继承的属性**：如 `margin`、`padding`、`border`、`background` 等。

### 继承示例

```css
body {
  font-family: Arial, sans-serif; /* 可以继承 */
}

h1 {
  color: blue; /* 可以继承 */
}

div {
  margin: 20px; /* 不能继承 */
}
```

## 3. 使用 @ 规则

@import

- 功能：导入外部样式表

```css
@import url('styles.css');
```

@media

- 功能：响应式设计，针对特定条件应用样式

```css
@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

@keyframes

- 功能：定义动画的关键帧

```css
@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: yellow;
  }
}
```

@font-face

- 功能：定义自定义字体

```css
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
}
```

### 总结

- 理解 CSS 选择器、优先级、继承规则以及 @ 规则的使用，有助于更高效地管理样式，提高代码的可维护性和灵活性。
