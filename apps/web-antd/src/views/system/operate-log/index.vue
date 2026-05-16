<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { OperateLogEntity } from '#/api/swagger/Api';

import { ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { swaggerApi } from '#/api/swagger';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './schema';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await swaggerApi.api.operateLogControllerList({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<OperateLogEntity>,
});

const detailData = ref<OperateLogEntity>();

function onActionClick(e: OnActionClickParams<OperateLogEntity>) {
  switch (e.code) {
    case 'delete': {
      onDelete(e.row);
      break;
    }
    case 'detail': {
      onDetail(e.row);
      break;
    }
  }
}

function onDetail(row: OperateLogEntity) {
  detailData.value = row;
  formDrawerApi.setData(row).open();
}

function onDelete(row: OperateLogEntity) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [String(row.id)]),
    duration: 0,
    key: 'action_process_msg',
  });
  swaggerApi.api
    .operateLogControllerDelete({ id: String(row.id) })
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [String(row.id)]),
        key: 'action_process_msg',
      });
      onRefresh();
    })
    .catch(() => {
      hideLoading();
    });
}

function onRefresh() {
  gridApi.query();
}
</script>
<template>
  <Page auto-content-height>
    <FormDrawer :title="$t('system.operateLog.detail')">
      <div v-if="detailData" class="space-y-3">
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.id') }}:</span>
          <span>{{ detailData.id }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.operator') }}:</span>
          <span>{{ detailData.operator }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.module') }}:</span>
          <span>{{ detailData.module }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.action') }}:</span>
          <span>{{ detailData.action }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.description') }}:</span>
          <span>{{ detailData.description }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.method') }}:</span>
          <span>{{ detailData.method }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.url') }}:</span>
          <span>{{ detailData.url }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.ip') }}:</span>
          <span>{{ detailData.ip }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.duration') }}:</span>
          <span>{{ detailData.duration }}ms</span>
        </div>
        <div class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.operateTime') }}:</span>
          <span>{{ detailData.createdAt }}</span>
        </div>
        <div v-if="detailData.params" class="flex gap-2">
          <span class="text-foreground/60 min-w-20">{{ $t('system.operateLog.params') }}:</span>
          <pre
            class="m-0 max-h-60 overflow-auto rounded bg-gray-100 p-2 text-xs"
            >{{ detailData.params }}</pre>
        </div>
      </div>
    </FormDrawer>
    <Grid :table-title="$t('system.operateLog.list')" />
  </Page>
</template>
