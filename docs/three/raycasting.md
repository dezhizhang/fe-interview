# Three.js 中的 Raycasting

**Raycasting** 是一种用来确定射线与 3D 场景中物体交点的技术。它在 Three.js 中被广泛应用，尤其是在实现交互（如点击、拖拽、碰撞检测等）时。Raycasting 是基于射线（Ray）进行的计算，射线从一个点沿着某个方向发射，计算射线与场景中物体的交集。

## 1. Raycasting 的原理

- **射线**：射线是一个从原点出发并沿特定方向无限延伸的线。在 Three.js 中，射线通常由一个起点（`Ray.origin`）和一个方向（`Ray.direction`）定义。
- **交点检测**：Raycasting 会计算射线与场景中各个物体（通常是几何体）的交点，判断是否存在交集。如果射线与某个物体相交，就可以计算出交点的位置。

## 2. Three.js 中的 `Raycaster` 类

在 Three.js 中，Raycasting 是通过 `THREE.Raycaster` 类来实现的。`Raycaster` 主要用来检测射线与物体的交点，并返回这些交点的信息。

### 2.1 创建 Raycaster

```javascript
const raycaster = new THREE.Raycaster();
```

Raycaster 类有几个重要的属性：

- origin：射线的起点（Vector3 类型）。
- direction：射线的方向（Vector3 类型），通常为单位向量。
- near：射线与物体交点的最近距离。
- far：射线与物体交点的最远距离。

### 2.2 射线与物体交点检测

Raycaster 可以使用 intersectObject 或 intersectObjects 方法来检测射线与场景中物体的交点。

- intersectObject：检测射线与单一物体的交点。
- intersectObjects：检测射线与多个物体的交点。

### 2.3 示例：点击物体

以下是一个示例，展示如何在 Three.js 中使用 Raycasting 实现点击物体的效果：

```js
// 创建场景、摄像机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个物体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 设置摄像机位置
camera.position.z = 5;

// 创建 Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // 存储鼠标位置

// 监听鼠标点击事件
window.addEventListener('click', onClick, false);

// 计算鼠标在场景中的位置
function onClick(event) {
  // 获取鼠标在窗口中的位置
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 更新 Raycaster 的射线
  raycaster.updateMatrixWorld(); // 更新射线的世界矩阵
  raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld);
  raycaster.ray.direction
    .set(mouse.x, mouse.y, 1)
    .unproject(camera)
    .sub(raycaster.ray.origin)
    .normalize();

  // 检测射线与物体的交点
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    // 如果射线与物体相交，则执行一些操作
    console.log('物体被点击！');
    cube.material.color.set(0xff0000); // 点击后改变颜色
  }
}

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

### 2.4 示例：射线与多个物体交点

当需要检测射线与多个物体的交点时，可以使用 intersectObjects 方法：

```javascript
const cubes = [];
// 创建多个立方体
for (let i = 0; i < 5; i++) {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  );
  cube.position.x = i * 2;
  scene.add(cube);
  cubes.push(cube);
}

// 检测射线与多个物体的交点
const intersects = raycaster.intersectObjects(cubes);

if (intersects.length > 0) {
  // 找到与射线相交的第一个物体
  const firstIntersect = intersects[0];
  console.log('射线与物体相交:', firstIntersect.object);
}
```

## 3. Raycasting 的应用

Raycasting 在 Three.js 中有很多实际应用，包括但不限于：

- 鼠标点击事件：用于响应用户点击场景中的物体（如物体选择、拖拽等）。
- 碰撞检测：用于检测物体是否相撞或接触。
- 视线检测：用于检查从摄像机到某个物体之间的视线是否被遮挡。
- 场景交互：通过射线与物体交互来触发不同的场景事件。

## 4. 总结

- Raycasting 是一种基于射线的算法，用于检测射线与场景中物体的交点。
- 在 Three.js 中，Raycaster 类用于实现这一功能。
- 通过射线与物体的交点检测，可以实现点击选择、碰撞检测等交互效果。
