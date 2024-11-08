# CSS 选择器的优先级

在 CSS 中，选择器的优先级决定了样式的应用顺序。理解优先级的计算规则可以帮助我们准确地控制样式的生效情况。

## 1. 优先级的规则
CSS 优先级从高到低分为以下几个等级：

1. **行内样式**：写在元素 `style` 属性中的样式（优先级最高）。
2. **ID 选择器**：使用 `#id` 选择器。
3. **类选择器、伪类和属性选择器**：如 `.class`、`:hover`、`[type="text"]`。
4. **元素选择器和伪元素选择器**：如 `div`、`p`、`::before`、`::after`。

如果优先级相同，则遵循“就近原则”，即后出现的样式会覆盖前面的样式。

## 2. 优先级计算示例
可以用“0, 0, 0, 0”来表示优先级的等级，分别对应：

- `0, 0, 0, 1` - 元素选择器
- `0, 0, 1, 0` - 类选择器、伪类、属性选择器
- `0, 1, 0, 0` - ID 选择器
- `1, 0, 0, 0` - 行内样式

**示例**：

- `div` 的优先级为 `0, 0, 0, 1`
- `.class` 的优先级为 `0, 0, 1, 0`
- `#id` 的优先级为 `0, 1, 0, 0`
- `style="color: red;"` 的优先级为 `1, 0, 0, 0`

**复合选择器**时，各选择器的优先级相加：

```css
/* 优先级为 0, 1, 1, 1 */
#id .class div {
  color: blue;
}
```
## 3. 使用 !important
!important 会将样式提升到最高优先级，覆盖其他选择器的样式。

```css
p {
  color: red !important;
}
```
在上例中，color: red 将覆盖所有其他样式。!important 应尽量少用，以避免样式难以维护。

## 4. 优先级示例
```css
/* 优先级：0, 0, 0, 1 */
div {
  color: blue;
}

/* 优先级：0, 0, 1, 0 */
.class {
  color: green;
}

/* 优先级：0, 1, 0, 0 */
#id {
  color: red;
}

/* 优先级：1, 0, 0, 0 */
<div style="color: yellow;">
  行内样式优先级最高
</div>
````