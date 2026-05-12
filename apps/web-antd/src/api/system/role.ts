import { generatedApi } from '../generated';

export namespace SystemRoleApi {
  export interface SystemRole {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    permissions?: { id: string; code: string; name: string }[];
  }

  export interface RoleListParams {
    page?: number;
    pageSize?: number;
    name?: string;
  }
}

export async function getRoleList(params?: SystemRoleApi.RoleListParams) {
  const response = await generatedApi.roleControllerList(params || {});
  const result = (response.data as any)?.data ?? { items: [], total: 0 };
  return {
    items: result.items as SystemRoleApi.SystemRole[],
    total: result.total as number,
  };
}
