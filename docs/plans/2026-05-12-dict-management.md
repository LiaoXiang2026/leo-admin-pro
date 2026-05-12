# 字典管理页面实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在 `apps/web-antd` 中新增一个完整的字典管理页面，采用左右分栏布局（左侧字典类型、右侧字典数据），支持 CRUD 操作。

**Architecture:** 复用现有 `system/user` 和 `system/role` 的 vxe-table + Drawer 模式。左侧 `DictTypeList` 表格点击后驱动右侧 `DictDataList` 表格加载。两个独立的弹窗组件分别处理类型和数据的增删改。

**Tech Stack:** Vue 3, TypeScript, vxe-table, Ant Design Vue, Vben Admin 组件库

---

## 前置依赖

- 后端接口 `/api/dict/*` 可能尚未实现，先写前端 mock，接口结构预留好
- 翻译字段复用 `system.json`，新增 `dict.type.*` 和 `dict.data.*`
- 路由挂载在 `/system/dict`，加入 `system.ts` 路由模块

---

### Task 1: 新增 i18n 翻译字段

**Files:**
- Modify: `apps/web-antd/src/locales/langs/zh-CN/system.json`

**Step 1: 在 system.json 中追加 dict 翻译**

在文件末尾（最后一个 `}` 之前）追加：

```json
  "dict": {
    "title": "字典管理",
    "type": {
      "title": "字典类型",
      "code": "类型编码",
      "name": "类型名称",
      "remark": "备注",
      "createTime": "创建时间",
      "operation": "操作",
      "placeholder": {
        "code": "请输入类型编码",
        "name": "请输入类型名称"
      }
    },
    "data": {
      "title": "字典数据",
      "label": "标签名",
      "value": "字典值",
      "sort": "排序",
      "status": "状态",
      "remark": "备注",
      "createTime": "创建时间",
      "operation": "操作",
      "placeholder": {
        "label": "请输入标签名",
        "value": "请输入字典值"
      }
    }
  }
```

**Step 2: 验证 JSON 格式**

Run: `npx jsonlint apps/web-antd/src/locales/langs/zh-CN/system.json`
Expected: `Valid JSON`

**Step 3: Commit**

```bash
git add apps/web-antd/src/locales/langs/zh-CN/system.json
git commit -m "feat: add i18n translations for dict management"
```

---

### Task 2: 创建 API 模块（前端 mock）

**Files:**
- Create: `apps/web-antd/src/api/system/dict.ts`

**Step 1: 写 mock 数据和接口**

