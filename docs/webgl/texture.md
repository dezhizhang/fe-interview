# 如何在 WebGL 中加载和使用纹理？

在 WebGL 中，纹理（Texture）是一种用于在图形上应用图像或图案的技术。加载和使用纹理可以为 3D 对象添加细节，从而使其更具真实感。下面是加载和使用纹理的基本步骤。

## 1. 创建纹理对象

首先，创建一个纹理对象来存储纹理数据。

```javascript
const texture = gl.createTexture();
```

## 2. 绑定纹理

将纹理对象绑定到 WebGL 上下文，以便后续设置参数和传入图像数据。

```javascript
gl.bindTexture(gl.TEXTURE_2D, texture);
```

### 3. 设置纹理参数

纹理的缩放和重复方式由 gl.texParameteri 控制，常见的参数设置如下：

```javascript
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // 水平填充方式
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // 垂直填充方式
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // 缩小时过滤方式
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // 放大时过滤方式
```

- gl.CLAMP_TO_EDGE：将纹理边缘的颜色扩展到边界外。
- gl.REPEAT：将纹理重复平铺。
- gl.LINEAR：使用线性插值，生成平滑效果。

## 4. 加载纹理图像数据

通过 JavaScript 加载图像，然后将其传递给 WebGL。可以使用 HTML 的 Image 对象来加载图像，并在图像加载完成后，将数据传入 WebGL。

```javascript
const image = new Image();
image.src = 'path/to/texture.jpg';
image.onload = () => {
  // 绑定纹理
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 上传图像数据
  gl.texImage2D(
    gl.TEXTURE_2D, // 目标
    0, // 详细级别（0 表示基本级别）
    gl.RGBA, // 纹理格式
    gl.RGBA, // 源图像格式
    gl.UNSIGNED_BYTE, // 数据类型
    image, // 图像数据
  );

  // 生成多级渐远纹理
  gl.generateMipmap(gl.TEXTURE_2D);
};
```

## 5. 使用纹理

在着色器中定义纹理变量
在顶点着色器和片元着色器中，定义用于接收纹理坐标和纹理采样的变量：

顶点着色器：

```glsl
复制代码
attribute vec4 a_Position; // 顶点位置
attribute vec2 a_TexCoord; // 纹理坐标
varying vec2 v_TexCoord;   // 传递给片元着色器的纹理坐标

void main() {
    gl_Position = a_Position; // 设置顶点位置
    v_TexCoord = a_TexCoord;  // 传递纹理坐标
}
```

片元着色器：

```glsl
复制代码
precision mediump float;
uniform sampler2D u_Sampler; // 纹理采样器
varying vec2 v_TexCoord;     // 接收来自顶点着色器的纹理坐标

void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord); // 采样纹理颜色
}
```

- 设置纹理坐标并传递到着色器
- 将纹理坐标传递到缓冲区，并将其传递给 WebGL 程序的 a_TexCoord 属性。

```javascript
const texCoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);

const texCoords = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);

gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

const aTexCoord = gl.getAttribLocation(program, 'a_TexCoord');
gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aTexCoord);
```

## 设置纹理单元并绘制

最后，将纹理绑定到特定的纹理单元（如 0），然后传递给着色器。

```js
// 激活纹理单元 0
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);

// 将纹理单元传递给片元着色器中的采样器
const uSampler = gl.getUniformLocation(program, 'u_Sampler');
gl.uniform1i(uSampler, 0);

// 绘制图形
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
```

## 总结

在 WebGL 中加载和使用纹理的步骤：

- 创建纹理对象并绑定。
- 设置纹理参数。
- 加载图像并传入纹理数据。
- 设置着色器中的纹理变量。
- 将纹理单元传递给着色器并绘制。
