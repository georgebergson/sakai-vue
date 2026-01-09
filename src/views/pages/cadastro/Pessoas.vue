<template>
    <Tabs v-model:value="activeTab">
        <TabList v-show="false">
            <Tab value="0"></Tab>
            <Tab value="1"></Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">
                <div>
                    <GlobalDataTable
                        :value="tiposDeRecebimento"
                        :columns="columns"
                        title="Pessoas"
                        dataKey="id"
                        @create="handleCreate"
                        @edit="handleEdit"
                        @delete="handleDelete"
                        @delete-selected="handleDeleteSelected"
                        :actions="{ edit: true, delete: false, custom: [{ icon: 'pi pi-eye', severity: 'info', tooltip: 'Visualizar', emit: 'view' }] }"
                        @view="handleEdit"
                    />

                    <!-- Dialog para criar/editar -->
                    <Dialog v-model:visible="dialogVisible" :style="{ width: '450px' }" header="Tipo de Recebimento" :modal="true">
                        <div class="flex flex-col gap-6">
                            <div>
                                <label for="descricao" class="block font-bold mb-3">Descrição</label>
                                <InputText id="descricao" v-model="currentItem.descricao" fluid />
                            </div>
                            <div>
                                <label for="status" class="block font-bold mb-3">Status</label>
                                <Select id="status" v-model="currentItem.status" :options="statusOptions" placeholder="Selecione um Status" fluid />
                            </div>
                        </div>

                        <template #footer>
                            <Button label="Cancelar" icon="pi pi-times" text @click="dialogVisible = false" />
                            <Button label="Salvar" icon="pi pi-check" @click="saveItem" />
                        </template>
                    </Dialog>

                    <!-- Dialog de confirmação de exclusão -->
                    <Dialog v-model:visible="deleteDialogVisible" :style="{ width: '450px' }" header="Confirmar" :modal="true">
                        <div class="flex items-center gap-4">
                            <i class="pi pi-exclamation-triangle !text-3xl" />
                            <span v-if="currentItem">
                                Tem certeza que deseja deletar <b>{{ currentItem.descricao }}</b
                                >?
                            </span>
                        </div>
                        <template #footer>
                            <Button label="Não" icon="pi pi-times" text @click="deleteDialogVisible = false" />
                            <Button label="Sim" icon="pi pi-check" @click="confirmDelete" />
                        </template>
                    </Dialog>

                    <!-- Dialog de confirmação de exclusão múltipla -->
                    <Dialog v-model:visible="deleteMultipleDialogVisible" :style="{ width: '450px' }" header="Confirmar" :modal="true">
                        <div class="flex items-center gap-4">
                            <i class="pi pi-exclamation-triangle !text-3xl" />
                            <span>Tem certeza que deseja deletar os registros selecionados?</span>
                        </div>
                        <template #footer>
                            <Button label="Não" icon="pi pi-times" text @click="deleteMultipleDialogVisible = false" />
                            <Button label="Sim" icon="pi pi-check" @click="confirmDeleteMultiple" />
                        </template>
                    </Dialog>
                </div>
            </TabPanel>
            <TabPanel value="1">
                <Button icon="pi pi-arrow-left" class="mr-2 mb-2" @click="activeTab = '0'"></Button>

                <div class="flex flex-col mt-8">
                    <div class="flex space-x-5">
                        <Tabs value="0">
                            <TabList>
                                <Tab value="0">Header I</Tab>
                                <Tab value="1">Header II</Tab>
                                <Tab value="2">Header III</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="0">
                                    <p class="m-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                        mollit anim id est laborum.
                                    </p>
                                </TabPanel>
                                <TabPanel value="1">
                                    <p class="m-0">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non
                                        numquam eius modi.
                                    </p>
                                </TabPanel>
                                <TabPanel value="2">
                                    <p class="m-0">
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                                        similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                                        cumque nihil impedit quo minus.
                                    </p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
                <div class="flex justify-end mt-5">
                    <Button label="SALVAR" @click="saveItem" />
                </div>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { h, ref } from 'vue';
const toast = useToast();

const activeTab = ref('0');

const statusServiceItem = ref({ name: 'Ativo', code: '0' });

const tiposDeRecebimento = ref([
    { id: 1, descricao: 'Dinheiro', status: 'Ativo' },
    { id: 2, descricao: 'Cartão de Crédito', status: 'Ativo' },
    { id: 3, descricao: 'Cartão de Débito', status: 'Inativo' },
    { id: 4, descricao: 'Cheque', status: 'Ativo' },
    { id: 5, descricao: 'Transferência Bancária', status: 'Ativo' }
]);

const statusOptions = ref(['Ativo', 'Inativo']);
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const deleteMultipleDialogVisible = ref(false);
const currentItem = ref({});
const itemsToDelete = ref([]);

// Definição das colunas
const columns = ref([
    {
        field: 'id',
        header: 'ID',
        sortable: true,
        style: 'width: 15%'
    },
    {
        field: 'descricao',
        header: 'Descrição',
        sortable: true,
        style: 'width: 100%'
    },
    {
        field: 'status',
        header: 'Status',
        sortable: true,
        style: 'width: 15%; text-align: center',
        body: (props) =>
            h(
                'span',
                {
                    class: props.data.status === 'Ativo' ? 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium' : 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium'
                },
                props.data.status
            )
    }
]);

function handleCreate() {
    currentItem.value = { descricao: '', status: 'Ativo' };
    dialogVisible.value = true;
    activeTab.value = '1'; // Ativa a aba de cadastro
}

function handleEdit(item) {
    currentItem.value = { ...item };
    dialogVisible.value = true;
}

function handleDelete(item) {
    currentItem.value = item;
    deleteDialogVisible.value = true;
}

function handleDeleteSelected(items) {
    itemsToDelete.value = items;
    deleteMultipleDialogVisible.value = true;
}

function saveItem() {
    if (!currentItem.value.descricao) {
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Descrição é obrigatória',
            life: 3000
        });
        return;
    }

    if (currentItem.value.id) {
        // Editar
        const index = tiposDeRecebimento.value.findIndex((item) => item.id === currentItem.value.id);
        if (index !== -1) {
            tiposDeRecebimento.value[index] = { ...currentItem.value };
            toast.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Registro atualizado',
                life: 3000
            });
        }
    } else {
        // Criar
        const newId = Math.max(...tiposDeRecebimento.value.map((item) => item.id)) + 1;
        tiposDeRecebimento.value.push({
            ...currentItem.value,
            id: newId
        });
        toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Registro criado',
            life: 3000
        });
    }

    dialogVisible.value = false;
    currentItem.value = {};
}

function confirmDelete() {
    tiposDeRecebimento.value = tiposDeRecebimento.value.filter((item) => item.id !== currentItem.value.id);
    deleteDialogVisible.value = false;
    currentItem.value = {};
    toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Registro deletado',
        life: 3000
    });
}

function confirmDeleteMultiple() {
    const idsToDelete = itemsToDelete.value.map((item) => item.id);
    tiposDeRecebimento.value = tiposDeRecebimento.value.filter((item) => !idsToDelete.includes(item.id));
    deleteMultipleDialogVisible.value = false;
    itemsToDelete.value = [];
    toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Registros deletados',
        life: 3000
    });
}
</script>

<style scoped>
.p-tab p-tab-active {
    padding: 0 !important;
}
</style>
