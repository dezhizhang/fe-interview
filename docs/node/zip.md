# 使用 Node.js 压缩图片

## 安装依赖

首先，确保安装 `sharp` 库：

```bash
npm install sharp
```

## 压缩图片的方法

```js
const sharp = require('sharp');

const compressImage = async (inputPath, outputPath, quality = 80) => {
  try {
    await sharp(inputPath)
      .jpeg({ quality }) // 你也可以使用 .png() 或 .webp() 等
      .toFile(outputPath);
    console.log('图片压缩完成:', outputPath);
  } catch (error) {
    console.error('压缩出错:', error);
  }
};

// 使用示例
compressImage('input.jpg', 'output.jpg');
```
## 使用说明

- inputPath：原始图片路径
- outputPath：压缩后图片保存路径
- quality：压缩质量（默认值为 80）

