<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { MenuProps } from 'ant-design-vue';
import { EditOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import FormEditor from './components/FormEditor.vue';
import FormViewer from './components/FormViewer.vue';

const current = ref<string[]>(['editor']);
const items = ref<MenuProps['items']>([
  {
    key: 'editor',
    icon: () => h(EditOutlined),
    label: 'Form Editor',
    title: 'Form Editor',
  },
  {
    key: 'view',
    icon: () => h(AppstoreOutlined),
    label: 'Form Viewer',
    title: 'Form Viewer',
  },
]);

const handleMenu = computed(() => {
  return current.value[0];
});
</script>

<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
  <FormEditor v-if="handleMenu === 'editor'" />
  <FormViewer v-else-if="handleMenu === 'view'" />
</template>

<style lang="css" scoped></style>
