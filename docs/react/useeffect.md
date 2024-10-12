# useEffect 和 useLayoutEffect 有什么区别

- React 中，useEffect 和 useLayoutEffect 都是用于在函数组件中处理副作用的 Hook，它们的功能类似，但调用时机不同，导致在某些场景下有不同的表现。

### useEffect

- 执行时机：useEffect 在浏览器完成渲染后异步执行，属于“非阻塞”操作。这意味着组件渲染后，浏览器先绘制页面，然后再执行 useEffect 里面的代码。
- 用途：适合执行不需要影响页面布局的副作用，例如：数据获取、订阅、设置定时器、操作 DOM 之外的工作等。
- 性能：因为是异步执行，useEffect 不会阻塞浏览器的绘制进程，因此在大多数场景下不会影响用户的界面交互或首次渲染时间。

```js
import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  // useEffect 在组件渲染后执行
  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div>;
}
```

### useLayoutEffect

- 执行时机：useLayoutEffect 在浏览器执行绘制之前同步执行。它在所有 DOM 变更后立即运行，但在浏览器更新屏幕之前。这使得它能够阻塞页面的绘制，确保 DOM 更新与布局同步。
- 用途：适用于需要在页面布局和渲染之前进行精确的 DOM 操作（例如：测量 DOM 元素的尺寸、位置，或是立即更新 DOM 元素的样式、滚动位置等）的时候。由于它会在浏览器绘制页面前运行，适合那些需要影响布局的操作。
- 性能注意：因为 useLayoutEffect 是同步执行的，它会阻塞浏览器的绘制进程，因此如果不慎用在复杂的操作上，可能导致性能问题，影响页面的渲染速度。

```js
import { useLayoutEffect, useRef } from 'react';

function MyComponent() {
  const divRef = useRef();

  // useLayoutEffect 在 DOM 变更后、绘制前执行
  useLayoutEffect(() => {
    const div = divRef.current;
    console.log('Div width:', div.offsetWidth);
    // 假设我们根据宽度调整样式
    if (div.offsetWidth < 300) {
      div.style.backgroundColor = 'red';
    }
  }, []);

  return <div ref={divRef}>I am a div!</div>;
}
```

### 区别总结

| 特性         | useEffect                           | useLayoutEffect                                  |
| :----------- | :---------------------------------- | :----------------------------------------------- |
| 执行时机     | 渲染之后，浏览器绘制页面后异步执行  | 渲染之后，DOM 更新后，浏览器绘制页面之前同步执行 |
| 影响页面布局 | 不适用于影响布局的场景              | 适用于需要在页面布局之前执行 DOM 操作的场景      |
| 常见用途     | 数据获取、事件订阅、操作非 DOM 工作 | DOM 测量、修改布局、同步操作影响页面渲染         |
| 性能影响     | 不会阻塞渲染，适合异步操作          | 可能阻塞页面渲染，影响性能                       |

### 何时使用哪个

- useEffect：大部分场景下，优先使用 useEffect，尤其是当副作用不直接影响页面布局时。它不会阻塞渲染，能更好地提升应用的性能
- useLayoutEffect：在需要同步执行一些 DOM 操作并且这些操作会影响页面的布局或视觉表现时，使用 useLayoutEffect。不过要谨慎使用，以避免影响性能。

### 总结

- useEffect 和 useLayoutEffect 的主要区别在于它们的执行时机。useEffect 是异步执行的，适合大多数副作用操作；而 useLayoutEffect 是同步执行的，适用于需要在浏览器绘制页面前操作 DOM 的场景。选择它们时要根据副作用的具体场景和需求，优先考虑性能影响。
