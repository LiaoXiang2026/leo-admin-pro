<div align="center">
  <h1>Leo Admin Pro</h1>
  <p>基于 Vue Vben Admin 5.0 二次开发的企业级中后台管理系统</p>
</div>

## 简介

Leo Admin Pro 是基于 Vue Vben Admin 5.0 进行二次开发的企业级中后台解决方案。采用 Vue 3、Vite、TypeScript、Monorepo 等主流技术，开箱即用，适合快速搭建企业级管理系统。

## 技术栈

- **核心框架**：Vue 3 + TypeScript + Vite
- **状态管理**：Pinia
- **路由**：Vue Router（动态路由 + 权限控制）
- **UI 组件库**：Ant Design Vue
- **样式方案**：Tailwind CSS v4
- **构建工具**：pnpm Monorepo + Turbo
- **HTTP 请求**：Axios
- **图表**：ECharts
- **代码规范**：ESLint + Oxlint + Stylelint

## 特性

- **Monorepo 架构**：pnpm workspace + Turbo，30+ 个 package 高效复用
- **类型安全**：全量 TypeScript，Swagger API 自动生成类型定义
- **权限系统**：基于动态路由的 RBAC 权限控制（菜单级/按钮级）
- **多主题支持**：内置多套主题色，支持自定义主题
- **国际化**：Vue I18n 多语言方案
- **工程化体系**：ESLint + Oxlint + Stylelint + cspell + Changeset + Lefthook
- **测试体系**：Vitest 单元测试 + Playwright E2E 测试

## 已集成模块

| 模块 | 功能 |
|------|------|
| 数据看板 | 访问趋势、访问量统计、销售数据、来源分布、工作空间 |
| 用户管理 | 列表/搜索/新增/编辑/删除（Mock） |
| 角色管理 | 列表/搜索/新增/编辑/删除（真实 API） |
| 菜单管理 | 树形展示/基础 CRUD（部分 Mock） |

## 快速开始

### 环境要求

- Node.js >= 20.19.0
- pnpm >= 10.0.0

### 安装

```bash
npm i -g corepack
pnpm install
```

### 开发

```bash
pnpm dev:antd      # 启动 Ant Design Vue 版本
pnpm dev:ele       # 启动 Element Plus 版本
pnpm dev:naive     # 启动 Naive UI 版本
pnpm dev:tdesign   # 启动 TDesign 版本
```

### 构建

```bash
pnpm build:antd    # 构建 Ant Design Vue 版本
pnpm build         # 构建全部
```

### API 类型生成

```bash
pnpm -F @vben/web-antd run generate:api
```

## 项目结构

```
├── apps/
│   ├── web-antd/           # Ant Design Vue 版本（主力开发）
│   ├── web-ele/            # Element Plus 版本
│   ├── web-naive/          # Naive UI 版本
│   ├── web-tdesign/        # TDesign 版本
│   └── backend-mock/       # Nitro Mock 服务
├── packages/
│   ├── @core/              # 核心基础包
│   ├── effects/            # 业务效果包
│   ├── stores/             # Pinia 状态管理
│   ├── locales/            # 国际化
│   ├── icons/              # 图标系统
│   └── ...
├── internal/               # 内部工具链
└── docs/                   # 文档
```

## 开发规范

- 使用 `<script setup>` 语法
- 组件命名 PascalCase，文件命名 kebab-case
- API 接口使用 namespace 组织类型
- 提交信息遵循 Conventional Commits：`feat:` / `fix:` / `refactor:` / `docs:` / `chore:`

## 浏览器支持

| Chrome | Firefox | Safari | Edge |
|:------:|:-------:|:------:|:----:|
| last 2 | last 2  | last 2 | last 2 |

不支持 IE

## 文档

- [Vben Admin 官方文档](https://doc.vben.pro/)
- [apps/web-antd/README.md](./apps/web-antd/README.md) - 本项目的详细开发文档

## 许可证

[MIT](./LICENSE)
