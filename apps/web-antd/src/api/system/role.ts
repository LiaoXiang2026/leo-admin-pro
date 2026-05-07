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
  const response = await generatedApi.roleControllerList({ query: params });
  const list = (response.data as any)?.data ?? [];
  return {
    items: list as SystemRoleApi.SystemRole[],
    total: list.length,
  };
}
