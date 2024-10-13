# Proxy 是什么，有什么应用场景

`Proxy` 是 ES6 引入的一种元编程机制，允许开发者创建一个代理对象，以定义对目标对象的基本操作（如属性访问、赋值、枚举、函数调用等）的自定义行为。通过 `Proxy`，我们可以拦截和重写这些操作，从而实现更加灵活和强大的功能。

## 1. 基本概念

- **目标对象（Target）**：`Proxy` 代理的对象，实际存储数据的地方。
- **处理程序（Handler）**：一个对象，其中定义了拦截目标对象操作的方法，称为陷阱（traps）。

### 语法

```js
const proxy = new Proxy(target, handler);
```

## 2. 常用陷阱（Traps）

### 1. get(target, property, receiver)

拦截对象属性的读取操作。

```js
const target = { a: 1 };
const handler = {
  get: function (target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  },
};

const proxy = new Proxy(target, handler);
console.log(proxy.a); // Getting a 1
```

### 2. set(target, property, value, receiver)

- 拦截对象属性的赋值操作。

```js
const target = {};
const handler = {
  set: function (target, property, value) {
    console.log(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

const proxy = new Proxy(target, handler);
proxy.a = 1; // Setting a to 1
console.log(target.a); // 1
```

### 3. deleteProperty(target, property)

- 拦截属性的删除操作。

```js
const target = { a: 1 };
const handler = {
  deleteProperty: function (target, property) {
    console.log(`Deleting ${property}`);
    return delete target[property];
  },
};

const proxy = new Proxy(target, handler);
delete proxy.a; // Deleting a
console.log(target.a); // undefined
```

### 4. apply(target, thisArg, argumentsList)

- 拦截函数调用。

```js
function sum(a, b) {
  return a + b;
}

const handler = {
  apply: function (target, thisArg, argumentsList) {
    console.log(`Calling with arguments: ${argumentsList}`);
    return target.apply(thisArg, argumentsList);
  },
};

const proxy = new Proxy(sum, handler);
console.log(proxy(1, 2)); // Calling with arguments: 1,2 3
```

### 3. 应用场景

### 1. 数据绑定和观察者模式

- Proxy 可以用来实现数据绑定和观察者模式，当数据变化时自动通知视图更新。

```js
const data = { name: 'John' };
const handler = {
  set: function (target, property, value) {
    console.log(`Property ${property} changed to ${value}`);
    target[property] = value;
    return true;
  },
};

const proxy = new Proxy(data, handler);
proxy.name = 'Doe'; // Property name changed to Doe
```

### 2. 表单验证

- 通过 Proxy 拦截表单数据的设置操作，可以实现输入验证和格式化。

```js
const formData = {};
const handler = {
  set: function (target, property, value) {
    if (property === 'age' && (value < 0 || value > 120)) {
      throw new Error('Invalid age');
    }
    target[property] = value;
    return true;
  },
};

const proxy = new Proxy(formData, handler);
proxy.age = 25; // 正常
proxy.age = -1; // 抛出错误
```

### 3. 路由控制

- 在 Web 应用中，可以使用 Proxy 拦截对象的属性访问，用于实现路由控制和动态加载模块。

### 4. 缓存和性能优化

- 通过 Proxy 可以实现缓存机制，避免重复计算，从而提高性能。

```js
const cache = {};
const handler = {
  get: function (target, property) {
    if (property in cache) {
      return cache[property];
    }
    const result = target[property](); // 假设目标对象的属性是函数
    cache[property] = result;
    return result;
  },
};

const proxy = new Proxy(
  {
    expensiveCalculation: function () {
      /*...*/
    },
  },
  handler,
);
```

### 4. 总结

- Proxy 是 ES6 引入的一种元编程机制，允许创建代理对象，以自定义对目标对象的操作。
- 通过设置处理程序，可以拦截基本操作，增强对象的功能。
- 应用场景包括数据绑定、表单验证、路由控制、缓存优化等。
