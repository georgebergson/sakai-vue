<script setup>
import { useDrawer } from '@/store/useDrawe';
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

// Importar os componentes que serão usados nos drawers
import ProdutosComponent from '@/components/dashboard/BestSellingWidget.vue'; // exemplo
import { default as PerfilUsuario, default as PessoasComponent } from '@/components/dashboard/RecentSalesWidget.vue'; // exemplo
import TipoDeRecebimento from '@/views/pages/cadastro/TipoDeRecebimento.vue';

const { openDrawer } = useDrawer();

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'PAINEL PRINCIPAL', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'ATALHOS',
        items: [
            {
                label: 'PDV',
                icon: 'pi pi-fw pi-id-card',
                to: '/pdv/market',
                target: '_blank'
            },
            {
                label: 'Perfil Rápido',
                icon: 'pi pi-fw pi-user',
                drawer: PerfilUsuario, // Usa drawer em vez de rota
                drawerTitle: 'Perfil do Usuário'
            }
        ]
    },
    {
        label: 'MENU',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'VENDAS',
                icon: 'pi pi-fw pi-shopping-bag',
                items: [
                    {
                        label: 'PDV',
                        icon: 'pi pi-fw pi-users',
                        to: '/vendas/pdv'
                    },
                    {
                        label: 'Vendas Balcão',
                        icon: 'pi pi-fw pi-user-plus',
                        to: '/vendas/vendasbalcao'
                    },
                    {
                        label: 'Ordem de Serviço',
                        icon: 'pi pi-fw pi-barcode',
                        to: '/vendas/ordemservico'
                    },
                    {
                        label: 'Comandas',
                        icon: 'pi pi-fw pi-wallet',
                        to: '/vendas/comandas'
                    },
                    {
                        label: 'Delivery',
                        icon: 'pi pi-fw pi-credit-card',
                        to: '/vendas/delivery'
                    }
                ]
            }
        ]
    },
    {
        label: '',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'CADASTROS',
                icon: 'pi pi-pen-to-square',
                items: [
                    {
                        label: 'Pessoas',
                        icon: 'pi pi-fw pi-users',
                        drawer: PessoasComponent, // Abre no drawer
                        drawerTitle: 'Cadastro de Pessoas'
                    },
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-fw pi-user-plus',
                        to: '/cadastro/usuarios' // Continua com rota normal
                    },
                    {
                        label: 'Produtos',
                        icon: 'pi pi-fw pi-barcode',
                        drawer: ProdutosComponent, // Abre no drawer
                        drawerTitle: 'Cadastro de Produtos'
                    },
                    {
                        label: 'Forma de Pagamento',
                        icon: 'pi pi-fw pi-wallet',
                        to: '/cadastro/formapagamento'
                    },
                    {
                        label: 'Tipo de Recebimento',
                        icon: 'pi pi-fw pi-credit-card',
                        drawer: TipoDeRecebimento, // Abre no drawer
                        drawerTitle: 'Cadastro de Tipo de Recebimento'
                    }
                ]
            }
        ]
    },
    {
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'FINANCEIRO',
                icon: 'pi pi-building-columns',
                items: [
                    {
                        label: 'Caixa',
                        icon: 'pi pi-fw pi-dollar',
                        to: '/cadastro/pessoas'
                    },
                    {
                        label: 'Recebimentos',
                        icon: 'pi pi-fw pi-receipt',
                        to: '/cadastro/produtos'
                    },
                    {
                        label: 'Contas a Pagar',
                        icon: 'pi pi-fw pi-arrow-circle-down',
                        to: '/cadastro/formapagamento'
                    },
                    {
                        label: 'Contas a Receber',
                        icon: 'pi pi-fw pi-arrow-circle-up',
                        to: '/cadastro/tiporecebimento'
                    }
                ]
            }
        ]
    },
    {
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'ESTOQUE',
                icon: 'pi pi-box',
                items: [
                    {
                        label: 'Entrada de Produtos',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/cadastro/pessoas'
                    },
                    {
                        label: 'Saida de Produtos',
                        icon: 'pi pi-fw pi-sign-out',
                        to: '/cadastro/produtos'
                    },
                    {
                        label: 'Balanco de Estoque',
                        icon: 'pi pi-fw pi-sort-amount-up-alt',
                        to: '/cadastro/formapagamento'
                    }
                ]
            }
        ]
    },
    {
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'FISCAL',
                icon: 'pi pi-file-check',
                items: [
                    {
                        label: 'Gerenciamento de Notas',
                        icon: 'pi pi-fw pi-qrcode',
                        to: '/cadastro/pessoas'
                    },
                    {
                        label: 'Grupo Tributario',
                        icon: 'pi pi-fw pi-list-check',
                        to: '/cadastro/produtos'
                    },
                    {
                        label: 'Configuração de Notas',
                        icon: 'pi pi-fw pi-wrench',
                        to: '/cadastro/formapagamento'
                    },
                    {
                        label: 'Enviar para o Contador',
                        icon: 'pi pi-fw pi-send',
                        to: '/cadastro/tiporecebimento'
                    }
                ]
            }
        ]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-book',
                to: '/documentation'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
