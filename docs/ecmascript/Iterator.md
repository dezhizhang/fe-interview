# Iterator 的理解

Iterator 是一种设计模式，用于遍历集合（如数组、对象、Map、Set 等）中的元素。它提供了一种统一的方式，使得我们能够在不暴露集合内部结构的情况下，逐个访问集合的元素。JavaScript 中的 Iterator 是一种重要的概念，广泛用于实现集合的遍历和处理。

### 1. 基本概念

- **Iterator 对象**：Iterator 对象是一个具有 next() 方法的对象，该方法返回一个包含 value 和 done 属性的对象。
- **value**：当前迭代的值。
- **done**：一个布尔值，表示是否迭代完成（true 表示已完成，false 表示未完成）。

```js
const myIterator = {
  index: 0,
  values: ['a', 'b', 'c'],
  next: function () {
    if (this.index < this.values.length) {
      return { value: this.values[this.index++], done: false };
    } else {
      return { done: true };
    }
  },
};

console.log(myIterator.next()); // { value: 'a', done: false }
console.log(myIterator.next()); // { value: 'b', done: false }
console.log(myIterator.next()); // { value: 'c', done: false }
console.log(myIterator.next()); // { done: true }
```

### 2. 可迭代对象

- **可迭代对象**：具有 Symbol.iterator 方法的对象称为可迭代对象（Iterable）。这个方法返回一个 Iterator 对象。
- 常见的可迭代对象包括数组、字符串、Map、Set 等。

```js
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }
```

### 3. for...of 循环

- **for...of 循环**：JavaScript 提供了 for...of 循环来简化对可迭代对象的遍历。它自动使用 Iterator 的 next() 方法。

```javascript
const arr = [1, 2, 3];
for (const value of arr) {
  console.log(value); // 输出 1, 2, 3
}
```

### 4. 自定义 Iterator

可以通过定义 Symbol.iterator 方法来自定义对象的 Iterator。这使得用户可以控制遍历的方式。

```js
const myCollection = {
  items: ['apple', 'banana', 'orange'],
  [Symbol.iterator]: function () {
    let index = 0;
    const items = this.items;
    return {
      next: function () {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (const item of myCollection) {
  console.log(item); // 输出 apple, banana, orange
}
```

### 应用场景

- 数据流处理：Iterator 模式适合于需要逐步处理数据流的场景，如大数据集的处理、读取文件内容等。
- 自定义数据结构：可以通过自定义 Iterator 来定义自己的数据结构，便于其他代码以统一的方式进行遍历。
- 延迟计算：Iterator 可以实现延迟计算的功能，只有在需要时才生成值，节省内存和计算资源。

### 总结

- Iterator 是一种访问集合元素的设计模式，提供了统一的接口。
- Iterator 对象通过 next() 方法逐步返回集合的值，并指示迭代是否完成。
- JavaScript 中的可迭代对象具有 Symbol.iterator 方法，可以使用 for...of 循环进行便利。
- 自定义 Iterator 提供了灵活的方式来控制对象的遍历行为。
