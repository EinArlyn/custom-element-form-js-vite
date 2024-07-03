<template>
  <div id="form-viewer"></div>
  <a-float-button-group
    trigger="hover"
    type="primary"
    :style="{ right: '24px' }"
  >
    <template #icon>
      <SelectOutlined />
    </template>
    <a-float-button @click="uploadSchemaClick">
      <template #icon>
        <UploadOutlined />
      </template>
    </a-float-button>
  </a-float-button-group>
  <input
    type="file"
    @change="loadJSON"
    accept=".json"
    style="display: none"
    ref="fileInput"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
// @ts-ignore
import { Form } from '@einarlyn/bpmn-form-extended';
import { SelectOutlined, UploadOutlined } from '@ant-design/icons-vue';

const formRef = ref<Form | null>(null);
const fileInput = ref(null);

onMounted(() => {
  try {
    formRef.value = new Form({
      container: document.querySelector('#form-viewer'),
    });

    message.warning('Загрузите схему формы для просмотра!');
  } catch (error: any) {
    message.error((error as Error).message);
    console.error((error as Error).message, (error as Error).stack);
  }
});

const uploadSchemaClick = async () => {
  // @ts-ignore
  fileInput.value?.click();
};

// @ts-ignore
const loadJSON = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      // @ts-ignore
      const json = JSON.parse(e.target.result);
      await formRef.value?.importSchema(json);
      message.success('Схема успешно загружена!');
    } catch (error) {
      message.error((error as Error).message);
      console.error('Ошибка при чтении JSON файла:', error);
    }
  };

  reader.readAsText(file);
};
</script>

<style lang="css" scoped></style>
