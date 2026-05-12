# 字典管理页面设计

## 背景

当前 `apps/web-antd` 已有用户管理、角色管理，缺少字典管理。字典管理是后台系统的核心基础设施，用于统一管理下拉选项、状态值等常量数据。

## 目标

新增一个字典管理页面，采用左右分栏布局：左侧字典类型、右侧字典数据，支持完整的 CRUD 操作。

## 设计决策

### 布局方案

采用**经典左右分栏表格**（方案一）：
- 左侧：字典类型表格，紧凑模式，占 1/3
- 右侧：字典数据表格，占 2/3
- 点击左侧类型 → 右侧自动加载对应数据

不采用卡片列表或树形方案，因为和现有系统风格一致，开发成本最低。

### 组件命名

采用大驼峰语义化命名，体现 CRUD 职责：
- `DictTypeModal.vue` — 类型的新增/编辑
- `DictDataModal.vue` — 数据的新增/编辑

### API 规范

只用 GET 和 POST（适配部分后端规范）：
- 查询：`GET /api/dict/type/list`、`GET /api/dict/data/list`
- 增删改：统一 `POST`，操作类型由 path 区分

## 数据模型

### 字典类型

```typescript
interface DictType {
  id: number;
  code: string;        // 类型编码，唯一
  name: string;        // 类型名称
  remark?: string;     // 备注
  createTime: string;
}
```

### 字典数据

```typescript
interface DictData {
  id: number;
  typeCode: string;    // 所属类型编码
  label: string;       // 标签名
  value: string;       // 字典值
  sort: number;        // 排序
  status: number;      // 0-禁用, 1-正常
  remark?: string;     // 备注
  createTime: string;
}
```

## API 接口

| 接口 | 方法 | 路径 |
|------|------|------|
| 获取字典类型列表 | GET | `/api/dict/type/list` |
| 创建字典类型 | POST | `/api/dict/type` |
| 更新字典类型 | POST | `/api/dict/type/update` |
| 删除字典类型 | POST | `/api/dict/type/delete` |
| 获取字典数据列表 | GET | `/api/dict/data/list` |
| 创建字典数据 | POST | `/api/dict/data` |
| 更新字典数据 | POST | `/api/dict/data/update` |
| 删除字典数据 | POST | `/api/dict/data/delete` |
| 批量删除字典数据 | POST | `/api/dict/data/deleteBatch` |

> 如果后端暂未提供接口，先用前端 mock 数据实现，接口结构预留好。

## 组件结构

```
views/system/dict/
├── index.vue              # 主页面（左右分栏 + 表格 + 弹窗引用）
├── components/
│   ├── DictTypeModal.vue  # 字典类型 新增/编辑弹窗
│   └── DictDataModal.vue  # 字典数据 新增/编辑弹窗
└── schema.ts              # 表格列 + 搜索表单 + 弹窗表单配置
```

## 数据流

1. 页面初始化 → 加载字典类型列表 → 默认选中第一条 → 加载对应字典数据
2. 点击左侧类型 → 高亮选中行 → 右侧表格重新查询（带 `typeCode` 参数）
3. 弹窗提交成功 → `message.success` → 调用 `onRefresh()` 刷新对应表格
4. 删除类型前校验 → 如果该类型下还有数据，提示先删除数据

## 错误处理

- **删除有数据的类型**：前端判断右侧数据条数，>0 则提示禁止删除
- **接口异常**：复用现有的 `errorMessageResponseInterceptor`，自动 `message.error`
- **空状态**：右侧未选中类型时，展示空状态提示

## 和现有系统的复用点

- 复用 `Page`、`useVbenVxeGrid`、`useVbenDrawer` 组件
- 复用 `VbenFormSchema`、`VxeTableGridColumns` 类型
- 复用 `CellOperation`、`CellTag` 等渲染器
- i18n 翻译放在 `system.json` 下，key 为 `dict.type.*`、`dict.data.*`

## 适配性

本设计适配市面上主流后台系统：
- 左右分栏是后台系统的经典布局
- 扁平结构覆盖 90% 的字典场景
- API 只用 GET/POST，兼容大多数后端规范
- 组件命名和目录结构清晰，易于维护扩展
