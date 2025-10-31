<script setup>
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';

const props = defineProps({
    value: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
        // Formato esperado: [{ field: 'id', header: 'ID', sortable: true, style: 'width: 10%' }]
    },
    dataKey: {
        type: String,
        default: 'id'
    },
    title: {
        type: String,
        default: 'Gerenciar Registros'
    },
    enableCreate: {
        type: Boolean,
        default: true
    },
    enableEdit: {
        type: Boolean,
        default: true
    },
    enableDelete: {
        type: Boolean,
        default: true
    },
    enableExport: {
        type: Boolean,
        default: true
    },
    enableSelection: {
        type: Boolean,
        default: true
    },
    paginator: {
        type: Boolean,
        default: true
    },
    rows: {
        type: Number,
        default: 10
    },
    rowsPerPageOptions: {
        type: Array,
        default: () => [5, 10, 25]
    },
    // Novas props para controle individual de ações
    actions: {
        type: Object,
        default: () => ({
            edit: true,
            delete: true,
            custom: [] // Array de ações customizadas
        })
        // Formato custom: [{ icon: 'pi pi-eye', severity: 'info', tooltip: 'Visualizar', emit: 'view' }]
    }
});

const emit = defineEmits(['create', 'edit', 'delete', 'delete-selected']);

const toast = useToast();
const dt = ref();
const selectedItems = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

// Computed para verificar se deve mostrar a coluna de ações
const shouldShowActions = computed(() => {
    return props.actions.edit || props.actions.delete || (props.actions.custom && props.actions.custom.length > 0);
});

function exportCSV() {
    dt.value.exportCSV();
}

function handleCreate() {
    emit('create');
}

function handleEdit(item) {
    emit('edit', item);
}

function handleDelete(item) {
    emit('delete', item);
}

function handleDeleteSelected() {
    if (selectedItems.value && selectedItems.value.length > 0) {
        emit('delete-selected', selectedItems.value);
        selectedItems.value = null;
    }
}

function handleCustomAction(action, item) {
    emit(action.emit, item);
}

function getColumnBody(column) {
    return column.body || null;
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button v-if="enableCreate" label="Novo" icon="pi pi-plus" severity="primary" class="mr-2" @click="handleCreate" />
                </template>

                <template #end>
                    <Button v-if="enableExport" label="Exportar" icon="pi pi-upload" severity="warn" @click="exportCSV" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedItems"
                :value="value"
                :dataKey="dataKey"
                :paginator="paginator"
                :rows="rows"
                :filters="filters"
                class="p-datatable-striped"
                responsiveLayout="scroll"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="rowsPerPageOptions"
                :currentPageReportTemplate="`Mostrando {first} a {last} de {totalRecords} registros`"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">{{ title }}</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Pesquisar..." />
                        </IconField>
                    </div>
                </template>

                <Column v-if="enableSelection" style="width: 3rem" :exportable="false" />

                <Column v-for="column in columns" :key="column.field" :field="column.field" :header="column.header" :sortable="column.sortable !== false" :style="column.style">
                    <template v-if="column.body" #body="slotProps">
                        <component :is="column.body" :data="slotProps.data" />
                    </template>
                </Column>

                <Column v-if="shouldShowActions" :exportable="false" style="min-width: 12rem">
                    <template #header>
                        <div style="text-align: center; width: 100%">Ações</div>
                    </template>
                    <template #body="slotProps">
                        <div style="text-align: center">
                            <!-- Ações customizadas -->
                            <Button
                                v-for="(action, index) in actions.custom"
                                :key="`custom-${index}`"
                                :icon="action.icon"
                                outlined
                                rounded
                                :severity="action.severity || 'secondary'"
                                :v-tooltip="action.tooltip"
                                class="mr-2"
                                @click="handleCustomAction(action, slotProps.data)"
                            />

                            <!-- Ação de editar -->
                            <Button v-if="actions.edit" icon="pi pi-pencil" outlined rounded class="mr-2" @click="handleEdit(slotProps.data)" />

                            <!-- Ação de deletar -->
                            <Button v-if="actions.delete" icon="pi pi-trash" outlined rounded severity="danger" @click="handleDelete(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
