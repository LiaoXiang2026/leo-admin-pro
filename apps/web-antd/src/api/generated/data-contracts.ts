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

export type AuthControllerGetCodesData = string[];

export type AuthControllerLoginData = any;

export type AuthControllerLogoutData = any;

export type AuthControllerRefreshData = any;

export type UserControllerGetUserInfoData = any;

export type MenuControllerGetAllMenusData = any;

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

export type DictControllerListTypeData = any;

export type DictControllerCreateTypeData = any;

export interface DictControllerUpdateTypeParams {
  id: string;
}

export type DictControllerUpdateTypeData = any;

export interface DictControllerDeleteTypeParams {
  id: string;
}

export type DictControllerDeleteTypeData = any;

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

export type DictControllerListDataData = any;

export type DictControllerCreateDataData = any;

export interface DictControllerUpdateDataParams {
  id: string;
}

export type DictControllerUpdateDataData = any;

export interface DictControllerDeleteDataParams {
  id: string;
}

export type DictControllerDeleteDataData = any;

export type DictControllerBatchDeleteDataData = any;
