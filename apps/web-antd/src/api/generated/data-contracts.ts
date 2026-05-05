// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginDto {
  /**
   * 密码
   * @example "123456"
   */
  password: string;
  /**
   * 用户名
   * @example "admin"
   */
  username: string;
}

export interface CreateRoleDto {
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  description?: string;
  /** 权限ID数组 */
  permissionIds?: string[];
}

export interface UpdateRoleDto {
  /** 角色名称 */
  name?: string;
  /** 角色描述 */
  description?: string;
  /** 权限ID数组（全量替换） */
  permissionIds?: string[];
}

export type AppControllerGetHelloData = any;

export type AppControllerHealthData = any;

export type AuthControllerGetCodesData = any;

export type AuthControllerLoginData = any;

export type AuthControllerLogoutData = any;

export type AuthControllerRefreshData = any;

export type UserControllerGetUserInfoData = any;

export type MenuControllerGetAllMenusData = any;

export type RoleControllerListData = any;

export type RoleControllerCreateData = any;

export interface RoleControllerDetailParams {
  id: string;
}

export type RoleControllerDetailData = any;

export interface RoleControllerUpdateParams {
  id: string;
}

export type RoleControllerUpdateData = any;

export interface RoleControllerDeleteParams {
  id: string;
}

export type RoleControllerDeleteData = any;
