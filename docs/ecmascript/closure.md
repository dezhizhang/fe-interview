### JavaScript 中对闭包的理解

**闭包（Closure）** 是 JavaScript 中的一个重要概念，指的是**函数可以访问它外部函数中的变量**，即使外部函数已经执行完毕并返回。换句话说，闭包是指内部函数“记住”了它所在的词法作用域。

### 闭包的定义

在 JavaScript 中，闭包是由以下两部分组成：
1. 一个**函数**。
2. 该函数所能访问的**词法作用域**中的变量（即外部函数的变量）。

闭包能够保持对外部变量的引用，允许内部函数在外部函数已经执行完毕后，依然能够访问这些变量。

### 闭包的示例

```javascript
function outerFunction() {
    let count = 0;  // 外部函数中的局部变量

    return function innerFunction() {
        count++;  // 闭包可以访问外部函数的变量
        console.log(count);
    };
}

const closureExample = outerFunction();  // 创建闭包
closureExample();  // 输出: 1
closureExample();  // 输出: 2
```
在这个例子中，innerFunction 是一个闭包，它能够访问 outerFunction 的局部变量 count，并在每次调用时递增。

## 闭包的示例
