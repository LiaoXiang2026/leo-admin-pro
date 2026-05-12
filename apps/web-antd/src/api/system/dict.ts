export namespace DictApi {
  export interface DictType {
    id: number;
    code: string;
    name: string;
    remark?: string;
    createTime: string;
  }

  export interface DictData {
    id: number;
    typeCode: string;
    label: string;
    value: string;
    sort: number;
    status: number;
    remark?: string;
    createTime: string;
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

// ---- mock data ----
let mockTypes: DictApi.DictType[] = [
  { id: 1, code: 'sys_user_status', name: '用户状态', remark: '用户启用禁用状态', createTime: '2024-01-01 00:00:00' },
  { id: 2, code: 'sys_gender', name: '性别', remark: '性别字典', createTime: '2024-01-01 00:00:00' },
  { id: 3, code: 'sys_notice_type', name: '通知类型', remark: '系统通知类型', createTime: '2024-01-02 00:00:00' },
];

let mockData: DictApi.DictData[] = [
  { id: 1, typeCode: 'sys_user_status', label: '启用', value: '1', sort: 1, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
  { id: 2, typeCode: 'sys_user_status', label: '禁用', value: '0', sort: 2, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
  { id: 3, typeCode: 'sys_gender', label: '男', value: '1', sort: 1, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
  { id: 4, typeCode: 'sys_gender', label: '女', value: '2', sort: 2, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
  { id: 5, typeCode: 'sys_gender', label: '未知', value: '0', sort: 3, status: 1, remark: '', createTime: '2024-01-01 00:00:00' },
];

let nextTypeId = 100;
let nextDataId = 100;

function paginate<T>(items: T[], page?: number, pageSize?: number) {
  const p = page || 1;
  const ps = pageSize || 10;
  const start = (p - 1) * ps;
  return { items: items.slice(start, start + ps), total: items.length };
}

// ---- type apis ----
export async function getDictTypeList(params?: DictApi.DictTypeListParams) {
  let items = [...mockTypes];
  if (params?.code) items = items.filter(i => i.code.includes(params.code!));
  if (params?.name) items = items.filter(i => i.name.includes(params.name!));
  return paginate(items, params?.page, params?.pageSize);
}

export async function createDictType(data: Partial<DictApi.DictType>) {
  const item: DictApi.DictType = {
    id: nextTypeId++,
    code: data.code || '',
    name: data.name || '',
    remark: data.remark,
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  mockTypes.push(item);
  return item;
}

export async function updateDictType(id: number, data: Partial<DictApi.DictType>) {
  const idx = mockTypes.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Type not found');
  Object.assign(mockTypes[idx], data);
  return mockTypes[idx];
}

export async function deleteDictType(id: number) {
  const idx = mockTypes.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Type not found');
  // 检查是否有数据
  const hasData = mockData.some(d => d.typeCode === mockTypes[idx].code);
  if (hasData) throw new Error('该类型下存在字典数据，请先删除数据');
  mockTypes.splice(idx, 1);
  return true;
}

// ---- data apis ----
export async function getDictDataList(params: DictApi.DictDataListParams) {
  let items = mockData.filter(d => d.typeCode === params.typeCode);
  if (params?.label) items = items.filter(i => i.label.includes(params.label!));
  // 按 sort 排序
  items.sort((a, b) => a.sort - b.sort);
  return paginate(items, params?.page, params?.pageSize);
}

export async function createDictData(data: Partial<DictApi.DictData>) {
  const item: DictApi.DictData = {
    id: nextDataId++,
    typeCode: data.typeCode || '',
    label: data.label || '',
    value: data.value || '',
    sort: data.sort ?? 0,
    status: data.status ?? 1,
    remark: data.remark,
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  mockData.push(item);
  return item;
}

export async function updateDictData(id: number, data: Partial<DictApi.DictData>) {
  const idx = mockData.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Data not found');
  Object.assign(mockData[idx], data);
  return mockData[idx];
}

export async function deleteDictData(id: number) {
  const idx = mockData.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Data not found');
  mockData.splice(idx, 1);
  return true;
}

export async function deleteDictDataBatch(ids: number[]) {
  mockData = mockData.filter(d => !ids.includes(d.id));
  return true;
}
