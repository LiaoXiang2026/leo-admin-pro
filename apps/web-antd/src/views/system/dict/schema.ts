import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridColumns } from '#/adapter/vxe-table';
import type { DictDataEntity, DictTypeEntity } from '#/api/swagger/Api';

import { $t } from '#/locales';

// ==================== DictType ====================

export function useTypeGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'code',
      label: $t('system.dict.type.code'),
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.dict.type.name'),
    },
  ];
}

export function useTypeColumns<T = DictTypeEntity>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridColumns {
  return [
    { type: 'radio', width: 50 },
    { field: 'code', title: $t('system.dict.type.code'), minWidth: 140 },
    { field: 'name', title: $t('system.dict.type.name'), minWidth: 120 },
    { field: 'remark', title: $t('system.dict.type.remark'), minWidth: 150 },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.dict.type.title'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.dict.type.operation'),
      width: 130,
    },
  ];
}

export function useTypeFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'code',
      label: $t('system.dict.type.code'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.dict.type.placeholder.code'),
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.dict.type.name'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.dict.type.placeholder.name'),
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.dict.type.remark'),
    },
  ];
}

// ==================== DictData ====================

export function useDataGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'label',
      label: $t('system.dict.data.label'),
    },
  ];
}

export function useDataColumns<T = DictDataEntity>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridColumns {
  return [
    { field: 'label', title: $t('system.dict.data.label'), minWidth: 120 },
    { field: 'value', title: $t('system.dict.data.value'), minWidth: 100 },
    { field: 'sort', title: $t('system.dict.data.sort'), width: 80 },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.dict.data.status'),
      width: 100,
    },
    { field: 'remark', title: $t('system.dict.data.remark'), minWidth: 150 },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'label',
          nameTitle: $t('system.dict.data.title'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.dict.data.operation'),
      width: 130,
    },
  ];
}

export function useDataFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'label',
      label: $t('system.dict.data.label'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.dict.data.placeholder.label'),
      },
    },
    {
      component: 'Input',
      fieldName: 'value',
      label: $t('system.dict.data.value'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.dict.data.placeholder.value'),
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'sort',
      label: $t('system.dict.data.sort'),
      defaultValue: 0,
      componentProps: {
        min: 0,
      },
    },
    {
      component: 'RadioGroup',
      fieldName: 'status',
      label: $t('system.dict.data.status'),
      defaultValue: 1,
      componentProps: {
        buttonStyle: 'solid',
        optionType: 'button',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 0 },
        ],
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.dict.data.remark'),
    },
  ];
}
