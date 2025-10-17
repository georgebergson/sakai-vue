<script setup>
import { ref } from 'vue';

const selectedPlan = ref(null);
const plans = [
    {
        id: 1,
        name: 'Básico',
        description: 'Perfeito para começar',
        price: '29',
        period: 'mês',
        features: ['Até 5 usuários', '10 GB de armazenamento', 'Suporte por email', 'Relatórios básicos', 'Integração com 3 sistemas'],
        highlighted: false
    },
    {
        id: 2,
        name: 'Profissional',
        description: 'Ideal para empresas em crescimento',
        price: '79',
        period: 'mês',
        features: ['Até 25 usuários', '100 GB de armazenamento', 'Suporte por email e chat', 'Relatórios avançados', 'Integração com 15 sistemas', 'API customizada', 'Dashboard personalizado'],
        highlighted: true
    },
    {
        id: 3,
        name: 'Empresarial',
        description: 'Para grandes operações',
        price: 'Customizado',
        period: null,
        features: ['Usuários ilimitados', 'Armazenamento ilimitado', 'Suporte 24/7 dedicado', 'Relatórios customizados', 'Integração ilimitada', 'API customizada completa', 'Gerenciador de conta', 'SLA garantido'],
        highlighted: false
    }
];

const selectPlan = (planId) => {
    selectedPlan.value = planId;
};
</script>

<template>
    <div class="bg-surface-50 dark:bg-surface-950 min-h-screen py-12 px-4">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-16">
                <div class="flex items-center justify-center mb-6">
                    <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 shrink-0">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                            fill="var(--primary-color)"
                        />
                    </svg>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold text-surface-900 dark:text-surface-0 mb-4">SISTEMAS BLUE</h1>
                <p class="text-xl text-muted-color mb-2">Escolha o plano perfeito para seu negócio</p>
                <p class="text-base text-muted-color">Todos os planos incluem suporte técnico e atualizações automáticas</p>
            </div>

            <!-- Plans Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                    v-for="plan in plans"
                    :key="plan.id"
                    :class="[
                        'relative bg-surface-0 dark:bg-surface-900 rounded-xl shadow-lg transition-all duration-300 cursor-pointer',
                        plan.highlighted ? 'ring-2 ring-primary scale-105 md:scale-110' : '',
                        selectedPlan === plan.id ? 'ring-2 ring-primary' : 'hover:shadow-xl'
                    ]"
                    @click="selectPlan(plan.id)"
                >
                    <!-- Badge for highlighted plan -->
                    <div v-if="plan.highlighted" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span class="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">MAIS POPULAR</span>
                    </div>

                    <!-- Plan Content -->
                    <div class="p-8">
                        <!-- Plan Name -->
                        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-2">{{ plan.name }}</h2>
                        <p class="text-muted-color text-sm mb-6">{{ plan.description }}</p>

                        <!-- Price -->
                        <div class="mb-8">
                            <div class="flex items-baseline">
                                <span v-if="plan.price !== 'Customizado'" class="text-4xl font-bold text-surface-900 dark:text-surface-0"> R$ {{ plan.price }} </span>
                                <span v-else class="text-3xl font-bold text-surface-900 dark:text-surface-0">
                                    {{ plan.price }}
                                </span>
                                <span v-if="plan.period" class="text-muted-color ml-2">/{{ plan.period }}</span>
                            </div>
                        </div>

                        <!-- Select Button -->
                        <Button
                            :label="selectedPlan === plan.id ? '✓ SELECIONADO' : 'SELECIONAR'"
                            :class="['w-full h-12 mb-8 font-semibold transition-all', selectedPlan === plan.id ? 'bg-primary text-white' : '']"
                            :severity="selectedPlan === plan.id ? 'primary' : plan.highlighted ? 'primary' : 'secondary'"
                            @click="selectPlan(plan.id)"
                        />

                        <!-- Features List -->
                        <div class="space-y-4">
                            <div v-for="(feature, index) in plan.features" :key="index" class="flex items-start gap-3">
                                <div class="text-primary pt-1">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <span class="text-surface-700 dark:text-surface-300 text-sm">{{ feature }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div v-if="selectedPlan" class="mt-16 text-center">
                <Button label="PROSSEGUIR COM O PLANO SELECIONADO" class="h-12 px-8 text-lg font-semibold" as="router-link" to="/checkout" />
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.p-button) {
    border-radius: 0.5rem;
}
</style>
