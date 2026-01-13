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
                <div class="flex justify-between">
                    <Button icon="pi pi-arrow-left" class="mr-2 mb-2" @click="activeTab = '0'"></Button>

                    <div>
                        <div class="flex flex-col md:flex-row gap-4">
                            <div class="flex items-center">
                                <Checkbox id="cliente" name="option" value="1" v-model="checkboxValue" disabled />
                                <label for="cliente" class="ml-2">Cliente</label>
                            </div>
                            <div class="flex items-center">
                                <Checkbox id="colaborador" name="option" value="Los Angeles" v-model="checkboxValue" />
                                <label for="colaborador" class="ml-2">Colaborador</label>
                            </div>
                            <div class="flex items-center">
                                <Checkbox id="fornecedor" name="option" value="New York" v-model="checkboxValue" />
                                <label for="fornecedor" class="ml-2">Fornecedor</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col mt-3">
                    <div class="space-x-5">
                        <Tabs value="0">
                            <TabList>
                                <Tab value="0">Dados Base</Tab>
                                <Tab value="1">Endereço de Entrega</Tab>
                                <Tab value="2">Header III</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="0">
                                    <div class="flex space-x-2 my-2">
                                        <div class="flex flex-col w-28">
                                            <label for="id">ID</label>
                                            <InputText id="id" type="text" disabled />
                                        </div>
                                        <div class="flex flex-wrap w-1/2">
                                            <label for="state">Tipo</label>
                                            <Select id="state" v-model="tipoPessoa" :options="tipoPessoas" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="cpf_cnpj">CPF</label>
                                            <InputText id="cpf_cnpj" type="text" />
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="insc_est">INSCRIÇÃO ESTADUAL</label>
                                            <InputText id="insc_est" type="text" />
                                        </div>
                                    </div>
                                    <div class="flex space-x-2 my-2">
                                        <div class="flex flex-col w-full">
                                            <label for="cpf_cnpj">RAZÃO</label>
                                            <InputText id="cpf_cnpj" type="text" />
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="insc_est">FANTASIA</label>
                                            <InputText id="insc_est" type="text" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="flex space-x-2 my-2">
                                        <div class="flex flex-col w-1/6">
                                            <label for="cep">CEP</label>
                                            <InputText id="cep" type="text" />
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="endereco"> ENDEREÇO</label>
                                            <InputText id="endereco" type="text" />
                                        </div>
                                        <div class="flex flex-col w-1/6">
                                            <label for="numero"> NUMERO</label>
                                            <InputText id="numero" type="text" />
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="bairro"> BAIRRO</label>
                                            <InputText id="bairro" type="text" />
                                        </div>
                                    </div>
                                    <div class="flex space-x-2 my-2">
                                        <div class="flex flex-col w-1/2">
                                            <label for="cidade">CIDADE</label>
                                            <Select id="cidade" v-model="tipoPessoa" :options="tipoPessoas" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                                        </div>
                                        <div class="flex flex-col w-1/2">
                                            <label for="estado"> ESTADO</label>
                                            <Select id="estado" v-model="tipoPessoa" :options="tipoPessoas" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="bairro"> COMPLEMENTO</label>
                                            <InputText id="bairro" type="text" />
                                        </div>
                                        <div class="flex flex-col w-1/2">
                                            <label for="status"> STATUS</label>
                                            <Select id="status" v-model="tipoPessoa" :options="tipoPessoas" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="flex space-x-2 my-2">
                                        <div class="flex flex-col w-full">
                                            <label for="telefone1"> TELEFONE</label>
                                            <InputText id="telefone1" type="text" />
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="telefone2"> TELEFONE</label>
                                            <InputText id="telefone2" type="text" />
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="telefone3"> TELEFONE</label>
                                            <InputText id="telefone3" type="text" />
                                        </div>
                                        <div class="flex flex-col w-full">
                                            <label for="telefone4"> TELEFONE</label>
                                            <InputText id="telefone4" type="text" />
                                        </div>
                                    </div>
                                    <div class="flex w-full space-x-2 my-2">
                                        <div>
                                            <label for="address">Foto</label>
                                            <FileUpload name="demo[]" @uploader="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000" customUpload />
                                        </div>
                                        <div class="w-full">
                                            <label for="address">Observação</label>
                                            <Textarea class="w-full" id="address" rows="4" />
                                        </div>
                                    </div>
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

const checkboxValue = ref('1');

const tipoPessoas = ref([
    { name: 'Física', code: 1 },
    { name: 'Jurídica', code: 2 },
    { name: 'Outro', code: 3 }
]);

const tipoPessoa = ref({ name: 'Física', code: 1 });

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
    dialogVisible.value = false; // ativa o modal dialogo pequeno.
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
label {
    font-weight: 700;
    font-size: 0.85em;
    color: #64748b;
}
</style>
