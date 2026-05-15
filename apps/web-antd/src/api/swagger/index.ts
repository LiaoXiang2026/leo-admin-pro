import { useAppConfig } from '@vben/hooks';
import { useAccessStore } from '@vben/stores';

import { Api } from './Api';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

export const swaggerApi = new Api({
  baseURL: apiURL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  securityWorker: async () => {
    const accessStore = useAccessStore();
    return accessStore.accessToken
      ? { headers: { Authorization: `Bearer ${accessStore.accessToken}` } }
      : {};
  },
});
