<template>
    <!-- Seus outros drawers -->
    <Drawer v-model:visible="visibleFull" header="Drawer" position="full">
        <p>Lorem ipsum dolor sit amet...</p>
    </Drawer>
    <Button icon="pi pi-external-link" @click="visibleFull = true" />

    <!-- Drawer Global Reutilizável -->
    <Drawer v-model:visible="isVisible" :header="drawerTitle" position="full" :style="drawerStyle">
        <component :is="drawerContent" v-if="drawerContent" />
    </Drawer>
</template>

<script setup>
import { useDrawer } from '@/store/useDrawe';
import { computed, ref } from 'vue';

const visibleFull = ref(false);

// Drawer global
const { isVisible, drawerTitle, drawerContent } = useDrawer();

const isMobile = ref(window.innerWidth < 768);
window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
});

const drawerStyle = computed(() => {
    if (isMobile.value) {
        return {};
    }
    return {
        width: '50vw !important',
        height: '80vh !important',
        borderRadius: '10px !important'
    };
});
</script>