```typescript
export namespace DictApi {
  export interface DictType {
    id: number;
    code: string;
    name: string;
    remark?: string;
    createTime: string;
  }

  export interface DictData {
    id: number;
    typeCode: string;
    label: string;
    value: string;
    sort: number;
    status: number;
    remark?: string;
    createTime: string;
  }

  export interface DictTypeListParams {
    page?: number;
    pageSize?: number;
    code?: string;
    name?: string;
  }

  export interface DictDataListParams {
    page?: number;
    pageSize?: number;
    typeCode: string;
    label?: string;
  }
}

// ---- mock data ----
let mockTypes: DictApi.DictType[] = [
  { id: 1, code: 'sys_user_status', name: '用户状态', remark: '用户启用禁用状态', createTime: '2024-01-01 00:00:00' },
  { id: 2, code: 'sys_gender', name: '性别', remark: '性别字典', createTime: '2024-01-01 00:00:00' },
  { id: 3, code: 'sys_notice_type', name: '通知类型', remark: '系统通知类型', createTime: '2024-01-02 00:00:00' },
];

let mockData: DictApi.DictData[] = [
  { id: 1, typeCode: 'sys_user_status', label: '启用', value: '1', sort: 1, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
  { id: 2, typeCode: 'sys_user_status', label: '禁用', value: '0', sort: 2, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
  { id: 3, typeCode: 'sys_gender', label: '男', value: '1', sort: 1, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
  { id: 4, typeCode: 'sys_gender', label: '女', value: '2', sort: 2, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
  { id: 5, typeCode: 'sys_gender', label: '未知', value: '0', sort: 3, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
];

let nextTypeId = 100;
let nextDataId = 100;

function paginate<T>(items: T[], page?: number, pageSize?: number) {
  const p = page || 1;
  const ps = pageSize || 10;
  const start = (p - 1) * ps;
  return { items: items.slice(start, start + ps), total: items.length };
}

// ---- type apis ----
export async function getDictTypeList(params?: DictApi.DictTypeListParams) {
  let items = [...mockTypes];
  if (params?.code) items = items.filter(i => i.code.includes(params.code!));
  if (params?.name) items = items.filter(i => i.name.includes(params.name!));
  return paginate(items, params?.page, params?.pageSize);
}

export async function createDictType(data: Partial<DictApi.DictType>) {
  const item: DictApi.DictType = {
    id: nextTypeId++,
    code: data.code || '',
    name: data.name || '',
    remark: data.remark,
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  mockTypes.push(item);
  return item;
}

export async function updateDictType(id: number, data: Partial<DictApi.DictType>) {
  const idx = mockTypes.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Type not found');
  Object.assign(mockTypes[idx], data);
  return mockTypes[idx];
}

export async function deleteDictType(id: number) {
  const idx = mockTypes.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Type not found');
  // 检查是否有数据
  const hasData = mockData.some(d => d.typeCode === mockTypes[idx].code);
  if (hasData) throw new Error('该类型下存在字典数据，请先删除数据');
  mockTypes.splice(idx, 1);
  return true;
}

// ---- data apis ----
export async function getDictDataList(params: DictApi.DictDataListParams) {
  let items = mockData.filter(d => d.typeCode === params.typeCode);
  if (params?.label) items = items.filter(i => i.label.includes(params.label!));
  // 按 sort 排序
  items.sort((a, b) => a.sort - b.sort);
  return paginate(items, params?.page, params?.pageSize);
}

export async function createDictData(data: Partial<DictApi.DictData>) {
  const item: DictApi.DictData = {
    id: nextDataId++,
    typeCode: data.typeCode || '',
    label: data.label || '',
    value: data.value || '',
    sort: data.sort ?? 0,
    status: data.status ?? 1,
    remark: data.remark,
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  mockData.push(item);
  return item;
}

export async function updateDictData(id: number, data: Partial<DictApi.DictData>) {
  const idx = mockData.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Data not found');
  Object.assign(mockData[idx], data);
  return mockData[idx];
}

export async function deleteDictData(id: number) {
  const idx = mockData.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Data not found');
  mockData.splice(idx, 1);
  return true;
}

export async function deleteDictDataBatch(ids: number[]) {
  mockData = mockData.filter(d => !ids.includes(d.id));
  return true;
}
```

**Step 2: 导出**

Modify: `apps/web-antd/src/api/index.ts`

在末尾追加：
```typescript
export * from './system/dict';
```

**Step 3: Commit**

```bash
git add apps/web-antd/src/api/system/dict.ts apps/web-antd/src/api/index.ts
git commit -m "feat: add dict api module with mock data"
```

---

### Task 3: 创建 schema.ts（列 + 表单配置）

**Files:**
- Create: `apps/web-antd/src/views/system/dict/schema.ts`

**Step 1: 写完整 schema**

```typescript
import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridColumns } from '#/adapter/vxe-table';
import type { DictApi } from '#/api';

import { $t } from '#/locales';

// ==================== DictType ====================

export function useTypeGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'code',
      label: $t('system.dict.type.code'),
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.dict.type.name'),
    },
  ];
}

export function useTypeColumns<T = DictApi.DictType>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridColumns {
  return [
    { field: 'code', title: $t('system.dict.type.code'), minWidth: 140 },
    { field: 'name', title: $t('system.dict.type.name'), minWidth: 120 },
    { field: 'remark', title: $t('system.dict.type.remark'), minWidth: 150 },
    {
      align: 'center',
      cellRender: {
        attrs: { nameField: 'name', nameTitle: $t('system.dict.type.title'), onClick: onActionClick },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.dict.type.operation'),
      width: 130,
    },
  ];
}

export function useTypeFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'code',
      label: $t('system.dict.type.code'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.dict.type.placeholder.code'),
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.dict.type.name'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.dict.type.placeholder.name'),
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.dict.type.remark'),
    },
  ];
}

// ==================== DictData ====================

export function useDataGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'label',
      label: $t('system.dict.data.label'),
    },
  ];
}

export function useDataColumns<T = DictApi.DictData>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridColumns {
  return [
    { field: 'label', title: $t('system.dict.data.label'), minWidth: 120 },
    { field: 'value', title: $t('system.dict.data.value'), minWidth: 100 },
    { field: 'sort', title: $t('system.dict.data.sort'), width: 80 },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.dict.data.status'),
      width: 100,
    },
    { field: 'remark', title: $t('system.dict.data.remark'), minWidth: 150 },
    {
      align: 'center',
      cellRender: {
        attrs: { nameField: 'label', nameTitle: $t('system.dict.data.title'), onClick: onActionClick },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.dict.data.operation'),
      width: 130,
    },
  ];
}

export function useDataFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'label',
      label: $t('system.dict.data.label'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.dict.data.placeholder.label'),
      },
    },
    {
      component: 'Input',
      fieldName: 'value',
      label: $t('system.dict.data.value'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.dict.data.placeholder.value'),
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'sort',
      label: $t('system.dict.data.sort'),
      defaultValue: 0,
      componentProps: {
        min: 0,
      },
    },
    {
      component: 'RadioGroup',
      fieldName: 'status',
      label: $t('system.dict.data.status'),
      defaultValue: 1,
      componentProps: {
        buttonStyle: 'solid',
        optionType: 'button',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 0 },
        ],
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.dict.data.remark'),
    },
  ];
}
```

