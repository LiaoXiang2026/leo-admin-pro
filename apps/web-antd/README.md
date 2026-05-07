# Leo Admin Pro

基于 Vue Vben Admin 5.0 二次开发的企业级中后台管理系统。

## 技术栈

- **核心框架**：Vue 3 + TypeScript + Vite
- **状态管理**：Pinia
- **路由**：Vue Router
- **UI 组件库**：Ant Design Vue
- **样式方案**：Tailwind CSS v4
- **构建工具**：pnpm Monorepo + Turbo
- **HTTP 请求**：Axios
- **图表**：ECharts
- **代码规范**：ESLint + Oxlint + Stylelint + cspell

## 已集成能力

### 基础能力
- [x] Monorepo 架构（pnpm workspace + Turbo）
- [x] TypeScript 全量类型覆盖
- [x] 动态路由 + RBAC 权限框架
- [x] 国际化（Vue I18n）
- [x] 多主题支持（Tailwind CSS + 自定义主题色）
- [x] API 类型自动生成（Swagger → TypeScript）

### 业务模块
- [x] **数据看板**
  - 访问趋势分析
  - 访问量统计
  - 销售数据
  - 访问来源分布
  - 工作空间
- [x] **系统管理 - 用户管理**（列表/搜索/新增/编辑/删除）
- [x] **系统管理 - 角色管理**（真实后端对接）
- [x] **系统管理 - 菜单管理**（树形展示/基础 CRUD）

## 待开发能力

### P0 - 企业级必备
- [ ] **日志管理**
  - 操作日志（操作人/时间/模块/结果）
  - 登录日志（IP/设备/登录状态）
  - 异常日志（前端错误上报）
- [ ] **真实后端对接**
  - 用户管理 API 替换 Mock
  - 菜单 CRUD API 替换 Mock
- [ ] **文件/图片上传**
  - 头像上传
  - 文件管理
  - OSS 直传集成
- [ ] **个人中心**
  - 修改密码
  - 个人信息编辑
  - 偏好设置

### P1 - 提升竞争力
- [ ] **数据字典管理**（系统参数/字典项 CRUD）
- [ ] **定时任务管理**（任务列表/执行日志/手动触发）
- [ ] **通知/消息中心**（站内消息/系统通知）
- [ ] **按钮级权限控制**（`v-access:code` 落地）

### P2 - 加分项
- [ ] **ECharts 数据大屏**（完整可视化大屏）
- [ ] **多租户支持**（租户管理/套餐管理）
- [ ] **国际化完善**（业务页面多语言补充）
- [ ] **性能优化**（路由懒加载/组件按需/打包分析）

## 快速开始

### 安装

```bash
pnpm install
```

### 开发

```bash
pnpm dev:antd
```

### 构建

```bash
pnpm build:antd
```

### API 类型生成

```bash
pnpm -F @vben/web-antd run generate:api
```

## 项目结构

```
apps/web-antd/
├── src/
│   ├── api/              # API 接口
│   │   ├── generated/    # Swagger 自动生成
│   │   ├── core/         # 核心接口（登录/用户）
│   │   └── system/       # 系统管理接口
│   ├── views/            # 页面组件
│   │   ├── dashboard/    # 数据看板
│   │   └── system/       # 系统管理
│   ├── router/           # 路由配置
│   ├── store/            # Pinia 状态
│   ├── adapter/          # 组件适配器
│   └── locales/          # 国际化
└── package.json
```

## 开发规范

- 使用 `<script setup>` 语法
- 组件命名 PascalCase，文件命名 kebab-case
- API 接口使用 namespace 组织类型
- 提交信息遵循 Conventional Commits

## 许可证

MIT
