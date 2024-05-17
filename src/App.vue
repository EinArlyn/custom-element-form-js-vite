<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
//@ts-ignore
import { FormEditor, Form } from '@einarlyn/bpmn-form-extended';

export default defineComponent({
  name: 'App',
  setup() {
    const formRef = ref<Form | null>(null);
    const formEditorRef = ref<FormEditor | null>(null);
    const schema = ref({
      schemaVersion: 4,
      exporter: {
        name: 'form-js',
        version: '0.1.0',
      },
      type: 'default',
      components: [
        {
          key: 'creditor',
          label: 'Creditor',
          type: 'textfield',
          validate: {
            required: true,
          },
        },
      ],
    });
    const data = ref({
      creditor: 'John Doe Company',
    });

    onMounted(async () => {
      // setFormViewer();
      setFormEditor();
    });

    const setFormEditor = () => {
      formEditorRef.value = new FormEditor({
        container: document.querySelector('#form-editor'),
      });

      formEditorRef.value.on('change', (schema: any) => {
        console.log('schema', schema);
        schema.value = schema;
        formRef.value.importSchema(schema.value);
      });
      formEditorRef.value.importSchema(schema.value);
    };

    const setFormViewer = () => {
      formRef.value = new Form(
        {
          container: document.querySelector('#form-viewer'),
        },
        false
      );
      formRef.value.importSchema(schema.value, data.value);

      // @ts-ignore
      formRef.value.on('submit', (event) => {
        console.log('Form <submit>', event);
      });

      // @ts-ignore
      formRef.value.on('changed', 500, (event) => {
        console.log('Form <changed>', event);
      });
    };

    return {};
  },
});
</script>

<template>
  <div id="form-editor"></div>
  <div id="form-viewer" v-if="false"></div>
</template>

<style scoped></style>
