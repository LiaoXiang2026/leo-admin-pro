// NOTE: Backend only exposes GET /api/menu/all. CRUD endpoints (create/update/delete) are not yet available.
// When the backend adds menu CRUD endpoints, regenerate with `pnpm -F @vben/web-antd run generate:api`
// and replace the mock implementations below with real API calls (see system/role.ts for pattern).

export namespace SystemMenuApi {
  export type BadgeVariants =
    | 'deemphasize'
    | 'default'
    | 'important'
    | 'informational';

  export interface SystemMenu {
    id: number;
    pid: number;
    name: string;
    type: 'button' | 'catalog' | 'embedded' | 'link' | 'menu';
    path?: string;
    component?: string;
    authCode?: string;
    linkSrc?: string;
    status: number;
    meta: {
      activeIcon?: string;
      affixTab?: boolean;
      badge?: string;
      badgeType?: 'dot' | 'normal';
      badgeVariants?: BadgeVariants;
      hideChildrenInMenu?: boolean;
      hideInBreadcrumb?: boolean;
      hideInMenu?: boolean;
      hideInTab?: boolean;
      icon?: string;
      iframeSrc?: string;
      keepAlive?: boolean;
      link?: string;
      title: string;
    };
    children?: SystemMenu[];
    createTime: string;
  }
}

const mockMenus: SystemMenuApi.SystemMenu[] = [
  {
    id: 1,
    pid: 0,
    name: 'Dashboard',
    type: 'catalog',
    path: '/dashboard',
    status: 1,
    meta: { title: 'page.dashboard.title', icon: 'lucide:layout-dashboard' },
    createTime: '2024-01-01 00:00:00',
    children: [
      {
        id: 11,
        pid: 1,
        name: 'Analytics',
        type: 'menu',
        path: '/analytics',
        component: '/views/dashboard/analytics/index.vue',
        status: 1,
        meta: {
          title: 'page.dashboard.analytics',
          icon: 'lucide:area-chart',
          affixTab: true,
        },
        createTime: '2024-01-01 00:00:00',
      },
      {
        id: 12,
        pid: 1,
        name: 'Workspace',
        type: 'menu',
        path: '/workspace',
        component: '/views/dashboard/workspace/index.vue',
        status: 1,
        meta: { title: 'page.dashboard.workspace', icon: 'carbon:workspace' },
        createTime: '2024-01-01 00:00:00',
      },
    ],
  },
  {
    id: 2,
    pid: 0,
    name: 'System',
    type: 'catalog',
    path: '/system',
    status: 1,
    meta: { title: 'system.title', icon: 'ion:settings-outline' },
    createTime: '2024-01-01 00:00:00',
    children: [
      {
        id: 21,
        pid: 2,
        name: 'SystemUser',
        type: 'menu',
        path: '/system/user',
        component: '/views/system/user/list.vue',
        status: 1,
        meta: { title: 'system.user.title', icon: 'mdi:account-outline' },
        createTime: '2024-01-01 00:00:00',
      },
      {
        id: 22,
        pid: 2,
        name: 'SystemRole',
        type: 'menu',
        path: '/system/role',
        component: '/views/system/role/list.vue',
        status: 1,
        meta: { title: 'system.role.title', icon: 'mdi:account-group' },
        createTime: '2024-01-01 00:00:00',
      },
      {
        id: 23,
        pid: 2,
        name: 'SystemMenu',
        type: 'menu',
        path: '/system/menu',
        component: '/views/system/menu/list.vue',
        status: 1,
        meta: { title: 'system.menu.title', icon: 'mdi:menu' },
        createTime: '2024-01-01 00:00:00',
      },
    ],
  },
];

export async function getMenuList() {
  return mockMenus;
}

export async function createMenu(
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'createTime' | 'id'>,
) {
  const newMenu: SystemMenuApi.SystemMenu = {
    ...data,
    id: Date.now(),
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  return newMenu;
}

export async function updateMenu(
  _id: number,
  data: Partial<Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>>,
) {
  return { id: _id, ...data };
}

export async function deleteMenu(_id: number) {
  return true;
}

export async function isMenuNameExists(
  _name: string,
  _excludeId?: number,
): Promise<boolean> {
  return false;
}

export async function isMenuPathExists(
  _path: string,
  _excludeId?: number,
): Promise<boolean> {
  return false;
}
