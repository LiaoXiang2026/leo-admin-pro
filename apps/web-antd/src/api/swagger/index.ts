import { useAppConfig } from '@vben/hooks';
import { useAccessStore } from '@vben/stores';

import { Api } from './Api';
import { createSwaggerApiProxy } from './proxy';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

const rawSwaggerApi = new Api({
  baseURL: apiURL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  responseType: 'json',
  securityWorker: async () => {
    const accessStore = useAccessStore();
    return accessStore.accessToken
      ? { headers: { Authorization: `Bearer ${accessStore.accessToken}` } }
      : {};
  },
});

export const swaggerApi = {
  ...rawSwaggerApi,
  api: createSwaggerApiProxy(rawSwaggerApi.api),
  raw: rawSwaggerApi,
};