**Step 2: Commit**

```bash
git add apps/web-antd/src/views/system/dict/schema.ts
git commit -m "feat: add dict schema config"
```

---

### Task 4: 创建 DictTypeModal 弹窗组件

**Files:**
- Create: `apps/web-antd/src/views/system/dict/components/DictTypeModal.vue`

**Step 1: 写组件**

```vue
<script lang="ts" setup>
import type { DictApi } from '#/api';

import { useVbenForm } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createDictType, updateDictType } from '#/api/system/dict';
import { $t } from '#/locales';

import { useTypeFormSchema } from '../schema';

interface Props {
  record?: DictApi.DictType | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  success: [];
}>();

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: useTypeFormSchema(),
  showDefaultActions: false,
});

async function onSubmit(values: Record<string, any>) {
  try {
    if (props.record?.id) {
      await updateDictType(props.record.id, values);
      message.success($t('ui.actionMessage.updateSuccess', [$t('system.dict.type.title')]));
    } else {
      await createDictType(values);
      message.success($t('ui.actionMessage.createSuccess', [$t('system.dict.type.title')]));
    }
    emit('success');
  } catch (error: any) {
    message.error(error.message || $t('common.error'));
  }
}

function setFormData() {
  if (props.record) {
    formApi.setValues({
      code: props.record.code,
      name: props.record.name,
      remark: props.record.remark,
    });
  } else {
    formApi.resetForm();
  }
}

defineExpose({ setFormData });
</script>

<template>
  <Form />
</template>
```

**Step 2: Commit**

```bash
git add apps/web-antd/src/views/system/dict/components/DictTypeModal.vue
git commit -m "feat: add DictTypeModal component"
```

---

### Task 5: 创建 DictDataModal 弹窗组件

**Files:**
- Create: `apps/web-antd/src/views/system/dict/components/DictDataModal.vue`

**Step 1: 写组件**

```vue
<script lang="ts" setup>
import type { DictApi } from '#/api';

import { useVbenForm } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createDictData, updateDictData } from '#/api/system/dict';
import { $t } from '#/locales';

import { useDataFormSchema } from '../schema';

interface Props {
  record?: DictApi.DictData | null;
  typeCode?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  success: [];
}>();

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: useDataFormSchema(),
  showDefaultActions: false,
});

async function onSubmit(values: Record<string, any>) {
  try {
    const data = { ...values, typeCode: props.typeCode };
    if (props.record?.id) {
      await updateDictData(props.record.id, data);
      message.success($t('ui.actionMessage.updateSuccess', [$t('system.dict.data.title')]));
    } else {
      await createDictData(data);
      message.success($t('ui.actionMessage.createSuccess', [$t('system.dict.data.title')]));
    }
    emit('success');
  } catch (error: any) {
    message.error(error.message || $t('common.error'));
  }
}

function setFormData() {
  if (props.record) {
    formApi.setValues({
      label: props.record.label,
      value: props.record.value,
      sort: props.record.sort,
      status: props.record.status,
      remark: props.record.remark,
    });
  } else {
    formApi.resetForm();
  }
}

defineExpose({ setFormData });
</script>

<template>
  <Form />
</template>
```

**Step 2: Commit**

