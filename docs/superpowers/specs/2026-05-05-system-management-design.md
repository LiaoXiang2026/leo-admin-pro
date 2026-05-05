# System Management Module Design

## Overview

Add a system management menu to `apps/web-antd` with three sub-pages: User Management, Role Management, and Menu Management. Reference the playground implementation, use inline mock data for now.

## Scope

- 3 CRUD pages: User, Role, Menu
- Complete table + form for each module
- Mock data (inline Promise.resolve)
- Chinese locale only (zh-CN)

## Architecture

### Files to Create

```
src/
├── router/routes/modules/system.ts
├── locales/langs/zh-CN/system.json
├── api/system/
│   ├── role.ts
│   ├── menu.ts
│   └── user.ts
├── views/system/
│   ├── role/
│   │   ├── list.vue
│   │   ├── data.ts
│   │   └── modules/form.vue
│   ├── menu/
│   │   ├── list.vue
│   │   ├── data.ts
│   │   └── modules/form.vue
│   └── user/
│       ├── list.vue
│       ├── data.ts
│       └── modules/form.vue
```

### Files to Modify

- `src/adapter/vxe-table.ts` — add CellTag, CellSwitch, CellOperation renderers
- `src/api/core/index.ts` — export system API modules
- `src/router/routes/index.ts` — export componentKeys for menu form

## Route Structure

```ts
{
  meta: { icon: 'ion:settings-outline', order: 9997, title: $t('system.title') },
  name: 'System',
  path: '/system',
  children: [
    { path: '/system/user', name: 'SystemUser', component: () => import('#/views/system/user/list.vue') },
    { path: '/system/role', name: 'SystemRole', component: () => import('#/views/system/role/list.vue') },
    { path: '/system/menu', name: 'SystemMenu', component: () => import('#/views/system/menu/list.vue') },
  ]
}
```

## Mock API Pattern

Each API file returns mock data via Promise.resolve, typed to match the expected interface. Example:

```ts
const mockRoles = [
  {
    id: 1,
    name: '管理员',
    status: 1,
    remark: '超级管理员',
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: 2,
    name: '普通用户',
    status: 1,
    remark: '普通用户',
    createTime: '2024-01-02 00:00:00',
  },
];

export async function getRoleList(params?: any) {
  return Promise.resolve({ items: mockRoles, total: mockRoles.length });
}
```

## Page Details

### Role Management

- Table: paginated list with columns (name, id, status switch, remark, createTime, operations)
- Form: drawer with fields (name, status radio, remark textarea, permissions tree)
- Operations: edit, delete, status toggle with confirmation

### Menu Management

- Table: tree structure with columns (title with icon, type tag, authCode, path, component, status, operations)
- Form: drawer with conditional fields based on menu type (catalog/menu/button/embedded/link)
- Operations: append child, edit, delete

### User Management

- Table: paginated list with columns (username, nickname, phone, status, createTime, operations)
- Form: drawer with fields (username, nickname, phone, role select, status, remark)
- Operations: edit, delete

## vxe-table Adapter Additions

Copy from playground: CellTag, CellSwitch, CellOperation renderers. These are needed for status tags, toggle switches, and action buttons in tables.

## Key Decisions

1. Mock data is inline in API files — replace with `requestClient.get()` when backend is ready
2. Menu form depends on `componentKeys` from router — must export from routes/index.ts
3. User management is new (not in playground) — follow Role pattern
4. Chinese locale only — no en-US for now
