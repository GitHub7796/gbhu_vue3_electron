# Vutron 项目结构说明

## 项目概述

Vutron 是一个基于 Vite + Vue 3 + Electron 的跨平台桌面应用快速启动模板。该项目提供了一个完整的开发环境，支持热重载、多语言、主题切换等功能。

## 目录结构详解

### 根目录文件

| 文件名 | 作用 |
| --- | --- |
| [`package.json`](package.json:1) | 项目配置文件，包含依赖、脚本、项目信息等 |
| [`README.md`](README.md:1) | 项目说明文档 |
| [`vite.config.mts`](vite.config.mts:1) | Vite 构建配置，包含 Electron 和 Vue 插件配置 |
| [`tsconfig.json`](tsconfig.json:1) | TypeScript 配置文件 |
| [`tsconfig.node.json`](tsconfig.node.json) | Node.js 环境的 TypeScript 配置 |
| [`eslint.config.ts`](eslint.config.ts) | ESLint 代码规范配置 |
| [`.prettierrc`](.prettierrc) | Prettier 代码格式化配置 |
| [`.prettierignore`](.prettierignore) | Prettier 忽略文件配置 |
| [`.gitignore`](.gitignore) | Git 忽略文件配置 |
| [`.editorconfig`](.editorconfig) | 编辑器配置文件 |
| [`pnpm-workspace.yaml`](pnpm-workspace.yaml) | pnpm 工作区配置 |
| [`playwright.config.ts`](playwright.config.ts) | Playwright 测试配置 |

### `.github/` 目录

- GitHub Actions 相关配置文件，用于自动化 CI/CD 流程

### `.vscode/` 目录

- VS Code 编辑器配置文件，包含工作区设置和推荐插件

### `buildAssets/` 目录

#### `buildAssets/builder/`

- [`config.js`](buildAssets/builder/config.js:1) - Electron Builder 构建配置，定义了不同平台的打包选项

#### `buildAssets/icons/`

- [`icon.icns`](buildAssets/icons/icon.icns) - macOS 应用图标
- [`icon.ico`](buildAssets/icons/icon.ico) - Windows 应用图标
- [`icon.png`](buildAssets/icons/icon.png) - 通用应用图标
- [`icon16.png`](buildAssets/icons/icon16.png) - 16x16 像素应用图标

### `docs/` 目录

项目文档，使用 VitePress 构建

#### `docs/package.json`

- 文档项目的依赖配置

#### `docs/src/` 目录

- `.vitepress/` - VitePress 配置文件
- `public/` - 文档静态资源
- `en/` - 英文文档
- `ko/` - 韩文文档
- `zhHans/` - 简体中文文档
- `zhHant/` - 繁体中文文档

### `src/` 目录

项目源代码目录

#### `src/vue-shim.d.ts`

- Vue 类型声明文件，用于 TypeScript 类型支持

#### `src/main/` 目录

Electron 主进程代码

- [`index.ts`](src/main/index.ts:1) - 主进程入口文件，处理应用生命周期
- [`index.dev.ts`](src/main/index.dev.ts) - 开发环境主进程入口
- [`MainRunner.ts`](src/main/MainRunner.ts:1) - 主窗口和错误窗口创建逻辑
- [`IPCs.ts`](src/main/IPCs.ts:1) - IPC 通信处理器，定义主进程和渲染进程间的通信接口
- [`tray.ts`](src/main/tray.ts) - 系统托盘功能实现
- [`utils/`](src/main/utils/) - 主进程工具函数
  - [`Constants.ts`](src/main/utils/Constants.ts:1) - 应用常量定义，包含应用配置、平台检测等

#### `src/preload/` 目录

预加载脚本，用于安全地暴露主进程 API 给渲染进程

- [`index.ts`](src/preload/index.ts:1) - 预加载脚本入口，通过 contextBridge 暴露 API

#### `src/renderer/` 目录

Vue 3 渲染进程代码

- [`App.vue`](src/renderer/App.vue:1) - Vue 应用根组件
- [`index.html`](src/renderer/index.html) - 渲染进程 HTML 模板
- [`main.ts`](src/renderer/main.ts:1) - Vue 应用入口文件

##### `src/renderer/components/` 目录

Vue 组件

