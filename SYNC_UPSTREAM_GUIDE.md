# 同步 Vben 上游更新指南

## 概述

本项目基于 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 进行二次开发。定期同步上游更新可以获取官方的新功能、性能优化和 Bug 修复，但也可能遇到代码合并冲突。

本指南说明冲突产生的场景、如何预判以及解决方法。

---

## 什么情况下会产生冲突？

Git 冲突发生在**同一文件的同一位置**被双方（你的仓库和上游）都做了不同的修改：

1. 上游修改了文件 A 的第 10-20 行
2. 你也修改了文件 A 的第 10-20 行
3. Git 无法判断应该保留哪一方的修改 → **冲突产生**

**本次同步（无冲突）**：你的自定义代码（字典管理、系统管理模块等）和上游的更新（组件文档、Bug 修复、新功能）没有重叠的修改。

---

## 本项目容易出现冲突的典型场景

### 1. 核心配置文件

```
package.json          # 依赖版本、scripts
pnpm-workspace.yaml   # 工作区配置
vite.config.ts        # 构建配置
tailwind.config.ts    # CSS 配置
```

- **原因**：项目初始化后通常会调整这些配置，而上游也在持续更新构建体系。
- **风险等级**：高

### 2. 偏好设置 / 主题系统

```
packages/effects/layouts/           # 布局组件
packages/@core/ui-kit/             # UI 组件库
packages/preferences/              # 偏好配置
```

- **原因**：上游新增功能（如时区选项、主题色调整）时，如果你也修改了偏好设置相关组件，就容易冲突。
- **风险等级**：中高
- **示例**：本次上游新增了"时区选项"，如果你之前自定义过 `preferences-drawer.vue`，就可能冲突。

### 3. 路由和菜单系统

```
apps/web-antd/src/router/          # 路由配置
packages/effects/access/           # 权限控制
```

- **原因**：你新增了字典管理、系统管理模块，如果上游重构了路由生成逻辑或权限校验方式，就会冲突。
- **风险等级**：中

### 4. API 层和数据 Mock

```
apps/backend-mock/                 # Mock 服务
packages/effects/request/          # 请求封装
```

- **原因**：项目已将 Mock 服务移除，改为真实后端 API，并修改了响应格式（`code → success boolean`）。如果上游调整了请求拦截器或响应处理逻辑，就会冲突。
- **风险等级**：中

### 5. 国际化文件

```
packages/locales/src/langs/        # 语言包
```

- **原因**：上游新增功能需要新增翻译 key，如果你也加了自定义翻译，同一文件的相近位置容易冲突。
- **风险等级**：低中

### 6. 业务页面组件

```
apps/web-antd/src/views/           # 业务页面
```

- **原因**：如果你基于上游的某个页面（如用户管理）进行了二次开发，而上游也更新了该页面，就会冲突。
- **风险等级**：取决于上游更新频率

---

## 如何预判和避免冲突？

### 策略一：小步快跑，频繁同步

不要积攒太多上游提交再合并：

```bash
# 1. 查看上游有多少新提交
git fetch upstream
git log HEAD...upstream/main --oneline

# 2. 如果差异小（5-10 个提交），直接合并
# 3. 如果差异大（几十个提交），建议分批处理或选合适时机
```

### 策略二：同步前检查高风险文件

```bash
# 查看上游修改了哪些文件
git log --name-only HEAD...upstream/main

# 查看你和上游都修改过的文件（高风险区）
git merge-tree $(git merge-base HEAD upstream/main) HEAD upstream/main
```

### 策略三：关注上游 Release 说明

在合并前，先查看上游的 Release Notes 或最近提交：

```bash
# 查看上游最近的提交说明
git log upstream/main --oneline -20
```

重点关注涉及以下关键词的提交：

- `refactor`（重构）
- `feat: preferences`（偏好设置）
- `feat: layout`（布局）
- `feat: router`（路由）

---

## 冲突解决原则

如果发生冲突，按以下优先级处理：

| 修改类型                                    | 处理建议                   |
| ------------------------------------------- | -------------------------- |
| 通用功能 / 官方 Bug 修复                    | 接受上游版本               |
| 你的业务代码（字典管理、系统管理）          | 保留你的修改               |
| 配置文件（package.json, vite.config.ts 等） | 手动合并，保留双方必要配置 |
| UI 组件样式调整                             | 评估后选择，或合并双方改动 |

---

## 推荐的同步流程

### 步骤 1：备份当前分支

```bash
# 创建备份分支（建议每次同步前都执行）
git branch backup-before-sync-$(date +%Y%m%d)
```

### 步骤 2：获取上游更新

```bash
git fetch upstream
```

### 步骤 3：检查差异

```bash
# 查看上游新提交数量
git rev-list --count HEAD...upstream/main

# 查看具体改了哪些文件
git log --name-only HEAD...upstream/main
```

### 步骤 4：执行合并

```bash
# 合并上游 main 分支
git merge upstream/main --no-edit
```

### 步骤 5：处理冲突（如有）

```bash
# 查看冲突文件列表
git status

# 冲突文件中会显示标记：
# <<<<<<< HEAD
# 你的代码
# =======
# 上游代码
# >>>>>>> upstream/main

# 编辑文件解决冲突后，标记为已解决
git add <文件名>

# 完成合并
git commit -m "merge: sync upstream and resolve conflicts"
```

### 步骤 6：测试验证

```bash
# 安装依赖（上游可能有新增依赖）
pnpm install

# 类型检查
pnpm check:type

# 启动开发服务器验证
pnpm dev:antd
```

### 步骤 7：推送到远程

```bash
git push origin main
```

---

## 如果合并失败，如何回退？

如果在合并过程中遇到大量冲突，难以解决，可以放弃合并并回退：

```bash
# 中止当前合并
git merge --abort

# 或者重置到备份分支
git reset --hard backup-before-sync-$(date +%Y%m%d)
```

---

## 历史同步记录

| 日期 | 上游提交 | 冲突情况 | 更新内容摘要 |
| --- | --- | --- | --- |
| 2026-05-12 | 5 个提交 | 无冲突 | VCropper 文档、Logo 主题修复、Tiptap maxHeight、Input focus 修复、时区选项 |

---

## 相关命令速查

```bash
# 查看远程仓库配置
git remote -v

# 添加上游仓库（如未添加）
git remote add upstream https://github.com/vbenjs/vue-vben-admin.git

# 获取上游更新
git fetch upstream

# 对比差异
git log --oneline --graph --left-right --decorate HEAD...upstream/main

# 统计差异提交数
git rev-list --count HEAD...upstream/main

# 合并上游分支
git merge upstream/main --no-edit

# 查看合并状态
git status

# 中止合并
git merge --abort
```

---

## 总结

- **冲突是常态，没冲突是运气**
- 保持频繁同步，降低单次合并的复杂度
- 同步前做好分支备份
- 优先采用上游的通用修复，保留自己的业务代码
- 合并后务必进行类型检查和功能验证
