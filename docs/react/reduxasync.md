# Redux 实现异步的时期可以在哪些阶段？

- 在 Redux 中，异步操作（如 API 请求、定时任务等）无法直接通过原生的 Redux 实现，因为 Redux 的 reducer 是一个纯函数，只能同步执行逻辑。因此，Redux 的异步操作通常通过中间件来实现。

### Action Creator 阶段

- 在 Action Creator 阶段，异步操作可以在触发 action 之前进行。可以通过一些异步中间件将异步逻辑放入到 action creator 中。

### 常用中间件

1. ##### Redux Thunk

- 允许 action creator 返回一个函数，而不是普通的对象。这个函数接收 dispatch 和 getState 作为参数，在函数内部可以执行异步操作，等到异步任务完成后，再手动触发 dispatch 来发送 action。

```js
const fetchData = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'FETCH_ERROR', error }));
  };
};
```

2. ##### Redux-Promise

- 允许 action creator 返回一个 Promise 对象。当 promise resolve 后，自动将结果作为 action 的 payload，并自动发送该 action。

```js
const fetchData = () => {
  return fetch('/api/data').then((response) => response.json());
};
```

3. ##### Redux-Saga

- 允许将异步逻辑移出 action creator，并使用 saga 处理异步操作。Saga 是基于 Generator 函数的，可以更优雅地处理复杂的异步流程，比如并发请求、重试等。

```js
unction* fetchDataSaga() {
  try {
    const data = yield call(fetchDataFromAPI);
    yield put({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    yield put({ type: "FETCH_ERROR", error });
  }
}

function* watchFetchData() {
  yield takeEvery("FETCH_DATA_REQUEST", fetchDataSaga);
}
```

### Reducer 阶段

- 异步操作无法直接在 reducer 中执行，因为 Redux 的 reducer 是一个纯函数，不能包含副作用或异步逻辑。但在 reducer 处理的过程中，常见的做法是通过不同的 action 状态来管理异步操作的不同阶段

1. FETCH_START：开始异步操作
2. FETCH_SUCCESS：异步操作成功，更新状态
3. FETCH_ERROR：异步操作失败，更新状态

```js
const initialState = {
  data: null,
  loading: false,
  error: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
```

### Middleware 阶段

- 在 Redux 中，中间件（middleware） 是处理异步操作的关键，它们位于 dispatch action 和 reducer 之间，用来拦截 action，处理副作用并在合适的时机 dispatch 新的 action。

```js
const asyncMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
```

### View 组件阶段

- 在 Redux 实现异步操作时，通常会根据 Redux 的状态（如 loading、error 等）来触发不同的 UI 变化。在 React 组件 中，异步请求可以在组件的生命周期方法中发起，比如在 useEffect 中 dispatch 异步 action。

```js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return loading ? <div>Loading...</div> : <div>{data}</div>;
};
```

### 服务端阶段

- 在服务端渲染（SSR）中，Redux 也可以实现异步操作。比如在服务器请求之前，可以 dispatch 异步 action，等数据加载完成后再渲染页面。

```js
const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(fetchData()).then(() => {
  const html = renderToString(<App store={store} />);
  res.send(renderFullPage(html, store.getState()));
});
```

### 总结

- 在 Redux 中，异步操作可以在多个阶段实现，主要依靠中间件来处理异步逻辑。常见的处理方式包括：

1. Action Creator 阶段：通过 Redux Thunk、Saga 等中间件处理异步操作。
2. Reducer 阶段：通过不同的 action 状态更新异步操作的结果。
3. Middleware 阶段：通过中间件拦截 action，处理异步逻辑。
4. View 组件阶段：在 React 组件的生命周期中发起异步请求。
5. 服务端阶段：在服务器渲染过程中执行异步操作。
