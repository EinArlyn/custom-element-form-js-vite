<template>
  <div id="form-editor"></div>
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
    <a-float-button @click="downloadSchemaClick">
      <template #icon>
        <DownloadOutlined />
      </template>
    </a-float-button>
    <a-float-button @click="refreshFormEditorClick">
      <template #icon>
        <SyncOutlined />
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

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import {
  SyncOutlined,
  SelectOutlined,
  DownloadOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
// @ts-ignore
import { FormEditor } from '@einarlyn/bpmn-form-extended';

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
const fileInput = ref(null);

onMounted(async () => {
  try {
    formEditorRef.value = new FormEditor({
      container: document.querySelector('#form-editor'),
    });
    await formEditorRef.value.importSchema(schema.value);
    message.success('Form Editor успешно загружен!');
  } catch (error: any) {
    message.error((error as Error).message);
    console.error((error as Error).message, (error as Error).stack);
  }
});

const refreshFormEditorClick = async () => {
  schema.value = {
    schemaVersion: 4,
    exporter: {
      name: 'form-js',
      version: '0.1.0',
    },
    type: 'default',
    components: [],
  };
  await formEditorRef.value?.importSchema(schema.value);
  message.success('Form Editor успешно обновлен!');
};

const downloadSchemaClick = async () => {
  try {
    const saveSchema = await formEditorRef.value?.saveSchema();

    if (saveSchema.components.length === 0) {
      message.warning('Схема пуста!');
      return;
    }

    // Преобразование объекта в строку JSON
    const jsonStr = JSON.stringify(saveSchema, null, 2);

    // Создание блоба
    const blob = new Blob([jsonStr], { type: 'application/json' });

    // Создание ссылки
    const url = URL.createObjectURL(blob);

    // Создание временного элемента <a>
    const link = document.createElement('a');
    link.href = url;
    link.download = `${saveSchema.id}.json`; // Имя файла

    // Автоматическое нажатие на ссылку
    link.click();

    // Освобождение памяти
    URL.revokeObjectURL(url);

    message.success('Схема успешно загружена!');
  } catch (error: any) {
    message.error((error as Error).message);
    console.error((error as Error).message, (error as Error).stack);
  }
};

const uploadSchemaClick = async () => {
  // @ts-ignore
  fileInput.value?.click();
};

// @ts-ignore
const loadJSON = (event) => {
  const saveSchema = formEditorRef.value?.saveSchema();
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      // @ts-ignore
      const json = JSON.parse(e.target.result);
      await formEditorRef.value?.importSchema(json);
      message.success('Схема успешно загружена!');
    } catch (error) {
      await formEditorRef.value?.importSchema(saveSchema);
      message.error((error as Error).message);
      console.error('Ошибка при чтении JSON файла:', error);
    }
  };

  reader.readAsText(file);
};
</script>

<style lang="css" scoped></style>
