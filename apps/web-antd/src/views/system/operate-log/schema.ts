import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridColumns } from '#/adapter/vxe-table';
import type { OperateLogEntity } from '#/api/swagger/Api';

import dayjs from 'dayjs';

import { $t } from '#/locales';

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'operator',
      label: $t('system.operateLog.operator'),
    },
    {
      component: 'Input',
      fieldName: 'module',
      label: $t('system.operateLog.module'),
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: 'CREATE', value: 'CREATE' },
          { label: 'UPDATE', value: 'UPDATE' },
          { label: 'DELETE', value: 'DELETE' },
        ],
        placeholder: $t('system.operateLog.action'),
      },
      fieldName: 'action',
      label: $t('system.operateLog.action'),
    },
  ];
}

export function useColumns<T = OperateLogEntity>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridColumns {
  return [
    {
      field: 'id',
      title: $t('system.operateLog.id'),
      width: 80,
    },
    {
      field: 'operator',
      minWidth: 100,
      title: $t('system.operateLog.operator'),
    },
    {
      field: 'module',
      minWidth: 100,
      title: $t('system.operateLog.module'),
    },
    {
      field: 'action',
      minWidth: 100,
      title: $t('system.operateLog.action'),
    },
    {
      field: 'description',
      minWidth: 150,
      title: $t('system.operateLog.description'),
    },
    {
      field: 'method',
      title: $t('system.operateLog.method'),
      width: 100,
    },
    {
      field: 'url',
      minWidth: 200,
      title: $t('system.operateLog.url'),
    },
    {
      cellRender: { name: 'CellDuration' },
      field: 'duration',
      title: $t('system.operateLog.duration'),
      width: 100,
    },
    {
      field: 'createdAt',
      title: $t('system.operateLog.operateTime'),
      width: 180,
      formatter: ({ cellValue }) => {
        return cellValue ? dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss') : '';
      },
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'module',
          nameTitle: $t('system.operateLog.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [{ code: 'detail', text: $t('common.detail') }, 'delete'],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.operateLog.operation'),
      width: 130,
    },
  ];
}
