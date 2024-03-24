<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    //@ts-ignore
    import { FormEditor } from '@bpmn-io/form-js';
    import './custom-component-form-js/render.js';
    import './custom-component-form-js/panel-properties.js';

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
                const { renderExtensions, propertiesPanelExtensions } = (window as any);

                formEditorRef.value = new FormEditor({
                container: document.querySelector('#form-editor'),
                additionalModules: [
                    renderExtensions,
                    propertiesPanelExtensions,
                ],
                });

                await formEditorRef.value.importSchema(schema.value);
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
