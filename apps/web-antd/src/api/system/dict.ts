import { generatedApi } from '../generated';

export namespace DictApi {
  export interface DictType {
    id: number;
    code: string;
    name: string;
    remark?: string;
    createdAt: string;
  }

  export interface DictData {
    id: number;
    typeCode: string;
    label: string;
    value: string;
    sort: number;
    status: number;
    remark?: string;
    createdAt: string;
  }

  export interface DictTypeListParams {
    page?: number;
    pageSize?: number;
    code?: string;
    name?: string;
  }

  export interface DictDataListParams {
    page?: number;
    pageSize?: number;
    typeCode: string;
    label?: string;
  }
}

// ---- type apis ----
export async function getDictTypeList(params?: DictApi.DictTypeListParams) {
  const response = await generatedApi.dictControllerListType(params || {});
  const result = (response.data as any)?.data ?? { items: [], total: 0 };
  return {
    items: result.items as DictApi.DictType[],
    total: result.total as number,
  };
}

export async function createDictType(data: Partial<DictApi.DictType>) {
  const response = await generatedApi.dictControllerCreateType({
    code: data.code || '',
    name: data.name || '',
    remark: data.remark,
  });
  return (response.data as any)?.data as DictApi.DictType;
}

export async function updateDictType(
  id: number,
  data: Partial<DictApi.DictType>,
) {
  const response = await generatedApi.dictControllerUpdateType(
    { id: String(id) },
    {
      code: data.code,
      name: data.name,
      remark: data.remark,
    },
  );
  return (response.data as any)?.data as DictApi.DictType;
}

export async function deleteDictType(id: number) {
  await generatedApi.dictControllerDeleteType({ id: String(id) });
  return true;
}

// ---- data apis ----
export async function getDictDataList(params: DictApi.DictDataListParams) {
  const response = await generatedApi.dictControllerListData({
    page: params.page,
    pageSize: params.pageSize,
    typeCode: params.typeCode,
    label: params.label,
  });
  const result = (response.data as any)?.data ?? { items: [], total: 0 };
  return {
    items: (result.items as any[]).map((item) => ({
      ...item,
      sort: item.sort ?? 0,
      status: item.status ?? 1,
    })) as DictApi.DictData[],
    total: result.total as number,
  };
}

export async function createDictData(data: Partial<DictApi.DictData>) {
  const response = await generatedApi.dictControllerCreateData({
    typeCode: data.typeCode || '',
    label: data.label || '',
    value: data.value || '',
    sort: data.sort ?? 0,
    status: data.status ?? 1,
    remark: data.remark,
  });
  return (response.data as any)?.data as DictApi.DictData;
}

export async function updateDictData(
  id: number,
  data: Partial<DictApi.DictData>,
) {
  const response = await generatedApi.dictControllerUpdateData(
    { id: String(id) },
    {
      label: data.label,
      value: data.value,
      sort: data.sort,
      status: data.status,
      remark: data.remark,
    },
  );
  return (response.data as any)?.data as DictApi.DictData;
}

export async function deleteDictData(id: number) {
  await generatedApi.dictControllerDeleteData({ id: String(id) });
  return true;
}

export async function deleteDictDataBatch(ids: number[]) {
  await generatedApi.dictControllerBatchDeleteData({ ids });
  return true;
}
