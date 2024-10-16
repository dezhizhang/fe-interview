### JavaScript 中的事件循环（Event Loop）

**事件循环（Event Loop）** 是 JavaScript 执行异步代码的机制。由于 JavaScript 是单线程语言，事件循环确保非阻塞的异步操作能够按顺序执行，从而避免线程阻塞。它的主要作用是**监听调用堆栈**（Call Stack）和**任务队列**（Task Queue），当调用堆栈为空时，从任务队列中取出任务执行。

### 调用堆栈（Call Stack）

- **调用堆栈**是 JavaScript 执行上下文的管理结构。它负责跟踪当前正在执行的函数，以及函数调用过程中嵌套的其他函数。
- 当一个函数被调用时，它会被推入调用堆栈，执行完毕后则会从调用堆栈中弹出。

示例：

```javascript
function first() {
  second();
}

function second() {
  console.log('Hello');
}

first(); // 调用堆栈顺序：first -> second -> console.log
```

在上面的代码中，first() 被推入调用堆栈，second() 在 first() 中被调用，最后 console.log() 执行，整个过程依次出栈。

### 调用堆栈 任务队列（Task Queue）

- 任务队列是一个存放异步任务的队列。当异步操作（如 setTimeout、Promises）完成后，其回调函数会被推入任务队列。
- 事件循环会不断检查调用堆栈是否为空，如果为空，就从任务队列中取出任务并将其推入调用堆栈中执行。
- 任务队列的两种类型：

1. 宏任务队列（Macrotask Queue）：主要用于 setTimeout、setInterval 等。
2. 微任务队列（Microtask Queue）：主要用于 Promises 的回调、MutationObserver 等。

### 调用堆栈与任务队列的区别

- 调用堆栈：同步代码被推入调用堆栈，按照先进后出的顺序执行。
  任务队列：异步代码执行后，相关的回调被放入任务队列，等待调用堆栈为空时，事件循环从任务队列中取出任务并执行。

### 事件循环的执行流程

- 首先执行调用堆栈中的同步代码。
- 调用堆栈为空时，事件循环从微任务队列中取出任务，放入调用堆栈执行。
- 如果微任务队列为空，事件循环再从宏任务队列中取出任务，放入调用堆栈执行。
- 重复上述步骤，直至所有任务完成。

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise callback');
});

console.log('End');
```

执行顺序：

1. console.log('Start') 同步执行，立即输出 Start。
2. setTimeout 的回调被放入宏任务队列。
3. Promise 的回调被放入微任务队列。
4. console.log('End') 同步执行，输出 End。
5. 微任务队列中的 Promise 回调被执行，输出 Promise callback。
6. 最后执行宏任务队列中的 setTimeout 回调，输出 Timeout callback。

### 总结

- 调用堆栈负责执行同步任务，按函数调用顺序管理。
- 任务队列负责存放异步任务的回调，等待事件循环调度。
- 事件循环负责在调用堆栈清空时，从任务队列中取出异步任务，保持 JavaScript 的非阻塞特性。
