# Generator 函数是什么？它有什么应用场景？

Generator 函数是 JavaScript 中的一种特殊函数，允许在执行过程中暂停和恢复。它是 ES6（ECMAScript 2015）引入的。Generator 函数的主要特点是能够使用 yield 关键字控制函数的执行，并返回一个迭代器对象。

### 1. 基本概念

- **定义**：Generator 函数的定义以 function\* 开头，函数内部可以使用 yield 关键字来暂停执行。

```js
function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
```

- **返回的迭代器**：调用 Generator 函数会返回一个迭代器对象，可以使用 next() 方法逐步获取每个 yield 返回的值。

```js
const generator = myGenerator();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

### 2. 特点

- **暂停与恢复**：Generator 函数的执行可以在任何 yield 表达式处暂停，并在之后通过 next() 方法恢复执行。

- **可迭代性**：Generator 函数返回的迭代器可以与 for...of 循环一起使用，使得迭代变得简单。

```js
for (const value of myGenerator()) {
  console.log(value); // 输出 1, 2, 3
}
```

- **状态保持**：Generator 函数可以维护内部状态，每次调用 next() 方法时，都会从上次暂停的位置继续执行。

### 3. 应用场景

1. ##### 异步编程

Generator 函数可以用于处理异步编程，通过将异步操作与 yield 结合，允许在等待 Promise 解析时暂停执行，类似于 async/await 的效果。

```javascript
function* asyncTask() {
  const result1 = yield fetch('https://api.example.com/data1');
  const result2 = yield fetch('https://api.example.com/data2');
  console.log(result1, result2);
}
```

2. ##### 生成器模式

- Generator 函数常用于生成数据序列，例如无限序列、斐波那契数列等。

```js
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
```

3. ##### 状态机

- Generator 函数可以用作状态机，通过 yield 管理不同的状态和行为。

```js
function* stateMachine() {
  while (true) {
    const state = yield;
    switch (state) {
      case 'START':
        console.log('Started');
        break;
      case 'STOP':
        console.log('Stopped');
        break;
      default:
        console.log('Unknown state');
    }
  }
}

const sm = stateMachine();
sm.next(); // 初始化
sm.next('START'); // Started
sm.next('STOP'); // Stopped
```

4.  ##### 流处理

- Generator 函数可以用于处理大数据流，按需生成数据而不是一次性加载所有数据，节省内存。

### 总结

- Generator 函数是 JavaScript 中一种特殊的函数，允许暂停和恢复执行。
- 通过 yield 关键字，可以控制函数的执行流和状态。
- 应用场景包括异步编程、数据生成、状态机和流处理等。
