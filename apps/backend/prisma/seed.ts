import process from 'process';

import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

import 'dotenv/config';

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 创建权限
  const permissions = await Promise.all([
    prisma.permission.create({
      data: { code: 'AC_100100', name: '查看仪表盘' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100110', name: '查看分析页' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100120', name: '查看工作台' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100010', name: '用户管理-查看' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100020', name: '用户管理-新增' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100030', name: '用户管理-编辑' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100040', name: '用户管理-删除' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100050', name: '角色管理-查看' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100060', name: '角色管理-新增' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100070', name: '角色管理-编辑' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100080', name: '角色管理-删除' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100090', name: '菜单管理-查看' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100130', name: '菜单管理-新增' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100140', name: '菜单管理-编辑' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100150', name: '菜单管理-删除' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100160', name: '示例-表单' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100170', name: '示例-表格' },
    }),
    prisma.permission.create({
      data: { code: 'AC_100180', name: '示例-搜索表格' },
    }),
  ]);

  // 创建角色
  const adminRole = await prisma.role.create({
    data: {
      name: 'superadmin',
      description: '超级管理员',
      permissions: {
        connect: permissions.map((p) => ({ id: p.id })),
      },
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'user',
      description: '普通用户',
      permissions: {
        connect: [
          { id: permissions[0].id },
          { id: permissions[1].id },
          { id: permissions[2].id },
        ],
      },
    },
  });

  // 创建用户
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password: '123456',
      realName: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      desc: 'manager',
      homePath: '/dashboard',
      roles: {
        connect: [{ id: adminRole.id }],
      },
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      username: 'user',
      password: '123456',
      realName: 'User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      desc: 'staff',
      homePath: '/dashboard',
      roles: {
        connect: [{ id: userRole.id }],
      },
    },
  });

  // 创建菜单
  const dashboardMenu = await prisma.menu.create({
    data: {
      name: 'Dashboard',
      path: '/dashboard',
      component: 'BasicLayout',
      title: '首页',
      icon: 'lucide:layout-dashboard',
      order: 0,
      users: {
        connect: [{ id: adminUser.id }, { id: normalUser.id }],
      },
    },
  });

  await prisma.menu.createMany({
    data: [
      {
        name: 'Analytics',
        path: '/dashboard/analytics',
        component: '/dashboard/analytics/index.vue',
        parentId: dashboardMenu.id,
        title: '分析页',
        icon: 'lucide:bar-chart-3',
        order: 0,
        affixTab: true,
      },
      {
        name: 'Workspace',
        path: '/dashboard/workspace',
        component: '/dashboard/workspace/index.vue',
        parentId: dashboardMenu.id,
        title: '工作台',
        icon: 'lucide:briefcase',
        order: 1,
      },
    ],
  });

  const systemMenu = await prisma.menu.create({
    data: {
      name: 'System',
      path: '/system',
      component: 'BasicLayout',
      title: '系统管理',
      icon: 'lucide:settings',
      order: 1,
      users: {
        connect: [{ id: adminUser.id }],
      },
    },
  });

  await prisma.menu.createMany({
    data: [
      {
        name: 'UserManagement',
        path: '/system/user',
        component: '/system/user/index.vue',
        parentId: systemMenu.id,
        title: '用户管理',
        icon: 'lucide:users',
        order: 0,
      },
      {
        name: 'RoleManagement',
        path: '/system/role',
        component: '/system/role/index.vue',
        parentId: systemMenu.id,
        title: '角色管理',
        icon: 'lucide:user-cog',
        order: 1,
      },
      {
        name: 'MenuManagement',
        path: '/system/menu',
        component: '/system/menu/index.vue',
        parentId: systemMenu.id,
        title: '菜单管理',
        icon: 'lucide:menu',
        order: 2,
      },
    ],
  });

  const demosMenu = await prisma.menu.create({
    data: {
      name: 'Demos',
      path: '/demos',
      component: 'BasicLayout',
      title: '示例',
      icon: 'lucide:flask-conical',
      order: 2,
      users: {
        connect: [{ id: adminUser.id }, { id: normalUser.id }],
      },
    },
  });

  await prisma.menu.createMany({
    data: [
      {
        name: 'FormBasic',
        path: '/demos/form/basic',
        component: '/demos/form/basic/index.vue',
        parentId: demosMenu.id,
        title: '基础表单',
        icon: 'lucide:file-text',
        order: 0,
      },
      {
        name: 'TableBasic',
        path: '/demos/table/basic',
        component: '/demos/table/basic/index.vue',
        parentId: demosMenu.id,
        title: '基础表格',
        icon: 'lucide:table',
        order: 1,
      },
      {
        name: 'TableSearch',
        path: '/demos/table/search',
        component: '/demos/table/search/index.vue',
        parentId: demosMenu.id,
        title: '搜索表格',
        icon: 'lucide:search',
        order: 2,
      },
    ],
  });

  const profileMenu = await prisma.menu.create({
    data: {
      name: 'Profile',
      path: '/profile',
      component: 'BasicLayout',
      title: '个人中心',
      icon: 'lucide:user',
      order: 3,
      hideInMenu: true,
      users: {
        connect: [{ id: adminUser.id }, { id: normalUser.id }],
      },
    },
  });

  await prisma.menu.create({
    data: {
      name: 'ProfileBase',
      path: '/profile/base',
      component: '/profile/base/index.vue',
      parentId: profileMenu.id,
      title: '基础设置',
      order: 0,
    },
  });
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
