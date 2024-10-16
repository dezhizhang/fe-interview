# 水平垂直居中方案

在网页布局中，水平和垂直居中是常见需求。以下是多种实现方案的对比，包括它们的优缺点。

## 1. Flexbox

### 代码示例
```css
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;    /* 垂直居中 */
  height: 100vh;          /* 高度占满视口 */
}
```