```bash
git add apps/web-antd/src/views/system/dict/components/DictDataModal.vue
git commit -m "feat: add DictDataModal component"
```

---

### Task 6: 创建主页面 index.vue

**Files:**
- Create: `apps/web-antd/src/views/system/dict/index.vue`

**Step 1: 写主页面**

```vue
<script lang="ts" setup>
import type { OnActionClickParams, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DictApi } from '#/api';

import { computed, ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDictData, deleteDictDataBatch, deleteDictType, getDictDataList, getDictTypeList } from '#/api/system/dict';
import { $t } from '#/locales';

import DictDataModal from './components/DictDataModal.vue';
import DictTypeModal from './components/DictTypeModal.vue';
import { useDataColumns, useDataGridFormSchema, useTypeColumns, useTypeGridFormSchema } from './schema';

// ===== Type State =====
const selectedType = ref<DictApi.DictType | null>(null);

const [TypeModal, typeModalApi] = useVbenDrawer({
  connectedComponent: DictTypeModal,
  destroyOnClose: true,
});

const [TypeGrid, typeGridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useTypeGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useTypeColumns(onTypeActionClick),
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getDictTypeList({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<DictApi.DictType>,
});

function onTypeActionClick(e: OnActionClickParams<DictApi.DictType>) {
  switch (e.code) {
    case 'delete': {
      onDeleteType(e.row);
      break;
    }
    case 'edit': {
      onEditType(e.row);
      break;
    }
  }
}

function onEditType(row: DictApi.DictType) {
  typeModalApi.setData({ record: row }).open();
}

function onDeleteType(row: DictApi.DictType) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteDictType(row.id)
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        key: 'action_process_msg',
      });
      typeGridApi.query();
      // 如果删除的是当前选中的类型，清空右侧
      if (selectedType.value?.id === row.id) {
        selectedType.value = null;
        dataGridApi.query();
      }
    })
    .catch((error: any) => {
      hideLoading();
      message.error(error.message || $t('common.error'));
    });
}

function onCreateType() {
  typeModalApi.setData({ record: null }).open();
}

function onTypeSuccess() {
  typeGridApi.query();
  typeModalApi.close();
}

// ===== Data State =====
const currentTypeCode = computed(() => selectedType.value?.code);

const [DataModal, dataModalApi] = useVbenDrawer({
  connectedComponent: DictDataModal,
  destroyOnClose: true,
});

const [DataGrid, dataGridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useDataGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useDataColumns(onDataActionClick),
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          if (!currentTypeCode.value) {
            return { items: [], total: 0 };
          }
          return await getDictDataList({
            page: page.currentPage,
            pageSize: page.pageSize,
            typeCode: currentTypeCode.value,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<DictApi.DictData>,
});

function onDataActionClick(e: OnActionClickParams<DictApi.DictData>) {
  switch (e.code) {
    case 'delete': {
      onDeleteData(e.row);
      break;
    }
    case 'edit': {
      onEditData(e.row);
      break;
    }
  }
}

function onEditData(row: DictApi.DictData) {
  dataModalApi.setData({ record: row, typeCode: currentTypeCode.value }).open();
}

function onDeleteData(row: DictApi.DictData) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.label]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteDictData(row.id)
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.label]),
        key: 'action_process_msg',
      });
      dataGridApi.query();
    })
    .catch(() => {
      hideLoading();
    });
}

function onCreateData() {
  if (!currentTypeCode.value) {
    message.warning('请先选择一个字典类型');
    return;
  }
  dataModalApi.setData({ record: null, typeCode: currentTypeCode.value }).open();
}

function onDataSuccess() {
  dataGridApi.query();
  dataModalApi.close();
}

function onTypeRowClick({ row }: { row: DictApi.DictType }) {
  selectedType.value = row;
  dataGridApi.query();
}
</script>

<template>
  <Page auto-content-height :title="$t('system.dict.title')">
    <div class="flex h-full gap-4">
      <!-- Left: Type List -->
      <div class="w-1/3 flex flex-col">
        <TypeModal @success="onTypeSuccess" />
        <TypeGrid :table-title="$t('system.dict.type.title')">
          <template #toolbar-tools>
            <Button type="primary" @click="onCreateType">
              <Plus class="size-5" />
              {{ $t('ui.actionTitle.create', [$t('system.dict.type.title')]) }}
            </Button>
          </template>
          <template #default="{ row }">
            <div
              :class="['cursor-pointer px-2 py-1 rounded', selectedType?.id === row.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100']"
              @click="onTypeRowClick({ row })"
            >
              <!-- vxe-table 已经渲染了单元格内容，这里只是为了添加点击事件 -->
            </div>
          </template>
        </TypeGrid>
      </div>

      <!-- Right: Data List -->
      <div class="w-2/3 flex flex-col">
        <DataModal @success="onDataSuccess" />
        <DataGrid :table-title="selectedType ? `${selectedType.name} - ${$t('system.dict.data.title')}` : $t('system.dict.data.title')">
          <template #toolbar-tools>
            <Button type="primary" @click="onCreateData">
              <Plus class="size-5" />
              {{ $t('ui.actionTitle.create', [$t('system.dict.data.title')]) }}
            </Button>
          </template>
        </DataGrid>
      </div>
    </div>
  </Page>
</template>
```

