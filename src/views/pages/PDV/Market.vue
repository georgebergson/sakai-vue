<script setup lang="ts">
import AppTopbarPDV from '@/layout/AppTopbarPDV.vue';
</script>

<template>
    <header class="bg-blue-600 text-white p-2 px-3">
        <AppTopbarPDV />
    </header>

    <!-- Conteúdo central -->
    <main class="flex-1 flex flex-col overflow-hidden my-1">
        <div class="bg-gray-800 text-white mx-2 rounded-lg p-3 flex items-center justify-center">
            <div class="text-white px-8 py-1 rounded text-3xl">COCA COLA ZERO - 2 LITROS RETORNAVEL</div>
        </div>

        <div class="flex-1 flex overflow-hidden mx-2 rounded-lg mt-1">
            <!-- Coluna esquerda -->
            <section class="w-1/3 bg-gray-400 p-4 overflow-auto justify-between flex flex-col">
                <div>
                    <div class="w-full my-2">
                        <InputText id="codigodebarras" type="text" class="w-full text-3xl font-bold uppercase" placeholder="CODIGO DE BARRAS" autofocus autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    </div>
                    <div class="flex justify-center w-full bg-white rounded-lg mb-5">
                        <Image class="rounded-lg bg-white p-2" src="https://cdn.awsli.com.br/2500x2500/1847/1847175/produto/94341414/ae8a351bc9.jpg" alt="Image" width="200" />
                    </div>
                </div>
                <!-- <div class="flex w-full space-x-2 my-2 items-center">
                    <InputText id="codigodebarras" type="text" class="w-1/2 text-3xl font-bold uppercase" placeholder="QUANTIDADE" autofocus autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <span class="text-2xl font-bold px-2">X</span>
                    <InputText id="codigodebarras" type="text" class="w-full text-3xl font-bold uppercase" placeholder="PREÇO DE VENDA" autofocus autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false" />
                </div> -->

                <div class="grid grid-cols-3 gap-2 w-full">
                    <Button label="CONSULTAR PRODUTO" severity="secondary" />
                    <Button label="ALTERAR CLIENTE" severity="secondary" />
                    <Button label="ALTERAR VENDEDOR" severity="secondary" />
                    <Button label="IMPRIMIR VENDA" severity="secondary" />
                    <Button label="CANCELAR VENDA" severity="secondary" />
                    <Button label="FINALIZAR VENDA" severity="secondary" />
                    <Button label="DESCONTO TOTAL" severity="secondary" />
                    <Button label="SANGRIA CAIXA" severity="secondary" />
                    <Button label="FECHAR CAIXA" severity="secondary" />
                </div>
            </section>

            <!-- Coluna direita -->
            <section class="w-full bg-red-400 p-4 overflow-auto">
                <h2 class="text-lg font-medium mb-2">Coluna Direita</h2>
                <p>Conteúdo aqui...</p>
            </section>
        </div>
    </main>

    <!-- Rodapé -->
    <footer class="bg-blue-600 text-white p-2 space-x-3 flex justify-end px-3">
        <div>total</div>
    </footer>
</template>
