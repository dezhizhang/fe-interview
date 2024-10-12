# React v16.0 之后的版本为什么要删除和 Will 相关生命周期？

- React v16.0 之后的版本删除了与 Will 相关的生命周期方法，主要是为了改进 React 的架构并优化性能，尤其是在引入了 Fiber 架构 后。Fiber 是 React 16 引入的新内部机制，允许 React 更加灵活地处理渲染工作，支持时间分片和优先级管理，从而实现更流畅的用户体验。为了支持这些新特性，一些传统的生命周期方法不再适合。

### 删除 Will 生命周期方法的原因

- 在 React 16 之前，主要的与 Will 相关的生命周期方法有：

1. componentWillMount
2. componentWillReceiveProps
3. componentWillUpdate

- 这些方法的问题在于它们的设计假设是 React 渲染的过程是同步的，而 Fiber 架构引入了异步渲染。异步渲染意味着组件的渲染过程可能会被打断和重新执行，而与 Will 相关的生命周期方法在异步模式下会带来潜在的副作用和不稳定性。

1. ##### 无法保证生命周期的执行次数

- 在 React 的 Fiber 架构中，渲染过程可能会被打断和多次重试。由于 Will 生命周期方法是在渲染之前执行的，这意味着它们可能会被多次调用。在异步渲染模式下，componentWillMount 或 componentWillReceiveProps 可能会多次触发，但最终组件可能并未真正更新。这会导致副作用，比如不必要的 API 请求或资源加载，进而引发性能问题或错误行为。

2. ##### 副作用难以管理

- Will 生命周期方法经常被用来执行副作用（如 API 请求、设置状态等），这些副作用在异步渲染模式下可能会导致未预料到的行为。由于渲染过程可能被暂停或重新执行，副作用可能会在错误的时间被执行或重复执行。例如，如果在 componentWillReceiveProps 中发起了一个异步请求，而渲染过程被打断，这可能导致重复的网络请求。

3. ##### 新的渲染模式不需要提前执行逻辑

- React Fiber 的设计理念是尽量减少在渲染前执行的计算逻辑。Fiber 允许 React 在需要的时候暂停、继续或丢弃渲染任务。Will 生命周期方法的存在，意味着开发者倾向于提前进行某些操作，而这些操作可能不必要，或者可以延迟到更适合的时间点执行。例如，componentWillMount 中的逻辑往往可以移到 componentDidMount，因为真正需要执行这些操作的时间通常是在组件挂载后。

4. ##### 鼓励使用新的生命周期方法

- 为了应对上述问题，React 16 引入了新的生命周期方法，帮助开发者更好地管理组件的状态和副作用：

1. getDerivedStateFromProps：这个静态方法在组件接收到新的 props 时被调用，允许根据 props 来更新 state，而不是通过 componentWillReceiveProps。
2. componentDidUpdate：代替 componentWillUpdate，它在更新后触发，确保组件的 DOM 已经更新，从而避免多次无用的更新准备。
3. componentDidMount 和 componentDidUpdate：建议将副作用放在这些方法中执行，因为它们是在渲染完成后触发的，能避免在渲染过程中被多次打断或重复执行。

4. ##### 不推荐使用的过渡方法

- 为了保持向后兼容，React 16.3 版本引入了 UNSAFE\_ 前缀，为以下生命周期方法提供了过渡期支持：

1. UNSAFE_componentWillMount
2. UNSAFE_componentWillReceiveProps
3. UNSAFE_componentWillUpdate

- 这些方法被标记为“不安全的”（UNSAFE\_），意味着它们在未来版本中可能被移除，并且不推荐在新代码中使用。它们的存在只是为了帮助开发者逐渐迁移到新的生命周期方法。

### 总结

- 删除与 Will 相关的生命周期方法是为了适应 React Fiber 架构带来的异步渲染模式。这些旧的生命周期方法在异步渲染下容易导致副作用管理困难、无法保证准确的执行顺序，并且阻碍了性能优化。React 提供了新的生命周期方法来替代它们，鼓励开发者在更新完成后处理副作用，以确保组件的行为在异步渲染下更稳定可控。
