import { ref } from 'vue';

const isVisible = ref(false);
const drawerTitle = ref('');
const drawerContent = ref(null);

export function useDrawer() {
    const openDrawer = (title, content) => {
        drawerTitle.value = title;
        drawerContent.value = content;
        isVisible.value = true;
    };

    const closeDrawer = () => {
        isVisible.value = false;
        // Limpa após fechar para evitar flash de conteúdo antigo
        setTimeout(() => {
            drawerTitle.value = '';
            drawerContent.value = null;
        }, 300);
    };

    return {
        isVisible,
        drawerTitle,
        drawerContent,
        openDrawer,
        closeDrawer
    };
}
