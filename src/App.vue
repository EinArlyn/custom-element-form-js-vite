<script setup lang="ts">
import { ref, onMounted } from 'vue';
//@ts-ignore
import { FormEditor, Form } from '@einarlyn/bpmn-form-extended';

const formEditorRef = ref<FormEditor | null>(null);
const schema = ref({
  schemaVersion: 4,
  exporter: {
    name: 'form-js',
    version: '0.1.0',
  },
  type: 'default',
  components: [],
});

onMounted(async () => {
  try {
    formEditorRef.value = new FormEditor({
      container: document.querySelector('#form-editor'),
    });
    await formEditorRef.value.importSchema(schema.value);
  } catch (error: any) {
    console.error((error as Error).message, (error as Error).stack);
  }
});
</script>

<template>
  <div id="form-editor"></div>
</template>

<style scoped></style>
