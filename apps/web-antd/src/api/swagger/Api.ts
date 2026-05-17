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

export interface OperateLogEntity {
  /** 日志ID */
  id: number;
  /** 操作人 */
  operator: string;
  /** 操作模块 */
  module: string;
  /** 操作类型 */
  action: string;
  /** 操作描述 */
  description?: string;
  /** 请求方法 */
  method: string;
  /** 请求URL */
  url: string;
  /** 请求参数 */
  params?: string;
  /** 耗时(ms) */
  duration?: number;
  /** IP地址 */
  ip: string;
  /**
   * 创建时间
   * @format date-time
   */
  createdAt: string;
}

export interface OperateLogPageResultDto {
  /** 日志列表 */
  items: OperateLogEntity[];
  /** 总数 */
  total: number;
}

export interface BatchDeleteOperateLogDto {
  /** 要删除的日志ID数组 */
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

export interface OperateLogControllerListParams {
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
  /** 操作人（模糊匹配） */
  operator?: string;
  /** 操作模块（模糊匹配） */
  module?: string;
  /** 操作类型（精确匹配） */
  action?: string;
}

export type OperateLogControllerListData = OperateLogPageResultDto;

export interface OperateLogControllerDetailParams {
  id: string;
}

export type OperateLogControllerDetailData = OperateLogEntity;

export interface OperateLogControllerDeleteParams {
  id: string;
}

export type OperateLogControllerDeleteData = boolean;

export type OperateLogControllerBatchDeleteData = boolean;

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Vben Admin API
 * @version 1.0
 * @contact
 *
 * Vben Admin 后端 API 文档
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags 认证模块
     * @name AuthControllerGetCodes
     * @summary 获取用户权限码
     * @request GET:/api/auth/codes
     * @secure
     */
    authControllerGetCodes: (params: RequestParams = {}) =>
      this.request<AuthControllerGetCodesData, any>({
        path: `/api/auth/codes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 认证模块
     * @name AuthControllerLogin
     * @summary 登录
     * @request POST:/api/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<AuthControllerLoginData, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 认证模块
     * @name AuthControllerLogout
     * @summary 退出登录
     * @request POST:/api/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<AuthControllerLogoutData, any>({
        path: `/api/auth/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 认证模块
     * @name AuthControllerRefresh
     * @summary 刷新 AccessToken
     * @request POST:/api/auth/refresh
     */
    authControllerRefresh: (params: RequestParams = {}) =>
      this.request<AuthControllerRefreshData, any>({
        path: `/api/auth/refresh`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户模块
     * @name UserControllerGetUserInfo
     * @summary 获取当前用户信息
     * @request GET:/api/user/info
     * @secure
     */
    userControllerGetUserInfo: (params: RequestParams = {}) =>
      this.request<UserControllerGetUserInfoData, any>({
        path: `/api/user/info`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色模块
     * @name RoleControllerList
     * @summary 获取角色列表
     * @request GET:/api/role
     * @secure
     */
    roleControllerList: (
      query: RoleControllerListParams,
      params: RequestParams = {},
    ) =>
      this.request<RoleControllerListData, any>({
        path: `/api/role`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色模块
     * @name RoleControllerCreate
     * @summary 创建角色
     * @request POST:/api/role
     * @secure
     */
    roleControllerCreate: (data: CreateRoleDto, params: RequestParams = {}) =>
      this.request<RoleControllerCreateData, any>({
        path: `/api/role`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色模块
     * @name RoleControllerDetail
     * @summary 获取角色详情
     * @request GET:/api/role/{id}
     * @secure
     */
    roleControllerDetail: (
      { id }: RoleControllerDetailParams,
      params: RequestParams = {},
    ) =>
      this.request<RoleControllerDetailData, any>({
        path: `/api/role/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色模块
     * @name RoleControllerUpdate
     * @summary 更新角色
     * @request POST:/api/role/{id}
     * @secure
     */
    roleControllerUpdate: (
      { id }: RoleControllerUpdateParams,
      data: UpdateRoleDto,
      params: RequestParams = {},
    ) =>
      this.request<RoleControllerUpdateData, any>({
        path: `/api/role/${id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色模块
     * @name RoleControllerDelete
     * @summary 删除角色
     * @request DELETE:/api/role/{id}
     * @secure
     */
    roleControllerDelete: (
      { id }: RoleControllerDeleteParams,
      params: RequestParams = {},
    ) =>
      this.request<RoleControllerDeleteData, any>({
        path: `/api/role/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerListType
     * @summary 分页查询字典类型
     * @request GET:/api/dict/type/list
     * @secure
     */
    dictControllerListType: (
      query: DictControllerListTypeParams,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerListTypeData, any>({
        path: `/api/dict/type/list`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerCreateType
     * @summary 创建字典类型
     * @request POST:/api/dict/type
     * @secure
     */
    dictControllerCreateType: (
      data: CreateDictTypeDto,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerCreateTypeData, any>({
        path: `/api/dict/type`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerUpdateType
     * @summary 更新字典类型
     * @request POST:/api/dict/type/{id}
     * @secure
     */
    dictControllerUpdateType: (
      { id }: DictControllerUpdateTypeParams,
      data: UpdateDictTypeDto,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerUpdateTypeData, any>({
        path: `/api/dict/type/${id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerDeleteType
     * @summary 删除字典类型
     * @request POST:/api/dict/type/delete/{id}
     * @secure
     */
    dictControllerDeleteType: (
      { id }: DictControllerDeleteTypeParams,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerDeleteTypeData, any>({
        path: `/api/dict/type/delete/${id}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerListData
     * @summary 分页查询字典数据
     * @request GET:/api/dict/data/list
     * @secure
     */
    dictControllerListData: (
      query: DictControllerListDataParams,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerListDataData, any>({
        path: `/api/dict/data/list`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerCreateData
     * @summary 创建字典数据
     * @request POST:/api/dict/data
     * @secure
     */
    dictControllerCreateData: (
      data: CreateDictDataDto,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerCreateDataData, any>({
        path: `/api/dict/data`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerUpdateData
     * @summary 更新字典数据
     * @request POST:/api/dict/data/{id}
     * @secure
     */
    dictControllerUpdateData: (
      { id }: DictControllerUpdateDataParams,
      data: UpdateDictDataDto,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerUpdateDataData, any>({
        path: `/api/dict/data/${id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerDeleteData
     * @summary 删除单条字典数据
     * @request POST:/api/dict/data/delete/{id}
     * @secure
     */
    dictControllerDeleteData: (
      { id }: DictControllerDeleteDataParams,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerDeleteDataData, any>({
        path: `/api/dict/data/delete/${id}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 字典管理
     * @name DictControllerBatchDeleteData
     * @summary 批量删除字典数据
     * @request POST:/api/dict/data/batchDelete
     * @secure
     */
    dictControllerBatchDeleteData: (
      data: BatchDeleteDictDataDto,
      params: RequestParams = {},
    ) =>
      this.request<DictControllerBatchDeleteDataData, any>({
        path: `/api/dict/data/batchDelete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 操作日志
     * @name OperateLogControllerList
     * @summary 分页查询操作日志
     * @request GET:/api/operate-log
     * @secure
     */
    operateLogControllerList: (
      query: OperateLogControllerListParams,
      params: RequestParams = {},
    ) =>
      this.request<OperateLogControllerListData, any>({
        path: `/api/operate-log`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 操作日志
     * @name OperateLogControllerDetail
     * @summary 获取操作日志详情
     * @request GET:/api/operate-log/{id}
     * @secure
     */
    operateLogControllerDetail: (
      { id }: OperateLogControllerDetailParams,
      params: RequestParams = {},
    ) =>
      this.request<OperateLogControllerDetailData, any>({
        path: `/api/operate-log/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 操作日志
     * @name OperateLogControllerDelete
     * @summary 删除操作日志
     * @request DELETE:/api/operate-log/{id}
     * @secure
     */
    operateLogControllerDelete: (
      { id }: OperateLogControllerDeleteParams,
      params: RequestParams = {},
    ) =>
      this.request<OperateLogControllerDeleteData, any>({
        path: `/api/operate-log/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 操作日志
     * @name OperateLogControllerBatchDelete
     * @summary 批量删除操作日志
     * @request POST:/api/operate-log/batchDelete
     * @secure
     */
    operateLogControllerBatchDelete: (
      data: BatchDeleteOperateLogDto,
      params: RequestParams = {},
    ) =>
      this.request<OperateLogControllerBatchDeleteData, any>({
        path: `/api/operate-log/batchDelete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
