<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    //@ts-ignore
    import FormEditor from '@einarlyn/custom-form-editor'

    export default defineComponent({
        name: 'App',
        setup() {
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
                formEditorRef.value = new FormEditor({
                    container: document.querySelector('#form-editor'),
                });
                formEditorRef.value.importSchema(schema.value);
            });

            return {};
        },
    });
</script>

<template>
    <div id="form-editor"></div>
</template>

<style scoped>

</style>
