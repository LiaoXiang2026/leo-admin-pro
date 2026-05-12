<script lang="ts" setup>
import type { DictApi } from '#/api';

import { useVbenForm } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createDictData, updateDictData } from '#/api/system/dict';
import { $t } from '#/locales';

import { useDataFormSchema } from '../schema';

interface Props {
  record?: DictApi.DictData | null;
  typeCode?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  success: [];
}>();

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: useDataFormSchema(),
  showDefaultActions: false,
});

async function onSubmit(values: Record<string, any>) {
  try {
    const data = { ...values, typeCode: props.typeCode };
    if (props.record?.id) {
      await updateDictData(props.record.id, data);
      message.success($t('ui.actionMessage.updateSuccess', [$t('system.dict.data.title')]));
    } else {
      await createDictData(data);
      message.success($t('ui.actionMessage.createSuccess', [$t('system.dict.data.title')]));
    }
    emit('success');
  } catch (error: any) {
    message.error(error.message || $t('common.error'));
  }
}

function setFormData() {
  if (props.record) {
    formApi.setValues({
      label: props.record.label,
      value: props.record.value,
      sort: props.record.sort,
      status: props.record.status,
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
