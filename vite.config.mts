/**
 * Vite 配置文件 - Electron + Vue 3 项目
 * 负责配置 Vite 构建工具的各项参数，包括主进程、预加载脚本和渲染进程的构建配置
 */

/**
 * 导入必要的模块和函数
 */
import { fileURLToPath } from 'url' // 将 file URL 转换为文件路径，用于处理 ES 模块中的路径问题
import { defineConfig, loadEnv } from 'vite' // Vite 的核心配置函数和环境变量加载函数
import ElectronPlugin, { ElectronOptions } from 'vite-plugin-electron' // Electron 插件及其类型定义
import RendererPlugin from 'vite-plugin-electron-renderer' // Electron 渲染进程插件，用于支持在渲染进程中使用 Node.js API
import EslintPlugin from 'vite-plugin-eslint' // ESLint 插件，用于在构建过程中进行代码风格检查
import VueJsx from '@vitejs/plugin-vue-jsx' // Vue JSX 支持插件，用于在 Vue 中使用 JSX 语法
import Vue from '@vitejs/plugin-vue' // Vue 3 插件，用于支持 Vue 单文件组件
import { rmSync } from 'fs' // 文件系统模块的同步删除函数
import { resolve, dirname } from 'path' // 路径处理模块，用于处理文件路径
import { builtinModules } from 'module' // Node.js 内置模块列表，用于配置外部依赖

/**
 * 判断当前是否为开发环境
 * @type {boolean}
 */
const isDevEnv = process.env.NODE_ENV === 'development'

/**
 * 导出 Vite 配置函数
 * @param {Object} { mode } - 构建模式（如 development, production）
 * @returns {Object} Vite 配置对象
 */
export default defineConfig(({ mode }) => {
  /**
   * 配置环境变量
   * 1. 在开发环境下启用 Electron 日志
   * 2. 合并现有环境变量
   * 3. 加载指定模式的环境变量文件（如 .env.development, .env.production）
   */
  process.env = {
    ...(isDevEnv
      ? { ELECTRON_ENABLE_LOGGING: 'true' } // 开发环境下启用 Electron 日志
      : {}),
    ...process.env, // 保留现有环境变量
    ...loadEnv(mode, process.cwd()) // 加载指定模式的环境变量文件
  }

  /**
   * 清理构建目录
   * 删除 dist 目录及其所有内容，确保每次构建都是全新的
   * recursive 递归删除目录
   * force 忽略错误
   */
  rmSync('dist', { recursive: true, force: true })

  /**
   * Electron 插件配置数组
   * 包含主进程和预加载脚本的构建配置
   * @type {ElectronOptions[]}
   */
  const electronPluginConfigs: ElectronOptions[] = [
    {
      /**
       * 主进程配置
       */
      entry: 'src/main/index.ts', // 主进程入口文件
      onstart({ startup }) {
        // 开发环境下启动 Electron 并开启调试
        const debugArgs = [
          '.', // 当前目录
          '--inspect=9228', // 主进程调试端口
          '--remote-debugging-port=9229' // 渲染进程调试端口
        ]
        startup(debugArgs) // 启动 Electron 应用
      },
      vite: {
        root: resolve('.'), // 项目根目录
        base: './', // 资源基础路径
        publicDir: resolve('./src/public'), // 公共资源目录
        build: {
          sourcemap: true, // 生成 sourcemap 文件，便于调试
          assetsDir: '.', // 资源输出目录
          outDir: 'dist/main', // 主进程构建输出目录
          rollupOptions: {
            // 外部依赖配置，不将这些模块打包进最终文件
            external: ['electron', ...builtinModules]
          }
        }
      }
    },
    {
      /**
       * 预加载脚本配置
       */
      entry: 'src/preload/index.ts', // 预加载脚本入口文件
      onstart({ reload }) {
        reload() // 预加载脚本修改时重新加载渲染进程
      },
      vite: {
        root: resolve('.'), // 项目根目录
        build: {
          outDir: 'dist/preload' // 预加载脚本构建输出目录
        }
      }
    }
  ]

  /**
   * 开发环境下添加额外的主进程开发配置
   */
  if (isDevEnv) {
    electronPluginConfigs.push({
      entry: 'src/main/index.dev.ts', // 开发环境下的主进程入口文件
      vite: {
        root: resolve('.'), // 项目根目录
        build: {
          outDir: 'dist/main' // 构建输出目录，与主进程相同
        }
      }
    })
  }

  /**
   * 返回 Vite 主配置对象
   * 主要用于配置渲染进程的构建参数
   */
  return {
    /**
     * 全局常量定义
     * 用于配置 Vue I18n 相关选项
     */
    define: {
      __VUE_I18N_FULL_INSTALL__: true, // 完全安装 Vue I18n
      __VUE_I18N_LEGACY_API__: false, // 禁用 Vue I18n 旧版 API
      __INTLIFY_PROD_DEVTOOLS__: false // 生产环境下禁用国际化开发工具
    },
    /**
     * 解析配置
     */
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.vue', '.json', '.scss'], // 自动解析的文件扩展名
      alias: {
        '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src') // 路径别名，将 @ 指向 src 目录
      }
    },
    base: './', // 资源基础路径，使用相对路径
    root: resolve('./src/renderer'), // 渲染进程根目录
    publicDir: resolve('./src/public'), // 公共资源目录
    clearScreen: false, // 不清空控制台，以便查看 Electron 日志
    /**
     * 构建配置
     */
    build: {
      sourcemap: isDevEnv, // 开发环境下生成 sourcemap
      minify: !isDevEnv, // 生产环境下启用代码压缩
      outDir: resolve('./dist') // 渲染进程构建输出目录
    },
    /**
     * 插件配置
     */
    plugins: [
      Vue(), // Vue 3 插件
      VueJsx(), // Vue JSX 支持插件
      // ESLint 插件，用于在构建过程中进行代码风格检查
      // Docs: https://github.com/gxmari007/vite-plugin-eslint
      EslintPlugin(),
      // Electron 插件，用于构建主进程和预加载脚本
      // Docs: https://github.com/electron-vite/vite-plugin-electron
      ElectronPlugin(electronPluginConfigs),
      RendererPlugin() // Electron 渲染进程插件
    ]
  }
})
