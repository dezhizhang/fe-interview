# React 为什么提出 Expiration Time 并废弃 ReactPriorityLevel 模块

React 从 **ReactPriorityLevel** 模块过渡到 **Expiration Time** 模型，主要是为了更好地处理调度和渲染更新的优先级管理，增强对异步渲染和时间片调度的控制。这一变更是 React 逐步实现 **并发模式**（Concurrent Mode）的一部分，以便提升用户界面在高负载下的响应性和流畅度。

## 1. ReactPriorityLevel 的局限性

**ReactPriorityLevel** 模块主要依赖于**静态的优先级系统**，即根据任务的重要性直接设定优先级。这种系统有以下几个问题：

- **优先级是离散的**：每个任务只能被赋予一个固定的优先级，如高优先级或低优先级，无法动态处理不同的任务间的时序。
- **缺乏时间感知**：ReactPriorityLevel 模块缺乏对时间的感知，无法动态调度任务，不能根据实际执行情况灵活调整任务顺序。
- **难以处理异步更新**：由于没有足够的灵活性，ReactPriorityLevel 无法很好地处理异步任务或在用户交互时细粒度的优先级切换。

## 2. Expiration Time 的引入

**Expiration Time** 模型则通过引入“任务过期时间”来更好地处理更新任务的调度，结合时间片调度机制，带来了如下好处：

- **基于时间的优先级**：不同于离散的优先级系统，Expiration Time 根据任务的过期时间来动态调度任务。任务的优先级基于它们什么时候需要被处理，可以灵活地处理多个任务，并根据剩余时间进行合理安排。

  - **即时更新（Sync Updates）**：立即更新，过期时间较短（例如用户输入）。
  - **异步更新（Async Updates）**：可以延后处理的更新，过期时间较长（例如非关键 UI 更新）。

- **支持并发模式**：Expiration Time 是并发模式（Concurrent Mode）的基础，它能够让 React 处理多个优先级不同的任务，并确保 UI 在长时间任务处理中依旧可以保持响应。

- **时间片调度**：与时间片调度结合，React 能够在执行长时间任务时暂停，确保用户界面能够及时响应用户的输入和交互。

## 3. 为什么废弃 ReactPriorityLevel

由于 **Expiration Time** 提供了更精细的优先级调度，并且结合了时间片和过期时间的概念，React 不再需要传统的优先级层次模型。通过 Expiration Time，React 通过时间感知来处理优先级任务，解决了 ReactPriorityLevel 在调度上的不足，提供了更强大的异步任务处理能力。

## 4. 小结

React 废弃 **ReactPriorityLevel** 并引入 **Expiration Time** 模型，主要是为了提升调度灵活性，增强异步渲染和并发处理能力。Expiration Time 使 React 能够在多任务环境下更加智能地调度更新，并提升用户界面的流畅度和响应性。
