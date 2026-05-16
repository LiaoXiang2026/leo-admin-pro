<script lang="ts" setup>
import type { DictTypeEntity } from '#/api/swagger/Api';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { swaggerApi } from '#/api/swagger';
import { $t } from '#/locales';

import { useTypeFormSchema } from '../schema';

const emits = defineEmits<{
  success: [];
}>();

const formData = ref<DictTypeEntity>();

const [Form, formApi] = useVbenForm({
  schema: useTypeFormSchema(),
  showDefaultActions: false,
});

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    try {
      // eslint-disable-next-line unicorn/prefer-ternary
      if (formData.value?.id) {
        await swaggerApi.api.dictControllerUpdateType(
          { id: String(formData.value.id) },
          { code: values.code, name: values.name, remark: values.remark },
        );
      } else {
        await swaggerApi.api.dictControllerCreateType({
          code: values.code,
          name: values.name,
          remark: values.remark,
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
      const data = drawerApi.getData<DictTypeEntity>();
      formApi.resetForm();
      formData.value = data?.id ? data : undefined;
      if (data?.id) {
        await formApi.setValues({
          code: data.code,
          name: data.name,
          remark: data.remark,
        });
      }
    }
  },
});

const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? $t('common.edit', $t('system.dict.type.title'))
    : $t('common.create', $t('system.dict.type.title'));
});
</script>
<template>
  <Drawer :title="getDrawerTitle">
    <Form />
  </Drawer>
</template>