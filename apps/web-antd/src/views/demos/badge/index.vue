<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';
import { useAccessStore } from '@vben/stores';

import { Badge as ABadge, Card } from 'ant-design-vue';

const route = useRoute();
const accessStore = useAccessStore();
const menu = accessStore.getMenuByPath(route.path);
const badgeProps = reactive({
  badge: menu?.badge as string,
  badgeType: menu?.badge ? 'normal' : (menu?.badgeType as 'dot' | 'normal'),
  badgeVariants: menu?.badgeVariants as string,
});
</script>

<template>
  <Page
    description="菜单项上可以显示徽标，这些徽标可以主动更新"
    title="菜单徽标"
  >
    <Card title="徽标更新">
      <p class="text-foreground/60">
        当前徽标类型：{{ badgeProps.badgeType }}，内容：{{ badgeProps.badge }}
      </p>
      <div class="mt-4 flex items-center gap-2">
        <ABadge v-if="badgeProps.badgeType === 'dot'" dot>
          <span class="h-8 w-16 rounded bg-muted" />
        </ABadge>
        <ABadge v-else :count="badgeProps.badge" :overflow-count="99">
          <span class="h-8 w-16 rounded bg-muted" />
        </ABadge>
      </div>
    </Card>
  </Page>
</template>
