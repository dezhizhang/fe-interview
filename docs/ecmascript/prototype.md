# JavaScript 中的原型与原型链

在 JavaScript 中，原型和原型链是实现对象继承和属性共享的核心机制。理解原型和原型链对于掌握 JavaScript 的面向对象编程非常重要。

## 1. 原型

### 1.1 定义

- **原型**: 原型是一个对象，作为其他对象的模板，允许其子对象访问和继承属性和方法。
- 每个 JavaScript 对象都有一个隐式的 `[[Prototype]]` 属性，指向其原型对象。

### 1.2 原型的使用

- 可以通过构造函数来设置对象的原型。
- 使用 `Object.create()` 方法可以基于某个对象创建新对象，并将该对象作为新对象的原型。

### 1.3 示例

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
};

const dog = new Animal('Dog');
dog.speak(); // 输出: Dog makes a noise.
```

## 2. 原型链

### 2.1 定义

- 原型链: 原型链是用于实现对象之间继承关系的链式结构。当访问一个对象的属性时，JavaScript 会首先查找对象自身的属性，如果没有找到，则会沿着其原型链向上查找，直到找到属性或到达 null。
- 原型链的终点是 Object.prototype，它的原型是 null。

### 2.1 原型链的工作原理

- 当访问一个对象的属性时，JavaScript 会首先查找对象自身是否有该属性。
- 如果对象自身没有该属性，则会查找其原型对象。
- 如果原型对象也没有，则继续查找原型对象的原型，依此类推，直到找到该属性或到达 null

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}.`);
};

const alice = new Person('Alice');
alice.greet(); // 输出: Hello, my name is Alice.

console.log(alice.toString()); // 输出: [object Object]，toString 是从 Object.prototype 继承的
```

### 总结

- 原型: 是一个用于共享属性和方法的对象，每个 JavaScript 对象都有一个原型。
- 原型链: 是对象间继承关系的链式结构，通过查找原型链，可以实现属性的共享与继承。理解原型与原型链是掌握 JavaScript 面向对象编程的基础。
