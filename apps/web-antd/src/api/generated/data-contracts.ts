/* eslint-disable */
/* tslint:disable */
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

export interface PermissionEntity {
  /** 权限ID */
  id: string;
  /** 权限码 */
  code: string;
  /** 权限名称 */
  name: string;
  /** 创建时间 */
  createdAt: string;
}

export interface RoleEntity {
  /** 角色ID */
  id: string;
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  description?: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 权限列表 */
  permissions?: PermissionEntity[];
}

export interface LoginResponse {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** 用户ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 真实姓名 */
  realName: string;
  /** 头像 */
  avatar?: string;
  /** 描述 */
  desc?: string;
  /** 首页路径 */
  homePath: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 角色列表 */
  roles?: RoleEntity[];
}

export interface RefreshResponse {
  /** 新的访问令牌 */
  data: string;
  /** 状态码 */
  status: number;
}

export interface UserEntity {
  /** 用户ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 真实姓名 */
  realName: string;
  /** 头像 */
  avatar?: string;
  /** 描述 */
  desc?: string;
  /** 首页路径 */
  homePath: string;
  /** JWT Token */
  token: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 角色列表 */
  roles?: RoleEntity[];
}

export interface MenuMetaEntity {
  /** 标题 */
  title?: string;
  /** 图标 */
  icon?: string;
  /** 排序 */
  order?: number;
  /** 是否在菜单中隐藏 */
  hideInMenu?: boolean;
  /** 是否在标签页中隐藏 */
  hideInTab?: boolean;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 是否固定标签页 */
  affixTab?: boolean;
  /** 徽章 */
  badge?: string;
  /** 徽章类型 */
  badgeType?: string;
}

export interface MenuItemEntity {
  /** 菜单名称 */
  name: string;
  /** 菜单路径 */
  path: string;
  /** 组件路径 */
  component: string;
  /** 菜单元数据 */
  meta?: MenuMetaEntity;
  /** 子菜单 */
  children?: MenuItemEntity[];
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

export type AuthControllerGetCodesData = string[];

export type AuthControllerLoginData = LoginResponse;

export type AuthControllerLogoutData = any;

export type AuthControllerRefreshData = RefreshResponse;

export type UserControllerGetUserInfoData = UserEntity;

export type MenuControllerGetAllMenusData = MenuItemEntity[];

export type RoleControllerListData = RoleEntity[];

export type RoleControllerCreateData = RoleEntity;

export interface RoleControllerDetailParams {
  id: string;
}

export type RoleControllerDetailData = RoleEntity;

export interface RoleControllerUpdateParams {
  id: string;
}

export type RoleControllerUpdateData = RoleEntity;

export interface RoleControllerDeleteParams {
  id: string;
}

export type RoleControllerDeleteData = any;
