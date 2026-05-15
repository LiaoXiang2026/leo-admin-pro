/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CodesResponse {
  /** 权限码列表 */
  codes: string[];
}

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

export interface RolePageResultDto {
  /** 角色列表 */
  items: RoleEntity[];
  /** 总数 */
  total: number;
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

export interface DictTypeEntity {
  /** 字典类型ID */
  id: number;
  /** 类型编码 */
  code: string;
  /** 类型名称 */
  name: string;
  /** 备注 */
  remark?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createdAt: string;
}

export interface DictTypePageResultDto {
  /** 字典类型列表 */
  items: DictTypeEntity[];
  /** 总数 */
  total: number;
}

export interface CreateDictTypeDto {
  /** 类型编码 */
  code: string;
  /** 类型名称 */
  name: string;
  /** 备注 */
  remark?: string;
}

export interface UpdateDictTypeDto {
  /** 类型编码 */
  code?: string;
  /** 类型名称 */
  name?: string;
  /** 备注 */
  remark?: string;
}

export interface DictDataEntity {
  /** 字典数据ID */
  id: number;
  /** 所属类型编码 */
  typeCode: string;
  /** 标签名 */
  label: string;
  /** 字典值 */
  value: string;
  /** 排序 */
  sort?: number;
  /** 状态：1启用，0禁用 */
  status?: number;
  /** 备注 */
  remark?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createdAt: string;
}

export interface DictDataPageResultDto {
  /** 字典数据列表 */
  items: DictDataEntity[];
  /** 总数 */
  total: number;
}

export interface CreateDictDataDto {
  /** 所属类型编码 */
  typeCode: string;
  /** 标签名 */
  label: string;
  /** 字典值 */
  value: string;
  /**
   * 排序
   * @default 0
   */
  sort?: number;
  /**
   * 状态：1启用，0禁用
   * @default 1
   */
  status?: number;
  /** 备注 */
  remark?: string;
}

export interface UpdateDictDataDto {
  /** 标签名 */
  label?: string;
  /** 字典值 */
  value?: string;
  /** 排序 */
  sort?: number;
  /** 状态：1启用，0禁用 */
  status?: number;
  /** 备注 */
  remark?: string;
}

export interface BatchDeleteDictDataDto {
  /** 要删除的数据ID数组 */
  ids: number[];
}

export type AuthControllerGetCodesData = CodesResponse;

export type AuthControllerLoginData = LoginResponse;

export type AuthControllerLogoutData = object;

export type AuthControllerRefreshData = RefreshResponse;

export type UserControllerGetUserInfoData = UserEntity;

export interface RoleControllerListParams {
  /**
   * 页码
   * @min 1
   * @default 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 1
   * @max 100
   * @default 10
   */
  pageSize?: number;
}

export type RoleControllerListData = RolePageResultDto;

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

export type RoleControllerDeleteData = object;

export interface DictControllerListTypeParams {
  /**
   * 页码
   * @min 1
   * @default 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 1
   * @max 100
   * @default 10
   */
  pageSize?: number;
  /** 类型编码（模糊匹配） */
  code?: string;
  /** 类型名称（模糊匹配） */
  name?: string;
}

export type DictControllerListTypeData = DictTypePageResultDto;

export type DictControllerCreateTypeData = DictTypeEntity;

export interface DictControllerUpdateTypeParams {
  id: string;
}

export type DictControllerUpdateTypeData = DictTypeEntity;

export interface DictControllerDeleteTypeParams {
  id: string;
}

export type DictControllerDeleteTypeData = boolean;

export interface DictControllerListDataParams {
  /**
   * 页码
   * @min 1
   * @default 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 1
   * @max 100
   * @default 10
   */
  pageSize?: number;
  /** 所属字典类型编码 */
  typeCode: string;
  /** 标签名（模糊匹配） */
  label?: string;
}

export type DictControllerListDataData = DictDataPageResultDto;

export type DictControllerCreateDataData = DictDataEntity;

export interface DictControllerUpdateDataParams {
  id: string;
}

export type DictControllerUpdateDataData = DictDataEntity;

export interface DictControllerDeleteDataParams {
  id: string;
}

export type DictControllerDeleteDataData = boolean;

export type DictControllerBatchDeleteDataData = boolean;
