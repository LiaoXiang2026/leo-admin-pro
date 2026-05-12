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

import {
  AppControllerGetHelloData,
  AppControllerHealthData,
  AuthControllerGetCodesData,
  AuthControllerLoginData,
  AuthControllerLogoutData,
  AuthControllerRefreshData,
  BatchDeleteDictDataDto,
  CreateDictDataDto,
  CreateDictTypeDto,
  CreateRoleDto,
  DictControllerBatchDeleteDataData,
  DictControllerCreateDataData,
  DictControllerCreateTypeData,
  DictControllerDeleteDataData,
  DictControllerDeleteDataParams,
  DictControllerDeleteTypeData,
  DictControllerDeleteTypeParams,
  DictControllerListDataData,
  DictControllerListDataParams,
  DictControllerListTypeData,
  DictControllerListTypeParams,
  DictControllerUpdateDataData,
  DictControllerUpdateDataParams,
  DictControllerUpdateTypeData,
  DictControllerUpdateTypeParams,
  LoginDto,
  MenuControllerGetAllMenusData,
  RoleControllerCreateData,
  RoleControllerDeleteData,
  RoleControllerDeleteParams,
  RoleControllerDetailData,
  RoleControllerDetailParams,
  RoleControllerListData,
  RoleControllerListParams,
  RoleControllerUpdateData,
  RoleControllerUpdateParams,
  UpdateDictDataDto,
  UpdateDictTypeDto,
  UpdateRoleDto,
  UserControllerGetUserInfoData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @request GET:/api
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<AppControllerGetHelloData, any>({
      path: `/api`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags App
   * @name AppControllerHealth
   * @request GET:/api/health
   */
  appControllerHealth = (params: RequestParams = {}) =>
    this.request<AppControllerHealthData, any>({
      path: `/api/health`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 认证模块
   * @name AuthControllerGetCodes
   * @summary 获取用户权限码
   * @request GET:/api/auth/codes
   * @secure
   */
  authControllerGetCodes = (params: RequestParams = {}) =>
    this.request<AuthControllerGetCodesData, any>({
      path: `/api/auth/codes`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 认证模块
   * @name AuthControllerLogin
   * @summary 登录
   * @request POST:/api/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.request<AuthControllerLoginData, any>({
      path: `/api/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 认证模块
   * @name AuthControllerLogout
   * @summary 退出登录
   * @request POST:/api/auth/logout
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.request<AuthControllerLogoutData, any>({
      path: `/api/auth/logout`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags 认证模块
   * @name AuthControllerRefresh
   * @summary 刷新 AccessToken
   * @request POST:/api/auth/refresh
   */
  authControllerRefresh = (params: RequestParams = {}) =>
    this.request<AuthControllerRefreshData, any>({
      path: `/api/auth/refresh`,
      method: 'POST',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户模块
   * @name UserControllerGetUserInfo
   * @summary 获取当前用户信息
   * @request GET:/api/user/info
   * @secure
   */
  userControllerGetUserInfo = (params: RequestParams = {}) =>
    this.request<UserControllerGetUserInfoData, any>({
      path: `/api/user/info`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 菜单模块
   * @name MenuControllerGetAllMenus
   * @summary 获取用户所有菜单
   * @request GET:/api/menu/all
   * @secure
   */
  menuControllerGetAllMenus = (params: RequestParams = {}) =>
    this.request<MenuControllerGetAllMenusData, any>({
      path: `/api/menu/all`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 角色模块
   * @name RoleControllerList
   * @summary 获取角色列表
   * @request GET:/api/role
   * @secure
   */
  roleControllerList = (
    query: RoleControllerListParams,
    params: RequestParams = {},
  ) =>
    this.request<RoleControllerListData, any>({
      path: `/api/role`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 角色模块
   * @name RoleControllerCreate
   * @summary 创建角色
   * @request POST:/api/role
   * @secure
   */
  roleControllerCreate = (data: CreateRoleDto, params: RequestParams = {}) =>
    this.request<RoleControllerCreateData, any>({
      path: `/api/role`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 角色模块
   * @name RoleControllerDetail
   * @summary 获取角色详情
   * @request GET:/api/role/{id}
   * @secure
   */
  roleControllerDetail = (
    { id }: RoleControllerDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<RoleControllerDetailData, any>({
      path: `/api/role/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 角色模块
   * @name RoleControllerUpdate
   * @summary 更新角色
   * @request POST:/api/role/{id}
   * @secure
   */
  roleControllerUpdate = (
    { id }: RoleControllerUpdateParams,
    data: UpdateRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<RoleControllerUpdateData, any>({
      path: `/api/role/${id}`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 角色模块
   * @name RoleControllerDelete
   * @summary 删除角色
   * @request DELETE:/api/role/{id}
   * @secure
   */
  roleControllerDelete = (
    { id }: RoleControllerDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<RoleControllerDeleteData, any>({
      path: `/api/role/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerListType
   * @summary 分页查询字典类型
   * @request GET:/api/dict/type/list
   * @secure
   */
  dictControllerListType = (
    query: DictControllerListTypeParams,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerListTypeData, any>({
      path: `/api/dict/type/list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerCreateType
   * @summary 创建字典类型
   * @request POST:/api/dict/type
   * @secure
   */
  dictControllerCreateType = (
    data: CreateDictTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerCreateTypeData, any>({
      path: `/api/dict/type`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerUpdateType
   * @summary 更新字典类型
   * @request POST:/api/dict/type/{id}
   * @secure
   */
  dictControllerUpdateType = (
    { id }: DictControllerUpdateTypeParams,
    data: UpdateDictTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerUpdateTypeData, any>({
      path: `/api/dict/type/${id}`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerDeleteType
   * @summary 删除字典类型
   * @request POST:/api/dict/type/delete/{id}
   * @secure
   */
  dictControllerDeleteType = (
    { id }: DictControllerDeleteTypeParams,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerDeleteTypeData, any>({
      path: `/api/dict/type/delete/${id}`,
      method: 'POST',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerListData
   * @summary 分页查询字典数据
   * @request GET:/api/dict/data/list
   * @secure
   */
  dictControllerListData = (
    query: DictControllerListDataParams,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerListDataData, any>({
      path: `/api/dict/data/list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerCreateData
   * @summary 创建字典数据
   * @request POST:/api/dict/data
   * @secure
   */
  dictControllerCreateData = (
    data: CreateDictDataDto,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerCreateDataData, any>({
      path: `/api/dict/data`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerUpdateData
   * @summary 更新字典数据
   * @request POST:/api/dict/data/{id}
   * @secure
   */
  dictControllerUpdateData = (
    { id }: DictControllerUpdateDataParams,
    data: UpdateDictDataDto,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerUpdateDataData, any>({
      path: `/api/dict/data/${id}`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerDeleteData
   * @summary 删除单条字典数据
   * @request POST:/api/dict/data/delete/{id}
   * @secure
   */
  dictControllerDeleteData = (
    { id }: DictControllerDeleteDataParams,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerDeleteDataData, any>({
      path: `/api/dict/data/delete/${id}`,
      method: 'POST',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name DictControllerBatchDeleteData
   * @summary 批量删除字典数据
   * @request POST:/api/dict/data/batchDelete
   * @secure
   */
  dictControllerBatchDeleteData = (
    data: BatchDeleteDictDataDto,
    params: RequestParams = {},
  ) =>
    this.request<DictControllerBatchDeleteDataData, any>({
      path: `/api/dict/data/batchDelete`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
