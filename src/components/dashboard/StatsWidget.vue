<script setup>
import { ref } from 'vue';
const dropdownItems = ref([
    { name: 'Hoje', code: 1 },
    { name: 'Semana', code: 2 },
    { name: 'Mês', code: 3 }
]);
const dropdownItem = ref({ name: 'Hoje', code: 1 });
</script>

<template>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card">
            <div class="flex justify-between">
                <div>
                    <span class="block text-muted-color font-medium mb-8">Vendas</span>
                </div>
                <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                </div>
            </div>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-sm">
                <div>
                    <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Selecione" class="w-full bg-red-100"></Select>
                </div>
            </div>
            <div class="text-primary font-medium text-right mt-5 text-xl">R$ 150.349,32</div>
            <!-- <span class="text-muted-color"> recebidas</span> -->
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card">
            <div class="flex justify-between">
                <div>
                    <span class="block text-muted-color font-medium mb-8">Notas</span>
                </div>
                <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                </div>
            </div>
            <div class="text-orange-500 dark:text-surface-0 font-medium text-sm">
                <div>
                    <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Selecione" class="w-full bg-red-100"></Select>
                </div>
            </div>
            <div class="text-orange-500 font-medium text-right mt-5 text-xl">R$ 150.349,32</div>
            <!-- <span class="text-muted-color"> recebidas</span> -->
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card">
            <div class="flex justify-between">
                <div>
                    <span class="block text-muted-color font-medium mb-8">Contas a pagar</span>
                </div>
                <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-users text-cyan-500 !text-xl"></i>
                </div>
            </div>
            <div class="text-cyan-500 dark:text-surface-0 font-medium text-sm">
                <div>
                    <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Selecione" class="w-full bg-red-100"></Select>
                </div>
            </div>
            <div class="text-cyan-500 font-medium text-right mt-5 text-xl">R$ 150.349,32</div>
            <!-- <span class="text-muted-color"> recebidas</span> -->
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card">
            <div class="flex justify-between">
                <div>
                    <span class="block text-muted-color font-medium mb-8">Contas a receber</span>
                </div>
                <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-comment text-purple-500 !text-xl"></i>
                </div>
            </div>
            <div class="text-purple-500 dark:text-surface-0 font-medium text-sm">
                <div>
                    <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Selecione" class="w-full bg-red-100"></Select>
                </div>
            </div>
            <div class="text-purple-500 font-medium text-right mt-5 text-xl">R$ 150.349,32</div>
            <!-- <span class="text-muted-color"> recebidas</span> -->
        </div>
    </div>
</template>

<style scoped>
.card {
    padding: 1rem;
}
</style>
