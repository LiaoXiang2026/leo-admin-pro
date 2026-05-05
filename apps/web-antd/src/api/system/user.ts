// NOTE: Backend does not yet expose user CRUD endpoints. These are in-memory mocks.
// When the backend adds /api/user endpoints, regenerate with `pnpm -F @vben/web-antd run generate:api`
// and replace the mock implementations below with real API calls (see system/role.ts for pattern).

export namespace SystemUserApi {
  export interface SystemUser {
    id: number;
    username: string;
    nickname: string;
    phone: string;
    email: string;
    roleId: number;
    roleName: string;
    status: number;
    remark: string;
    createTime: string;
  }

  export interface UserListParams {
    page?: number;
    pageSize?: number;
    username?: string;
    nickname?: string;
    status?: number;
  }
}

const mockUsers: SystemUserApi.SystemUser[] = [
  {
    id: 1,
    username: 'admin',
    nickname: '管理员',
    phone: '13800138000',
    email: 'admin@example.com',
    roleId: 1,
    roleName: '管理员',
    status: 1,
    remark: '系统管理员',
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: 2,
    username: 'user01',
    nickname: '张三',
    phone: '13800138001',
    email: 'zhangsan@example.com',
    roleId: 2,
    roleName: '普通用户',
    status: 1,
    remark: '普通用户',
    createTime: '2024-01-02 00:00:00',
  },
  {
    id: 3,
    username: 'user02',
    nickname: '李四',
    phone: '13800138002',
    email: 'lisi@example.com',
    roleId: 2,
    roleName: '普通用户',
    status: 0,
    remark: '已禁用',
    createTime: '2024-01-03 00:00:00',
  },
];

export async function getUserList(params?: SystemUserApi.UserListParams) {
  let items = [...mockUsers];
  if (params?.username) {
    items = items.filter((item) =>
      item.username.includes(params.username ?? ''),
    );
  }
  if (params?.nickname) {
    items = items.filter((item) =>
      item.nickname.includes(params.nickname ?? ''),
    );
  }
  if (params?.status !== undefined && params?.status !== null) {
    items = items.filter((item) => item.status === params.status);
  }
  const page = params?.page || 1;
  const pageSize = params?.pageSize || 10;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);
  return { items: paged, total: items.length };
}

export async function createUser(data: Partial<SystemUserApi.SystemUser>) {
  const newUser: SystemUserApi.SystemUser = {
    id: Date.now(),
    username: data.username || '',
    nickname: data.nickname || '',
    phone: data.phone || '',
    email: data.email || '',
    roleId: data.roleId || 0,
    roleName: data.roleName || '',
    status: data.status ?? 1,
    remark: data.remark || '',
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  mockUsers.push(newUser);
  return newUser;
}

export async function updateUser(
  id: number,
  data: Partial<SystemUserApi.SystemUser>,
) {
  const index = mockUsers.findIndex((item) => item.id === id);
  if (index !== -1) {
    const user = mockUsers[index];
    if (user) Object.assign(user, data);
    return user;
  }
  throw new Error('User not found');
}

export async function deleteUser(id: number) {
  const index = mockUsers.findIndex((item) => item.id === id);
  if (index !== -1) {
    mockUsers.splice(index, 1);
    return true;
  }
  throw new Error('User not found');
}
