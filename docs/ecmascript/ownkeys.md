# Reflect.ownKeys() 与 Object.keys() 的区别

`Reflect.ownKeys()` 和 `Object.keys()` 都是用于获取对象属性的函数，但它们在返回结果和适用场景上有显著的区别。

## 1. 基本概念

### Object.keys()

- **定义**：`Object.keys()` 返回一个由给定对象自身的可枚举属性名称组成的数组。
- **特性**：
  - 只返回对象的**可枚举**属性。
  - 只返回字符串键（不会返回 Symbol 键）。
  - 返回的属性顺序为：整数键，接着是字符串键，最后是 Symbol 键（如果存在）。

### Reflect.ownKeys()

- **定义**：`Reflect.ownKeys()` 返回一个由给定对象自身的所有属性名称（包括可枚举和不可枚举属性）组成的数组。
- **特性**：
  - 返回对象的**所有**属性，包括可枚举和不可枚举属性。
  - 返回字符串和 Symbol 键。
  - 属性的顺序与对象内部属性的顺序相同。

## 2. 示例对比

### Object.keys() 示例

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

Object.defineProperty(obj, 'd', {
  value: 4,
  enumerable: false, // 不可枚举属性
});

console.log(Object.keys(obj)); // 输出: ["a", "b", "c"]
```

### Reflect.ownKeys() 示例

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

Object.defineProperty(obj, 'd', {
  value: 4,
  enumerable: false, // 不可枚举属性
});

console.log(Reflect.ownKeys(obj)); // 输出: ["a", "b", "c", "d"]
```

## 2. 使用场景

### Object.keys()

- 获取可枚举属性：适用于只需要获取对象的可枚举属性的场景，如循环遍历。
- 与 for...in 结合：在处理对象属性时，可与 for...in 循环结合使用，确保只操作可枚举的属性。

### Reflect.ownKeys()

- 获取所有属性：适用于需要获取对象所有属性（包括不可枚举属性）的场景。
- 处理 Symbol 属性：如果对象使用了 Symbol 作为键，Reflect.ownKeys() 是获取这些属性的有效方式。

### 小结

- Object.keys() 仅返回对象的可枚举属性，且不包含 Symbol 键。
- Reflect.ownKeys() 返回对象的所有属性，包括可枚举和不可枚举属性，以及 Symbol 键。
