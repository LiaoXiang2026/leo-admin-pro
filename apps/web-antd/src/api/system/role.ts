import type { CreateRoleDto, UpdateRoleDto } from '../generated/data-contracts';

import { generatedApi } from '../generated';

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

export async function getRoleList(params?: SystemRoleApi.RoleListParams) {
  const response = await generatedApi.roleControllerList({ query: params });
  return response.data as { items: SystemRoleApi.SystemRole[]; total: number };
}

export async function createRole(data: Partial<SystemRoleApi.SystemRole>) {
  const response = await generatedApi.roleControllerCreate(
    data as CreateRoleDto,
  );
  return response.data as SystemRoleApi.SystemRole;
}

export async function updateRole(
  id: number,
  data: Partial<SystemRoleApi.SystemRole>,
) {
  const response = await generatedApi.roleControllerUpdate(
    { id: String(id) },
    data as UpdateRoleDto,
  );
  return response.data as SystemRoleApi.SystemRole;
}

export async function deleteRole(id: number) {
  await generatedApi.roleControllerDelete({ id: String(id) });
  return true;
}
