<script lang="ts" setup>
import type { DictDataEntity } from '#/api/swagger/Api';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { swaggerApi } from '#/api/swagger';
import { $t } from '#/locales';

import { useDataFormSchema } from '../schema';

const emits = defineEmits<{
  success: [];
}>();

const formData = ref<DictDataEntity>();
const typeCode = ref<string>();

const [Form, formApi] = useVbenForm({
  schema: useDataFormSchema(),
  showDefaultActions: false,
});

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    const payload = {
      label: values.label,
      value: values.value,
      sort: values.sort,
      status: values.status,
      remark: values.remark,
    };
    try {
      // eslint-disable-next-line unicorn/prefer-ternary
      if (formData.value?.id) {
        await swaggerApi.api.dictControllerUpdateData(
          { id: String(formData.value.id) },
          payload,
        );
      } else {
        await swaggerApi.api.dictControllerCreateData({
          typeCode: typeCode.value || '',
          ...payload,
        });
      }
      emits('success');
      drawerApi.close();
    } catch {
      drawerApi.unlock();
    }
  },

  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<{
        record?: DictDataEntity;
        typeCode?: string;
      }>();
      formApi.resetForm();
      formData.value = data?.record?.id ? data.record : undefined;
      typeCode.value = data?.typeCode;
      if (data?.record?.id) {
        await formApi.setValues({
          label: data.record.label,
          value: data.record.value,
          sort: data.record.sort,
          status: data.record.status,
          remark: data.record.remark,
        });
      }
    }
  },
});

const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? $t('common.edit', $t('system.dict.data.title'))
    : $t('common.create', $t('system.dict.data.title'));
});
</script>
<template>
  <Drawer :title="getDrawerTitle">
    <Form />
  </Drawer>
</template>
