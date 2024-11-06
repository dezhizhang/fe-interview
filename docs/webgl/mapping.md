# 如何在 WebGL 中实现阴影效果？

在 WebGL 中实现阴影效果有多种方法，常见的包括阴影映射（Shadow Mapping）和屏幕空间阴影（SSAO）。这里我们主要讨论阴影映射，因为它是一种常用且高效的技术，适用于许多 3D 应用。

## 1. **阴影映射（Shadow Mapping）概述**

阴影映射是一种通过从光源视角生成深度图来实现阴影的技术。这个深度图表示了场景中每个点到光源的距离。渲染物体时，比较该点的深度与光源深度图中的值，以判断该点是否被阴影遮挡。

### 阴影映射的主要步骤：

1. **从光源的角度渲染场景并生成深度图**。
2. **在常规渲染中使用该深度图来判断物体是否被阴影遮挡**。

## 2. **实现阴影效果的步骤**

### 2.1 创建深度纹理

首先，我们需要一个深度纹理来存储光源视角的场景深度。

```javascript
// 创建一个帧缓冲区和深度纹理
const shadowFramebuffer = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFramebuffer);

const depthTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, depthTexture);
gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.DEPTH_COMPONENT,
  canvas.width,
  canvas.height,
  0,
  gl.DEPTH_COMPONENT,
  gl.UNSIGNED_SHORT,
  null,
);

// 将深度纹理附加到帧缓冲区
gl.framebufferTexture2D(
  gl.FRAMEBUFFER,
  gl.DEPTH_ATTACHMENT,
  gl.TEXTURE_2D,
  depthTexture,
  0,
);

// 确保帧缓冲区完整
if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
  console.error('Framebuffer is not complete');
}
gl.bindFramebuffer(gl.FRAMEBUFFER, null);
```

### 2.2 从光源视角渲染场景

在渲染阴影之前，我们首先需要从光源的角度渲染场景，生成一个深度图。通常，我们使用一个正交或透视投影矩阵来定义光源的视野。

```javascript
// 创建光源的视图和投影矩阵
const lightViewMatrix = mat4.lookAt(...);  // 定义光源的位置和目标
const lightProjectionMatrix = mat4.perspective(...); // 或者正交投影

// 设置着色器程序，使用光源的视角和投影矩阵
gl.useProgram(shadowProgram);
gl.uniformMatrix4fv(gl.getUniformLocation(shadowProgram, "u_LightViewMatrix"), false, lightViewMatrix);
gl.uniformMatrix4fv(gl.getUniformLocation(shadowProgram, "u_LightProjectionMatrix"), false, lightProjectionMatrix);

// 渲染场景并生成深度图
gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFramebuffer);
gl.clear(gl.DEPTH_BUFFER_BIT);
renderScene(); // 渲染场景中的物体
gl.bindFramebuffer(gl.FRAMEBUFFER, null);
```

### 2.3 在常规渲染中使用深度图

在常规渲染时，我们需要使用光源的深度图来判断每个像素是否处于阴影中。具体方法是将片元的深度与深度图中的值进行比较。

```javascript
// 设置常规渲染着色器
gl.useProgram(mainProgram);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, depthTexture);
gl.uniform1i(gl.getUniformLocation(mainProgram, 'u_ShadowMap'), 0);

// 将视图矩阵和投影矩阵传递给着色器
gl.uniformMatrix4fv(
  gl.getUniformLocation(mainProgram, 'u_ViewMatrix'),
  false,
  viewMatrix,
);
gl.uniformMatrix4fv(
  gl.getUniformLocation(mainProgram, 'u_ProjectionMatrix'),
  false,
  projectionMatrix,
);

// 对每个片元执行深度测试，计算阴影
gl.uniform3fv(
  gl.getUniformLocation(mainProgram, 'u_LightPosition'),
  lightPosition,
);

// 绘制物体，使用阴影效果
gl.drawArrays(gl.TRIANGLES, 0, 36);
```

### 2.4 计算阴影

在片元着色器中，我们计算该片元是否在阴影中。我们将片元的深度与深度图中的深度值进行比较，如果片元的深度大于深度图中的深度，说明该点被遮挡，处于阴影中。

```glsl
// 片元着色器中的代码
uniform sampler2D u_ShadowMap; // 深度纹理
uniform vec3 u_LightPosition; // 光源位置

void main() {
    vec4 fragPosLightSpace = lightProjectionMatrix * lightViewMatrix * vec4(fragPosition, 1.0);
    fragPosLightSpace /= fragPosLightSpace.w; // 归一化到 [0, 1]

    float closestDepth = texture(u_ShadowMap, fragPosLightSpace.xy).r; // 从深度图中获取光源深度
    float currentDepth = fragPosLightSpace.z; // 当前片元的深度

    // 阴影比较
    float shadow = currentDepth > closestDepth + bias ? 1.0 : 0.0;

    // 使用阴影因子进行最终颜色计算
    gl_FragColor = vec4(vec3(1.0 - shadow), 1.0);
}
```

### 2.5 添加偏移量（Bias）来避免阴影“自阴影”

在某些情况下，由于精度问题，片元的深度可能会略小于深度图中的值，导致错误地将物体标记为处于阴影中。为了解决这个问题，我们通常会为深度计算添加一个小的偏移量（bias）。

```glsl
const float bias = 0.005;
float shadow = currentDepth - bias > closestDepth ? 1.0 : 0.0;
```

## 3. 优化阴影映射

阴影映射是一种开销较大的技术，尤其是在渲染大场景时。以下是一些优化阴影映射的建议：

- 级联阴影映射（Cascaded Shadow Mapping, CSM）：通过使用多个深度图，每个图覆盖不同的深度范围，以提高远离光源区域的阴影质量。
- 分辨率调整：远离光源的区域使用较低分辨率的深度图，靠近光源的区域使用更高分辨率的深度图。
- PCF（Percentage Closer Filtering）：使用多个样本来平滑阴影的边缘，减少阴影的锯齿状效果。

## 4. 总结

在 WebGL 中实现阴影效果的基本步骤包括：

- 生成深度图：从光源视角渲染场景并生成深度图。
- 使用深度图判断阴影：在常规渲染中使用深度图判断每个片元是否处于阴影中。
- 计算阴影：在片元着色器中进行阴影计算，并使用合适的偏移量避免阴影自阴影的问题。
  阴影映射是实现阴影的主要方法，虽然它可能会带来一定的性能开销，但通过优化技术（如级联阴影映射、PCF 等），可以实现高质量的阴影效果。
