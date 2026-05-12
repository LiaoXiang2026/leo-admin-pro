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

export async function getDictTypeList(params?: DictApi.DictTypeListParams) {
  return await generatedApi.dictControllerListType(params || {});
}

export async function createDictType(data: Partial<DictApi.DictType>) {
  return await generatedApi.dictControllerCreateType({
    code: data.code || '',
    name: data.name || '',
    remark: data.remark,
  });
}

export async function updateDictType(
  id: number,
  data: Partial<DictApi.DictType>,
) {
  return await generatedApi.dictControllerUpdateType(
    { id: String(id) },
    {
      code: data.code,
      name: data.name,
      remark: data.remark,
    },
  );
}

export async function deleteDictType(id: number) {
  await generatedApi.dictControllerDeleteType({ id: String(id) });
  return true;
}

export async function getDictDataList(params: DictApi.DictDataListParams) {
  return await generatedApi.dictControllerListData({
    page: params.page,
    pageSize: params.pageSize,
    typeCode: params.typeCode,
    label: params.label,
  });
}

export async function createDictData(data: Partial<DictApi.DictData>) {
  return await generatedApi.dictControllerCreateData({
    typeCode: data.typeCode || '',
    label: data.label || '',
    value: data.value || '',
    sort: data.sort ?? 0,
    status: data.status ?? 1,
    remark: data.remark,
  });
}

export async function updateDictData(
  id: number,
  data: Partial<DictApi.DictData>,
) {
  return await generatedApi.dictControllerUpdateData(
    { id: String(id) },
    {
      label: data.label,
      value: data.value,
      sort: data.sort,
      status: data.status,
      remark: data.remark,
    },
  );
}

export async function deleteDictData(id: number) {
  await generatedApi.dictControllerDeleteData({ id: String(id) });
  return true;
}

export async function deleteDictDataBatch(ids: number[]) {
  await generatedApi.dictControllerBatchDeleteData({ ids });
  return true;
}
