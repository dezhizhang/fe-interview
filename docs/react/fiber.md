# React Fiber 架构的作用是什么？为什么要引入 Fiber

- React Fiber 是 React 自 v16.0 开始引入的新架构，用于改进 React 的渲染性能，特别是在处理复杂和高频率的 UI 更新时。Fiber 的主要目标是使得 React 在渲染过程中更加高效、可中断和恢复，从而提供流畅的用户体验。

### 引入 Fiber 的原因：

- 传统 React 在处理复杂组件树时，由于其同步的、递归的渲染机制，会导致长时间的阻塞更新，影响用户交互和页面性能。Fiber 通过更细粒度的任务管理，使得渲染过程可以被中断、优先级处理和恢复，解决了以下几个核心问题：

1. ##### 同步更新导致卡顿

- 在 React 的旧架构（称为 Stack Reconciler）中，更新是同步的，React 会一次性遍历整个组件树进行渲染。如果组件树过大，或者有大量更新，会导致主线程被阻塞，用户会感到界面卡顿，特别是对于动画、滚动等高优先级交互。

2. ##### 任务无法优先级调度

- 在旧架构中，React 没有任务调度的能力，所有任务都是同步、线性执行的，无法根据用户交互的紧急程度调整渲染顺序。这意味着无论任务的优先级高低，都会按顺序执行，导致关键更新（如输入框输入反馈）无法得到及时响应。

3. ##### 渲染不可中断

- 旧的 React 渲染是不可中断的，React 会一次性完成整个渲染任务，无法在过程中暂停或分片处理，这样长时间的渲染操作会导致页面“掉帧”或响应延迟。

### Fiber 的作用和工作原理

- React Fiber 架构解决了这些问题，它的引入带来了更灵活的任务调度和更流畅的 UI 更新体验

1. ##### 分片渲染 (Time-Slicing)

- Fiber 允许 React 将渲染任务分成更小的单元，称为“Fiber”。这些任务可以分片执行，这样即使任务非常复杂，React 也可以在主线程空闲时继续渲染，避免阻塞用户交互。
- 任务优先级调度：React Fiber 允许为不同的更新分配优先级，分为同步任务（高优先级，如用户输入）和异步任务（低优先级，如非关键渲染）。根据任务的紧急程度，React 可以决定先处理哪些任务，并将低优先级的任务延后处理或暂停。
- 渲染可中断、可恢复： Fiber 的架构使得渲染过程可以被中断，当有更高优先级的任务（如用户点击或滚动）需要处理时，React 可以暂停当前的渲染任务，并在高优先级任务完成后再恢复未完成的渲染。
- 渲染可中断、可恢复： Fiber 的架构使得渲染过程可以被中断，当有更高优先级的任务（如用户点击或滚动）需要处理时，React 可以暂停当前的渲染任务，并在高优先级任务完成后再恢复未完成的渲染。
- Incremental Reconciliation (增量调和)： Fiber 提供了增量更新能力，能够在复杂的组件树更新过程中，避免重复渲染已经稳定的部分，从而提高效率。这让 React 在处理大量节点时性能更好，尤其是在响应大量数据或动画时效果明显。
- 更好的错误边界处理： Fiber 架构的另一个重要改进是增强了错误处理的能力，React 在 v16 引入了“错误边界”（Error Boundaries），可以捕获并处理渲染过程中的错误，避免整个应用崩溃。

### Fiber 带来的性能优势
- 流畅的用户体验：通过分片渲染和优先级调度，Fiber 确保了高优先级任务的及时响应，减少了页面的卡顿现象，尤其是在动画、滚动、拖拽等场景下。
- 更高的渲染灵活性：Fiber 使得 React 能够动态调整任务的执行顺序，提升了渲染效率，并且允许在任何时刻暂停和恢复任务。
- 错误隔离和更好的容错：错误边界和 Fiber 架构的结合，提升了 React 应用的稳定性和可维护性。

### 总结
- React Fiber 的核心目标是通过更细粒度的任务管理和可中断、可恢复的渲染机制，提升复杂 UI 场景下的性能表现。Fiber 引入后，React 应用可以在处理复杂的更新时保持流畅的用户交互，并能够在必要时对任务优先级进行合理调度，从而显著优化渲染性能和用户体验。