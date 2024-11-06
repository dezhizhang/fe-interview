# 如何在 Three.js 中加载 3D 模型？

在 Three.js 中加载 3D 模型是一个常见的任务，通常使用不同的加载器（Loader）来加载不同格式的模型文件，如 `.gltf`、`.obj`、`.fbx` 等。下面介绍了如何在 Three.js 中加载 3D 模型的常用方法。

## 1. 使用 `GLTFLoader` 加载 `.gltf` 和 `.glb` 模型

`GLTFLoader` 是 Three.js 中最常用的加载器之一，它支持 `.gltf` 和 `.glb` 格式。GLTF 格式是一个基于 JSON 的格式，而 `.glb` 是其二进制版本，具有更好的性能。

### 示例代码：

```javascript
// 引入 GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

// 创建加载器
const loader = new GLTFLoader();

// 加载 GLTF 模型
loader.load(
  'model.glb',
  (gltf) => {
    // 模型加载成功后将其添加到场景
    scene.add(gltf.scene);

    // 可选：调整模型的位置、旋转或缩放
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.set(0, Math.PI / 2, 0); // 旋转模型
  },
  undefined,
  (error) => {
    console.error('模型加载失败', error);
  },
);

// 设置摄像机位置
camera.position.z = 5;

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## 2. 使用 OBJLoader 加载 .obj 模型

OBJLoader 是用于加载 .obj 格式模型的加载器。OBJ 格式较为简单，适合简单的几何形状，但不支持动画和复杂的材质。

示例代码：

```javascript
// 引入 OBJLoader
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

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

// 创建加载器
const loader = new OBJLoader();

// 加载 OBJ 模型
loader.load(
  'model.obj',
  (object) => {
    // 将加载的模型添加到场景
    scene.add(object);

    // 可选：调整模型的位置、旋转或缩放
    object.position.set(0, 0, 0);
  },
  undefined,
  (error) => {
    console.error('模型加载失败', error);
  },
);

// 设置摄像机位置
camera.position.z = 5;

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## 3. 使用 FBXLoader 加载 .fbx 模型

FBXLoader 用于加载 .fbx 格式的模型，适合高质量的动画和复杂模型。FBX 格式支持动画、材质和纹理等。

示例代码：

```javascript
// 引入 FBXLoader
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

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

// 创建加载器
const loader = new FBXLoader();

// 加载 FBX 模型
loader.load(
  'model.fbx',
  (object) => {
    // 将加载的模型添加到场景
    scene.add(object);

    // 可选：调整模型的位置、旋转或缩放
    object.position.set(0, 0, 0);
  },
  undefined,
  (error) => {
    console.error('模型加载失败', error);
  },
);

// 设置摄像机位置
camera.position.z = 5;

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## 4. 使用 PLYLoader 加载 .ply 模型

PLYLoader 是用于加载 .ply 格式的模型，常用于科学和工程应用中，支持颜色、透明度和表面法线等属性。

示例代码：

```js
// 引入 PLYLoader
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';

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

// 创建加载器
const loader = new PLYLoader();

// 加载 PLY 模型
loader.load('model.ply', (geometry) => {
  // 将加载的几何体添加到场景
  const material = new THREE.MeshBasicMaterial({ color: 0x0055ff });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});

// 设置摄像机位置
camera.position.z = 5;

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## 总结

- GLTFLoader：用于加载 .gltf 和 .glb 格式，现代 Web 3D 模型格式，支持动画、材质、纹理等。
- OBJLoader：用于加载 .obj 格式，简单的几何模型，常用于静态模型。
- FBXLoader：用于加载 .fbx 格式，适用于高质量动画和复杂模型。
- PLYLoader：用于加载 .ply 格式，常用于科学计算和研究。
