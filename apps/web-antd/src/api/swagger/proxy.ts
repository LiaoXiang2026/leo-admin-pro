import type { AxiosResponse } from 'axios';

// Swagger 生成的方法本质上都是异步函数，这里先抽一个统一函数类型，
// 便于后续对整个 api 对象做映射处理。
type AsyncFn = (...args: any[]) => Promise<any>;

// 如果接口返回的是 AxiosResponse<T>，则提取出其中真正的业务数据 T；
// 否则保持原类型不变。
type UnwrapAxiosResponse<T> = T extends AxiosResponse<infer Data> ? Data : T;

// 将整组 Swagger 方法的返回值从 Promise<AxiosResponse<T>>
// 批量映射成 Promise<T>，这样页面层可以直接拿到 data。
type UnwrapSwaggerApi<T extends Record<string, AsyncFn>> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => Promise<infer Result>
    ? (...args: Args) => Promise<UnwrapAxiosResponse<Result>>
    : T[K];
};

// 为 Swagger 生成的 api 创建一层代理：
// - `swaggerApi.api.xxx()` 返回自动解包后的 data
// - `swaggerApi.raw.api.xxx()` 保留原始 AxiosResponse
// 这样页面默认走最常用的数据结构，特殊场景仍然可以拿到原始响应。
export function createSwaggerApiProxy<T extends Record<string, AsyncFn>>(
  api: T,
): UnwrapSwaggerApi<T> {
  return new Proxy(api, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value !== 'function') {
        return value;
      }

      return async (...args: Parameters<typeof value>) => {
        const response = await value(...args);
        // Swagger 生成客户端默认返回 AxiosResponse，这里统一下沉到入口层解包，
        // 避免每个页面都手写 `response.data`。
        return response?.data ?? response;
      };
    },
  }) as UnwrapSwaggerApi<T>;
}
