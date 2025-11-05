<script setup>
import { useLayout } from '@/layout/composables/layout';
import { useDrawer } from '@/store/useDrawe';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { layoutState, setActiveMenuItem, toggleMenu } = useLayout();
const { openDrawer } = useDrawer();

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    index: {
        type: Number,
        default: 0
    },
    root: {
        type: Boolean,
        default: true
    },
    parentItemKey: {
        type: String,
        default: null
    }
});

const isActiveMenu = ref(false);
const itemKey = ref(null);

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);

    const activeItem = layoutState.activeMenuItem;

    isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;
});

watch(
    () => layoutState.activeMenuItem,
    (newVal) => {
        isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-');
    }
);

function itemClick(event, item) {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    // Se o item tem target="_blank", abre em nova aba
    if (item.target === '_blank' && item.to) {
        event.preventDefault();
        window.open(item.to, '_blank');

        if (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive) {
            toggleMenu();
        }
        return;
    }

    // Se o item tem drawer configurado, abre o drawer
    if (item.drawer) {
        event.preventDefault();
        openDrawer(item.drawerTitle || item.label, item.drawer);

        if (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive) {
            toggleMenu();
        }
        return;
    }

    if ((item.to || item.url) && (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)) {
        toggleMenu();
    }

    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }

    const foundItemKey = item.items ? (isActiveMenu.value ? props.parentItemKey : itemKey) : itemKey.value;

    setActiveMenuItem(foundItemKey);
}

function checkActiveRoute(item) {
    return route.path === item.to;
}
</script>

<template>
    <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
        <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">{{ item.label }}</div>

        <!-- Link com Drawer -->
        <a v-if="item.drawer && item.visible !== false" href="#" @click="itemClick($event, item, index)" :class="item.class" tabindex="0">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
        </a>

        <!-- Link com target="_blank" -->
        <a v-else-if="item.to && item.target === '_blank' && item.visible !== false" href="#" @click="itemClick($event, item, index)" :class="item.class" tabindex="0">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i class="pi pi-fw pi-external-link layout-menuitem-icon" style="margin-left: auto; font-size: 0.875rem"></i>
        </a>

        <!-- Link externo com URL -->
        <a v-else-if="item.url && item.visible !== false && !item.drawer" :href="item.url" @click="itemClick($event, item, index)" :class="item.class" :target="item.target" tabindex="0">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
            <i v-if="item.target === '_blank'" class="pi pi-fw pi-external-link layout-menuitem-icon" style="margin-left: auto; font-size: 0.875rem"></i>
        </a>

        <!-- Link normal sem rota e com submenu -->
        <a v-else-if="(!item.to || item.items) && item.visible !== false && !item.drawer && !item.url" href="#" @click="itemClick($event, item, index)" :class="item.class" tabindex="0">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
        </a>

        <!-- Router link normal -->
        <router-link
            v-else-if="item.to && !item.items && item.visible !== false && !item.drawer && item.target !== '_blank'"
            @click="itemClick($event, item, index)"
            :class="[item.class, { 'active-route': checkActiveRoute(item) }]"
            tabindex="0"
            :to="item.to"
        >
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
        </router-link>

        <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <app-menu-item v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parentItemKey="itemKey" :root="false"> </app-menu-item>
            </ul>
        </Transition>
    </li>
</template>