> **注意**：上面 `vxe-table` 的点击事件如果不好直接绑定在行上，可以考虑用 `gridEvents.row-click` 配置，具体根据 vxe-table 版本调整。若 `TypeGrid` 组件不支持 slot 方式绑定行点击，改用 `vxe-table` 原生事件 `@cell-click` 或 `@row-click`。

**Step 2: Commit**

```bash
git add apps/web-antd/src/views/system/dict/index.vue
git commit -m "feat: add dict management main page"
```

---

### Task 7: 注册路由

**Files:**
- Modify: `apps/web-antd/src/router/routes/modules/system.ts`

**Step 1: 添加字典管理路由**

在 `system.ts` 的 `children` 数组末尾追加：

```typescript
{
  path: '/system/dict',
  name: 'SystemDict',
  meta: {
    icon: 'lucide:book-type',
    title: $t('system.dict.title'),
  },
  component: () => import('#/views/system/dict/index.vue'),
},
```

**Step 2: Commit**

```bash
git add apps/web-antd/src/router/routes/modules/system.ts
git commit -m "feat: add dict management route"
```

---

### Task 8: 运行验证

**Step 1: 启动开发服务器**

Run: `pnpm dev:antd`
Expected: 服务启动成功

**Step 2: 访问页面**

打开浏览器，登录后进入：
- `http://localhost:5173/system/dict`

验证项：
- [ ] 左侧显示字典类型列表（性别、用户状态、通知类型）
- [ ] 点击某个类型，右侧显示对应字典数据
- [ ] 左侧新增类型 → 弹窗填写 → 提交后列表刷新
- [ ] 左侧编辑类型 → 弹窗回填 → 提交后列表刷新
- [ ] 左侧删除类型 → 如果有数据提示禁止删除，无数据则删除成功
- [ ] 右侧新增数据 → 弹窗填写 → 提交后列表刷新
- [ ] 右侧编辑数据 → 弹窗回填 → 提交后列表刷新
- [ ] 右侧删除数据 → 删除成功列表刷新
- [ ] 菜单栏显示"字典管理"

**Step 3: 如果发现问题，回退修改**

根据错误信息修改对应文件，重新验证。

**Step 4: Commit 最终版本**

```bash
git add -A
git commit -m "feat: complete dict management page with mock api"
```

---

## 后续扩展（非本次实施）

1. **对接真实后端**：将 `apps/web-antd/src/api/system/dict.ts` 中的 mock 替换为真实 `requestClient` 调用
2. **批量删除字典数据**：右侧表格启用复选框，调用 `deleteDictDataBatch`
3. **字典缓存**：将常用字典数据存入 Pinia store，供表单下拉选择复用
4. **导入导出**：支持 Excel 导入导出字典数据

---

## 文件清单

| 文件 | 操作 |
|------|------|
| `apps/web-antd/src/locales/langs/zh-CN/system.json` | 追加 dict 翻译 |
| `apps/web-antd/src/api/system/dict.ts` | 新建（mock API） |
| `apps/web-antd/src/api/index.ts` | 追加导出 |
| `apps/web-antd/src/views/system/dict/schema.ts` | 新建 |
| `apps/web-antd/src/views/system/dict/components/DictTypeModal.vue` | 新建 |
| `apps/web-antd/src/views/system/dict/components/DictDataModal.vue` | 新建 |
| `apps/web-antd/src/views/system/dict/index.vue` | 新建 |
| `apps/web-antd/src/router/routes/modules/system.ts` | 追加路由 |
