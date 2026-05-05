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
      title: string;
      icon?: string;
      activeIcon?: string;
      badgeType?: 'dot' | 'normal';
      badge?: string;
      badgeVariants?: BadgeVariants;
      keepAlive?: boolean;
      affixTab?: boolean;
      hideInMenu?: boolean;
      hideChildrenInMenu?: boolean;
      hideInBreadcrumb?: boolean;
      hideInTab?: boolean;
      link?: string;
      iframeSrc?: string;
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
  return Promise.resolve(mockMenus);
}

export async function createMenu(
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'createTime' | 'id'>,
) {
  const newMenu: SystemMenuApi.SystemMenu = {
    ...data,
    id: Date.now(),
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  return Promise.resolve(newMenu);
}

export async function updateMenu(
  _id: number,
  data: Partial<Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>>,
) {
  return Promise.resolve({ id: _id, ...data });
}

export async function deleteMenu(_id: number) {
  return Promise.resolve(true);
}

export async function isMenuNameExists(
  _name: string,
  _excludeId?: number,
): Promise<boolean> {
  return Promise.resolve(false);
}

export async function isMenuPathExists(
  _path: string,
  _excludeId?: number,
): Promise<boolean> {
  return Promise.resolve(false);
}
