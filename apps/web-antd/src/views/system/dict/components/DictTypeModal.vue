<script lang="ts" setup>
import type {
  CreateDictTypeDto,
  DictTypeEntity,
  UpdateDictTypeDto,
} from '#/api/generated/data-contracts';

import { useVbenForm } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { generatedApi } from '#/api/generated';
import { $t } from '#/locales';

import { useTypeFormSchema } from '../schema';

interface Props {
  record?: DictTypeEntity | null;
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
      const payload: UpdateDictTypeDto = {
        code: values.code,
        name: values.name,
        remark: values.remark,
      };
      await generatedApi.dictControllerUpdateType(
        { id: String(props.record.id) },
        payload,
      );
      message.success($t('ui.actionMessage.updateSuccess', [$t('system.dict.type.title')]));
    } else {
      const payload: CreateDictTypeDto = {
        code: values.code,
        name: values.name,
        remark: values.remark,
      };
      await generatedApi.dictControllerCreateType(payload);
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
