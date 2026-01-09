<script setup>
import { useDrawer } from '@/store/useDrawe';
import { computed, ref } from 'vue';

const visibleFull = ref(false);

// Drawer global
const { isVisible, drawerTitle, drawerContent, closeDrawer } = useDrawer();

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

const handleClose = () => {
    closeDrawer();
};
</script>

<template>
    <Dialog v-model:visible="isVisible" modal :header="drawerTitle" :style="drawerStyle" @update:visible="handleClose">
        <div class="p-4">
            <component :is="drawerContent" />
        </div>
    </Dialog>
</template>