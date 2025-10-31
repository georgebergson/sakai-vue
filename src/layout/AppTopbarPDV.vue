<script setup>
import { useLayout } from '@/layout/composables/layout';

const { toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="flex justify-between px-2">
        <div class="">
            <span>SBLUE PDV</span>
        </div>

        <div class="flex space-x-5">
            <div class="">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
            </div>

            <div class="">
                <div class="">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-bell"></i>
                    </button>
                </div>
            </div>

            <div class="">
                <div class="">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-window-maximize"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