- `layout/` - 布局组件
  - [`DefaultLayout.vue`](src/renderer/components/layout/DefaultLayout.vue:1) - 默认布局组件
  - [`HeaderLayout.vue`](src/renderer/components/layout/HeaderLayout.vue) - 头部布局组件
  - [`index.ts`](src/renderer/components/layout/index.ts) - 布局组件导出文件

##### `src/renderer/screens/` 目录

页面组件

- [`MainScreen.vue`](src/renderer/screens/MainScreen.vue:1) - 主页面，包含应用主要功能
- [`SecondScreen.vue`](src/renderer/screens/SecondScreen.vue) - 第二个示例页面
- [`ErrorScreen.vue`](src/renderer/screens/ErrorScreen.vue) - 错误页面
- [`index.ts`](src/renderer/screens/index.ts) - 页面组件导出文件

##### `src/renderer/plugins/` 目录

Vue 插件

- [`vuetify.ts`](src/renderer/plugins/vuetify.ts:1) - Vuetify UI 框架配置
- [`i18n.ts`](src/renderer/plugins/i18n.ts:1) - Vue I18n 国际化配置
- [`pinia.ts`](src/renderer/plugins/pinia.ts) - Pinia 状态管理配置

##### `src/renderer/router/` 目录

Vue Router 路由配置

- [`index.ts`](src/renderer/router/index.ts:1) - 路由定义和配置

##### `src/renderer/store/` 目录

Pinia 状态管理

- [`counter.ts`](src/renderer/store/counter.ts:1) - 计数器状态管理示例

##### `src/renderer/utils/` 目录

渲染进程工具函数

- [`index.ts`](src/renderer/utils/index.ts:1) - 工具函数导出，包含国际化、文件操作等

##### `src/renderer/locales/` 目录

国际化语言文件

- [`en.json`](src/renderer/locales/en.json) - 英文语言包
- [`ko.json`](src/renderer/locales/ko.json) - 韩文语言包
- [`zh-hans.json`](src/renderer/locales/zh-hans.json) - 简体中文语言包
- [`zh-hant.json`](src/renderer/locales/zh-hant.json) - 繁体中文语言包
- [`de.json`](src/renderer/locales/de.json) - 德文语言包
- [`es.json`](src/renderer/locales/es.json) - 西班牙文语言包
- [`ja.json`](src/renderer/locales/ja.json) - 日文语言包
- [`fr.json`](src/renderer/locales/fr.json) - 法文语言包
- [`ru.json`](src/renderer/locales/ru.json) - 俄文语言包
- [`pt.json`](src/renderer/locales/pt.json) - 葡萄牙文语言包
- [`nl.json`](src/renderer/locales/nl.json) - 荷兰文语言包

#### `src/public/` 目录

静态资源文件

- [`images/`](src/public/images/) - 图片资源
  - [`vutron-logo.webp`](src/public/images/vutron-logo.webp) - 应用 logo
  - [`vutron-tray-icon.png`](src/public/images/vutron-tray-icon.png) - 托盘图标

### `tests/` 目录

测试相关文件

- [`fixtures.mts`](tests/fixtures.mts) - 测试夹具配置
- [`testUtil.mts`](tests/testUtil.mts) - 测试工具函数
- [`specs/`](tests/specs/) - 测试用例
  - [`app.spec.ts`](tests/specs/app.spec.ts) - 应用测试用例

## 主要功能特性

1. **跨平台支持** - 基于 Electron，支持 Windows、macOS、Linux
2. **现代技术栈** - Vue 3 + TypeScript + Vite
3. **国际化支持** - 支持多种语言（英文、中文、韩文、德文、西班牙文、日文、法文、俄文、葡萄牙文、荷兰文）
4. **主题切换** - 支持明暗主题切换
5. **状态管理** - 使用 Pinia 进行状态管理
6. **UI 框架** - 使用 Vuetify 3 构建 UI 界面
7. **文件操作** - 支持文件选择和打开外部链接
8. **系统托盘** - 支持系统托盘功能
9. **热重载** - 开发环境支持热重载
10. **自动化测试** - 使用 Playwright 进行端到端测试

## 开发和构建

项目提供了完整的开发和构建脚本：

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run test` - 运行测试
- `npm run lint` - 代码检查
- `npm run format:fix` - 代码格式化

这个项目结构清晰，模块化程度高，是一个很好的 Electron + Vue 3 项目模板。
