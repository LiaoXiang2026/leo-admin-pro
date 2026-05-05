export namespace SystemRoleApi {
  export interface SystemRole {
    id: number;
    name: string;
    status: number;
    remark: string;
    permissions?: string[];
    createTime: string;
  }

  export interface RoleListParams {
    page?: number;
    pageSize?: number;
    name?: string;
    status?: number;
  }
}

const mockRoles: SystemRoleApi.SystemRole[] = [
  {
    id: 1,
    name: '管理员',
    status: 1,
    remark: '超级管理员，拥有全部权限',
    permissions: ['*'],
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: 2,
    name: '普通用户',
    status: 1,
    remark: '普通用户，拥有基础权限',
    permissions: ['dashboard'],
    createTime: '2024-01-02 00:00:00',
  },
  {
    id: 3,
    name: '访客',
    status: 0,
    remark: '访客账号，仅查看权限',
    createTime: '2024-01-03 00:00:00',
  },
];

export async function getRoleList(params?: SystemRoleApi.RoleListParams) {
  let items = [...mockRoles];
  if (params?.name) {
    items = items.filter((item) => item.name.includes(params.name ?? ''));
  }
  if (params?.status !== undefined && params?.status !== null) {
    items = items.filter((item) => item.status === params.status);
  }
  return Promise.resolve({ items, total: items.length });
}

export async function createRole(data: Partial<SystemRoleApi.SystemRole>) {
  const newRole: SystemRoleApi.SystemRole = {
    id: Date.now(),
    name: data.name || '',
    status: data.status ?? 1,
    remark: data.remark || '',
    permissions: data.permissions,
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  mockRoles.push(newRole);
  return Promise.resolve(newRole);
}

export async function updateRole(
  id: number,
  data: Partial<SystemRoleApi.SystemRole>,
) {
  const index = mockRoles.findIndex((item) => item.id === id);
  if (index !== -1) {
    const role = mockRoles[index];
    if (role) Object.assign(role, data);
    return Promise.resolve(role);
  }
  return Promise.reject(new Error('Role not found'));
}

export async function deleteRole(id: number) {
  const index = mockRoles.findIndex((item) => item.id === id);
  if (index !== -1) {
    mockRoles.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.reject(new Error('Role not found'));
}
