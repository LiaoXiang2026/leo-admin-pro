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
  return await generatedApi.roleControllerList(params || {});
}
