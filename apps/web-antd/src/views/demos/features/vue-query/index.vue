<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';
</script>

<template>
  <Page title="Vue Query示例">
    <div class="grid grid-cols-1 gap-4">
      <Card title="TanStack Query">
        <p class="text-foreground/60">
          TanStack Query（原 Vue Query）需要在项目中安装
          <code>@tanstack/vue-query</code> 依赖后才能使用。
        </p>
      </Card>
    </div>
  </Page>
</template>
