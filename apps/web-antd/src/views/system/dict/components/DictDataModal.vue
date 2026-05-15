<script lang="ts" setup>
import type {
  CreateDictDataDto,
  DictDataEntity,
  UpdateDictDataDto,
} from '#/api/generated/data-contracts';

import { useVbenForm } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { generatedApi } from '#/api/generated';
import { $t } from '#/locales';

import { useDataFormSchema } from '../schema';

interface Props {
  record?: DictDataEntity | null;
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
    if (props.record?.id) {
      const payload: UpdateDictDataDto = {
        label: values.label,
        value: values.value,
        sort: values.sort,
        status: values.status,
        remark: values.remark,
      };
      await generatedApi.dictControllerUpdateData(
        { id: String(props.record.id) },
        payload,
      );
      message.success($t('ui.actionMessage.updateSuccess', [$t('system.dict.data.title')]));
    } else {
      const payload: CreateDictDataDto = {
        typeCode: props.typeCode || '',
        label: values.label,
        value: values.value,
        sort: values.sort,
        status: values.status,
        remark: values.remark,
      };
      await generatedApi.dictControllerCreateData(payload);
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
