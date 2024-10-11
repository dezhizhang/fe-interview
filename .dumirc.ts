/*
 * :file description:
 * :name: /fe-interview/.dumirc.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-10 20:20:45
 * :last editor: 张德志
 * :date last edited: 2024-10-11 16:47:50
 */
import { defineConfig } from 'dumi';

import path from 'path';
import OSS_CONFIG from './config/oss';
const { REACT_APP_ENV } = process.env;
const isProduction = process.env.NODE_ENV === 'production';
//获取package.json中的version变量,需要根据项目目录结构确认

const PKG = require(path.resolve(process.cwd(), 'package.json'));
const WebpackAliyunOssPlugin = require('webpack-aliyun-oss-plugin');
const baseURL = 'https://cdn.xiaozhi.shop';

// 静态文件路径前缀
const VER_PATH =
  REACT_APP_ENV === 'prod' ? `${baseURL}/${PKG.name}/` : `/`; // 获取编译环境配置

const publicPath = isProduction ? VER_PATH : '/';

export default defineConfig({
  themeConfig: {
    mode: 'site',
    name: 'fe-interview',
    antd: {},
    base: '/',
    logo: `${baseURL}/digitwin/assets/logo.svg`,
    history: { type: 'hash' },
    footer: false,
    nav: [
      {
        title: 'ECMAScript',
        link: '/ecmascript',
      },
      {
        title: 'Typescript',
        link: '/typescript',
      },
      {
        title: 'Webgl',
        link: '/webgl',
      },
    ],
  },
  favicons:[`${baseURL}/digitwin/assets/logo.svg`],
  publicPath: publicPath,
  outputPath: `${PKG.name}`,
  chainWebpack(memo: any) {
    if (REACT_APP_ENV === 'prod') {
      memo.plugin('WebpackAliyunOssPlugin').use(WebpackAliyunOssPlugin, [
        {
          ...OSS_CONFIG,
          filter: function (build: any) {
            return !/\.html$/.test(build);
          },
        },
      ]);
    }
  },
});
