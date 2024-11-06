# 如何使用帧缓存（Framebuffer）进行离屏渲染？

在 WebGL 中，帧缓存（Framebuffer）是一个用于在不直接渲染到屏幕的情况下进行渲染的对象。它允许你将渲染的结果存储到一个纹理或渲染缓冲区中，而不是直接显示在浏览器的屏幕上。离屏渲染（Offscreen Rendering）通过帧缓存可以进行后处理效果、动态纹理生成等操作。

## 1. 创建帧缓存（Framebuffer）

帧缓存是一个存储渲染目标（例如纹理或渲染缓冲区）的容器。在 WebGL 中，你可以使用 `gl.createFramebuffer()` 创建一个帧缓存对象。

```javascript
const framebuffer = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
```

## 2. 创建纹理（Texture）作为渲染目标

为了将渲染结果保存到纹理中，我们需要创建一个纹理对象，并将其附加到帧缓存上。纹理将作为渲染目标，允许你将图像数据从帧缓存提取出来。

```javascript
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

// 设置纹理的尺寸和格式
gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.RGBA,
  canvas.width,
  canvas.height,
  0,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  null,
);

// 设置纹理的过滤方式和边缘行为
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
```

## 3. 绑定帧缓存并设置渲染目标

将纹理附加到帧缓存对象上作为颜色附件。

```javascript
gl.framebufferTexture2D(
  gl.FRAMEBUFFER,
  gl.COLOR_ATTACHMENT0,
  gl.TEXTURE_2D,
  texture,
  0,
);
```

可选步骤：使用渲染缓冲区（Renderbuffer）作为深度和模板缓冲
如果需要使用深度测试或模板测试，通常会将深度缓冲区或模板缓冲区附加到帧缓存中。可以使用 gl.createRenderbuffer() 来创建渲染缓冲区并将其附加到帧缓存。

```javascript
const renderbuffer = gl.createRenderbuffer();
gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);

// 为渲染缓冲区分配深度和模板缓冲
gl.renderbufferStorage(
  gl.RENDERBUFFER,
  gl.DEPTH_COMPONENT16,
  canvas.width,
  canvas.height,
);

// 将深度缓冲区附加到帧缓存
gl.framebufferRenderbuffer(
  gl.FRAMEBUFFER,
  gl.DEPTH_ATTACHMENT,
  gl.RENDERBUFFER,
  renderbuffer,
);
```

## 4. 检查帧缓存的完整性

在渲染之前，需要检查帧缓存的完整性，确保所有附加的缓冲区都正确设置，并且可以进行渲染。

```javascript
if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
  console.error('Framebuffer is not complete');
}
```

## 5. 渲染到帧缓存

一旦帧缓存设置完成，就可以开始向帧缓存渲染。所有的绘制操作都会渲染到帧缓存指定的纹理或缓冲区中，而不是直接渲染到屏幕。

```javascript
gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); // 切换到帧缓存

// 清除颜色和深度缓冲
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// 执行渲染操作（例如绘制物体）
gl.drawArrays(gl.TRIANGLES, 0, 3);

// 切回默认帧缓存（即屏幕）
gl.bindFramebuffer(gl.FRAMEBUFFER, null);
```

## 6. 使用离屏渲染的结果

帧缓存中的渲染结果通常存储在纹理中，你可以在之后的渲染阶段使用这些纹理。例如，将渲染结果作为其他物体的纹理应用，或进行后处理效果。

```javascript
// 将纹理作为输入传递到片元着色器中
const uSampler = gl.getUniformLocation(program, 'u_Sampler');
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.uniform1i(uSampler, 0);

// 绘制物体，使用帧缓存中的纹理
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
```

## 总结

通过 WebGL 的帧缓存（Framebuffer），你可以实现离屏渲染，将渲染结果存储到纹理或缓冲区中，进行后续的图像处理或纹理生成。离屏渲染的基本步骤如下：

- 创建和绑定帧缓存（Framebuffer）。
- 创建纹理并将其附加到帧缓存。
- 可选地，附加深度/模板缓冲。
- 检查帧缓存完整性。
- 渲染到帧缓存。
- 使用帧缓存的渲染结果进行其他渲染或后处理。
