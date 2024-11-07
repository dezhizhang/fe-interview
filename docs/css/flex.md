# CSS 居中的方法

在 CSS 中，居中操作是常见的布局需求，可以通过不同的方法实现水平和垂直居中。以下是一些常用的居中方案。

## 1. 使用 `flexbox`
```css
.parent {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 父容器全屏高度（可选） */
}
.child {
  /* 子元素样式 */
}
```

这种方法简单直观，适用于多种场景。

## 2. 使用 grid
```css
.parent {
  display: grid;
  place-items: center; /* 水平和垂直居中 */
  height: 100vh;
}
.child {
  /* 子元素样式 */
}
```
grid 的 place-items: center 能直接实现水平垂直居中，非常简洁。

## 3. 使用 position 结合 transform
```css
.parent {
  position: relative;
  height: 100vh;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
这种方法适合在固定宽高的父容器中使用，transform 的偏移保证了精确的居中效果。

## 4. 使用 margin 自动 (适用于固定宽高元素)
```css
.parent {
  height: 100vh;
}
.child {
  width: 200px;
  height: 200px;
  margin: auto;
}
```
在父容器为 block，并且子元素有固定宽高时，margin: auto 会自动居中。

## 5. 通过 table 布局
```css
.parent {
  display: table;
  width: 100vw;
  height: 100vh;
}
.child {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```
这种方式虽然较旧，但在兼容性上表现良好，也能实现水平垂直居中。



