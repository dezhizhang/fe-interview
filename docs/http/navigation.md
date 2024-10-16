# 浏览器缓存的优先级

浏览器缓存机制通过不同类型的缓存策略来提高页面加载速度和用户体验。以下是浏览器缓存的优先级及其类型的详细说明。

---

#### 1. 缓存类型

浏览器缓存主要包括以下几种类型：

- **强缓存**：直接从缓存中读取资源，无需向服务器请求。
- **协商缓存**：先向服务器发送请求，服务器根据缓存的有效性决定是否使用缓存。

---

#### 2. 强缓存

强缓存可以通过 HTTP 头部中的 `Expires` 和 `Cache-Control` 来设置。强缓存的优先级高于协商缓存。

- **Expires**：
- 过期时间，以 GMT 格式表示，浏览器会在该时间之前使用缓存。

```bash
Expires: Wed, 21 Oct 2024 07:28:00 GMT
```

- **Cache-Control**：
- 提供更精细的缓存控制，支持多个指令。
- 常见指令：

- `max-age`: 设置缓存的最大有效时间（以秒为单位）。
- `no-cache`: 每次请求都需要重新验证缓存。
- `no-store`: 不缓存请求和响应。

```bash
Cache-Control: public, max-age=3600
```

---

#### 3. 协商缓存

协商缓存通过 `Last-Modified` 和 `ETag` 实现。与强缓存相比，协商缓存的优先级较低，但在强缓存失效后会被使用。

- **Last-Modified**：
- 服务器返回的资源最后修改时间。
- 客户端通过 `If-Modified-Since` 头部向服务器询问资源是否被修改。

```bash
Last-Modified: Tue, 20 Oct 2024 10:00:00 GMT
```

- **ETag**：
- 服务器生成的资源唯一标识符。
- 客户端通过 `If-None-Match` 头部请求服务器检查资源是否变化。

```bash
ETag: "686897696a7c876b7e"
```

---

#### 4. 缓存优先级顺序

缓存的优先级顺序如下：

1. **强缓存**（优先级高）

- `Cache-Control`
- `Expires`

2. **协商缓存**（优先级低）

- `Last-Modified` + `If-Modified-Since`
- `ETag` + `If-None-Match`

---

### 总结

浏览器缓存通过强缓存和协商缓存的组合，提高了网页的加载速度和响应性能。强缓存优先级高于协商缓存，浏览器会首先尝试使用强缓存，只有在缓存失效的情况下才会使用协商缓存。

| 缓存类型 | 描述                         | 优先级 |
| -------- | ---------------------------- | ------ |
| 强缓存   | 直接使用缓存，无需请求服务器 | 高     |
| 协商缓存 | 需向服务器验证缓存的有效性   | 低     |
