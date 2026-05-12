<script lang="ts" setup>
import type { DictApi } from '#/api';

import { useVbenForm } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createDictType, updateDictType } from '#/api/system/dict';
import { $t } from '#/locales';

import { useTypeFormSchema } from '../schema';

interface Props {
  record?: DictApi.DictType | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  success: [];
}>();

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: useTypeFormSchema(),
  showDefaultActions: false,
});

async function onSubmit(values: Record<string, any>) {
  try {
    if (props.record?.id) {
      await updateDictType(props.record.id, values);
      message.success($t('ui.actionMessage.updateSuccess', [$t('system.dict.type.title')]));
    } else {
      await createDictType(values);
      message.success($t('ui.actionMessage.createSuccess', [$t('system.dict.type.title')]));
    }
    emit('success');
  } catch (error: any) {
    message.error(error.message || $t('common.error'));
  }
}

function setFormData() {
  if (props.record) {
    formApi.setValues({
      code: props.record.code,
      name: props.record.name,
      remark: props.record.remark,
    });
  } else {
    formApi.resetForm();
  }
}

defineExpose({ setFormData });
</script>

<template>
  <Form />
</template>
