<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  DictControllerListDataParams,
  DictControllerListTypeParams,
  DictDataEntity,
  DictTypeEntity,
} from '#/api/swagger/Api';

import { computed, ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { swaggerApi } from '#/api/swagger';
import { $t } from '#/locales';

import DictDataModal from './components/DictDataModal.vue';
import DictTypeModal from './components/DictTypeModal.vue';
import {
  useDataColumns,
  useDataGridFormSchema,
  useTypeColumns,
  useTypeGridFormSchema,
} from './schema';

// ===== Type State =====
const selectedType = ref<DictTypeEntity | null>(null);
const selectedTypeCode = computed(() => selectedType.value?.code);

const [TypeModal, typeModalApi] = useVbenDrawer({
  connectedComponent: DictTypeModal,
  destroyOnClose: true,
});

const [TypeGrid, typeGridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useTypeGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useTypeColumns(onTypeActionClick),
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await swaggerApi.api.dictControllerListType({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          } satisfies DictControllerListTypeParams);
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
  } as VxeTableGridOptions<DictTypeEntity>,
});

function onTypeActionClick(e: OnActionClickParams<DictTypeEntity>) {
  switch (e.code) {
    case 'delete': {
      onDeleteType(e.row);
      break;
    }
    case 'edit': {
      onEditType(e.row);
      break;
    }
  }
}

function onEditType(row: DictTypeEntity) {
  typeModalApi.setData({ record: row }).open();
}

function onDeleteType(row: DictTypeEntity) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  swaggerApi.api
    .dictControllerDeleteType({ id: String(row.id) })
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        key: 'action_process_msg',
      });
      typeGridApi.query();
      // 如果删除的是当前选中的类型，清空右侧
      if (selectedType.value?.id === row.id) {
        selectedType.value = null;
        dataGridApi.query();
      }
    })
    .catch((error: any) => {
      hideLoading();
      message.error(error.message || $t('common.error'));
    });
}

function onCreateType() {
  typeModalApi.setData({ record: null }).open();
}

function onTypeSuccess() {
  typeGridApi.query();
  typeModalApi.close();
}

// ===== Data State =====
const [DataModal, dataModalApi] = useVbenDrawer({
  connectedComponent: DictDataModal,
  destroyOnClose: true,
});

const [DataGrid, dataGridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useDataGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useDataColumns(onDataActionClick),
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          if (!selectedTypeCode.value) {
            return { items: [], total: 0 };
          }
          return await swaggerApi.api.dictControllerListData({
            page: page.currentPage,
            pageSize: page.pageSize,
            typeCode: selectedTypeCode.value,
            ...formValues,
          } satisfies DictControllerListDataParams);
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
  } as VxeTableGridOptions<DictDataEntity>,
});

function onDataActionClick(e: OnActionClickParams<DictDataEntity>) {
  switch (e.code) {
    case 'delete': {
      onDeleteData(e.row);
      break;
    }
    case 'edit': {
      onEditData(e.row);
      break;
    }
  }
}

function onEditData(row: DictDataEntity) {
  dataModalApi
    .setData({ record: row, typeCode: selectedTypeCode.value })
    .open();
}

function onDeleteData(row: DictDataEntity) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.label]),
    duration: 0,
    key: 'action_process_msg',
  });
  swaggerApi.api
    .dictControllerDeleteData({ id: String(row.id) })
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.label]),
        key: 'action_process_msg',
      });
      dataGridApi.query();
    })
    .catch(() => {
      hideLoading();
    });
}

function onCreateData() {
  if (!selectedTypeCode.value) {
    message.warning('请先选择一个字典类型');
    return;
  }
  dataModalApi
    .setData({ record: null, typeCode: selectedTypeCode.value })
    .open();
}

function onDataSuccess() {
  dataGridApi.query();
  dataModalApi.close();
}

function onTypeRowClick({ row }: { row: DictTypeEntity }) {
  selectedType.value = row;
  dataGridApi.query();
}
</script>

<template>
  <Page auto-content-height :title="$t('system.dict.title')">
    <div class="flex h-full gap-4">
      <!-- Left: Type List -->
      <div class="w-1/3 flex flex-col">
        <TypeModal @success="onTypeSuccess" />
        <TypeGrid
          :table-title="$t('system.dict.type.title')"
          @cell-click="onTypeRowClick"
        >
          <template #toolbar-tools>
            <Button type="primary" @click="onCreateType">
              <Plus class="size-5" />
              {{ $t('ui.actionTitle.create', [$t('system.dict.type.title')]) }}
            </Button>
          </template>
        </TypeGrid>
      </div>

      <!-- Right: Data List -->
      <div class="w-2/3 flex flex-col">
        <DataModal @success="onDataSuccess" />
        <DataGrid
          :table-title="
            selectedType
              ? `${selectedType.name} - ${$t('system.dict.data.title')}`
              : $t('system.dict.data.title')
          "
        >
          <template #toolbar-tools>
            <Button type="primary" @click="onCreateData">
              <Plus class="size-5" />
              {{ $t('ui.actionTitle.create', [$t('system.dict.data.title')]) }}
            </Button>
          </template>
        </DataGrid>
      </div>
    </div>
  </Page>
</template>
