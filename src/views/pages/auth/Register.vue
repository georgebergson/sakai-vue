<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import validaCNPJ from '@/service/validaCnpj';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required, sameAs } from '@vuelidate/validators';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const active = ref(0);
const items = ref([
    {
        label: 'Pessoal'
    },
    {
        label: 'Empresa'
    },
    {
        label: 'Endereço'
    }
]);

const state = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cnpj: '',
    companyName: '',
    companyNickname: '',
    stateRegistration: '',
    cep: '',
    address: '',
    neighborhood: '',
    number: '',
    city: '',
    state: '',
    checked: false // Movido para dentro do state
});

// Validador customizado para CNPJ
const cnpjValido = helpers.withMessage('CNPJ inválido', (value) => !value || validaCNPJ(value));

const rules = computed(() => {
    const baseRules = {
        name: { required: helpers.withMessage('Campo nome é obrigatório', required) },
        email: { required: helpers.withMessage('Campo e-mail é obrigatório', required), email },
        password: { required: helpers.withMessage('Campo senha é obrigatório', required) },
        confirmPassword: {
            required: helpers.withMessage('Campo confirmação de senha é obrigatório', required),
            sameAs: helpers.withMessage('As senhas não coincidem', sameAs(state.value.password))
        },
        cnpj: { required: helpers.withMessage('Campo CNPJ é obrigatório', required), cnpjValido },
        companyName: { required: helpers.withMessage('Campo nome da empresa é obrigatório', required) },
        companyNickname: { required: helpers.withMessage('Campo apelido da empresa é obrigatório', required) },
        stateRegistration: { required: helpers.withMessage('Campo inscrição estadual é obrigatório', required) },
        cep: { required: helpers.withMessage('Campo CEP é obrigatório', required) },
        address: { required: helpers.withMessage('Campo endereço é obrigatório', required) },
        neighborhood: { required: helpers.withMessage('Campo bairro é obrigatório', required) },
        number: { required: helpers.withMessage('Campo número é obrigatório', required) },
        city: { required: helpers.withMessage('Campo cidade é obrigatório', required) },
        state: { required: helpers.withMessage('Campo estado é obrigatório', required) }
    };

    // Adiciona validação do checkbox apenas no step 0
    if (active.value === 0) {
        baseRules.checked = {
            sameAs: helpers.withMessage('Você deve aceitar os termos e condições', sameAs(true))
        };
    }

    return baseRules;
});

const v$ = useVuelidate(rules, state);

const getFieldsForStep = (step) => {
    switch (step) {
        case 0:
            return ['name', 'email', 'password', 'confirmPassword', 'checked'];
        case 1:
            return ['cnpj', 'companyName', 'companyNickname', 'stateRegistration'];
        case 2:
            return ['cep', 'address', 'neighborhood', 'number', 'city', 'state'];
        default:
            return [];
    }
};

const nextStep = async () => {
    // Valida apenas os campos do step atual
    const fieldsToValidate = getFieldsForStep(active.value);

    // Marca os campos como "touched" para mostrar erros
    fieldsToValidate.forEach((field) => {
        v$.value[field].$touch();
    });

    // Verifica se os campos do step atual são válidos
    const isStepValid = fieldsToValidate.every((field) => !v$.value[field].$invalid);

    if (!isStepValid) {
        return;
    }

    if (active.value < items.value.length - 1) {
        active.value++;
    }
};

const prevStep = () => {
    if (active.value > 0) {
        active.value--;
    }
};

const createAccount = async () => {
    const result = await v$.value.$validate();
    if (!result) {
        return;
    }
    // Lógica para criar a conta aqui
    router.push('/');
};
</script>

<template>
    <FloatingConfigurator />
    <div class="block md:flex md:flex-col bg-surface-50 dark:bg-surface-950 items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="block md:flex md:flex-col md:items-center md:justify-center min-h-screen md:min-h-0">
            <div class="w-full max-w-full md:max-w-fit md:w-auto">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-10 px-4 md:px-8 lg:px-10 md:rounded-lg">
                    <div class="text-center mb-8">
                        <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-8 w-16 shrink-0 mx-auto">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                                fill="var(--primary-color)"
                            />
                            <mask id="mask0_1413_1551" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="8" width="54" height="11">
                                <path d="M27 18.3652C10.5114 19.1944 0 8.88892 0 8.88892C0 8.88892 16.5176 14.5866 27 14.5866C37.4824 14.5866 54 8.88892 54 8.88892C54 8.88892 43.4886 17.5361 27 18.3652Z" fill="var(--primary-color)" />
                            </mask>
                            <g mask="url(#mask0_1413_1551)">
                                <path
                                    d="M-4.673e-05 8.88887L3.73084 -1.91434L-8.00806 17.0473L-4.673e-05 8.88887ZM27 18.3652L26.4253 6.95109L27 18.3652ZM54 8.88887L61.2673 17.7127L50.2691 -1.91434L54 8.88887ZM-4.673e-05 8.88887C-8.00806 17.0473 -8.00469 17.0505 -8.00132 17.0538C-8.00018 17.055 -7.99675 17.0583 -7.9944 17.0607C-7.98963 17.0653 -7.98474 17.0701 -7.97966 17.075C-7.96949 17.0849 -7.95863 17.0955 -7.94707 17.1066C-7.92401 17.129 -7.89809 17.1539 -7.86944 17.1812C-7.8122 17.236 -7.74377 17.3005 -7.66436 17.3743C-7.50567 17.5218 -7.30269 17.7063 -7.05645 17.9221C-6.56467 18.3532 -5.89662 18.9125 -5.06089 19.5534C-3.39603 20.83 -1.02575 22.4605 1.98012 24.0457C7.97874 27.2091 16.7723 30.3226 27.5746 29.7793L26.4253 6.95109C20.7391 7.23699 16.0326 5.61231 12.6534 3.83024C10.9703 2.94267 9.68222 2.04866 8.86091 1.41888C8.45356 1.10653 8.17155 0.867278 8.0241 0.738027C7.95072 0.673671 7.91178 0.637576 7.90841 0.634492C7.90682 0.63298 7.91419 0.639805 7.93071 0.65557C7.93897 0.663455 7.94952 0.673589 7.96235 0.686039C7.96883 0.692262 7.97582 0.699075 7.98338 0.706471C7.98719 0.710167 7.99113 0.714014 7.99526 0.718014C7.99729 0.720008 8.00047 0.723119 8.00148 0.724116C8.00466 0.727265 8.00796 0.730446 -4.673e-05 8.88887ZM27.5746 29.7793C37.6904 29.2706 45.9416 26.3684 51.6602 23.6054C54.5296 22.2191 56.8064 20.8465 58.4186 19.7784C59.2265 19.2431 59.873 18.7805 60.3494 18.4257C60.5878 18.2482 60.7841 18.0971 60.9374 17.977C61.014 17.9169 61.0799 17.8645 61.1349 17.8203C61.1624 17.7981 61.1872 17.7781 61.2093 17.7602C61.2203 17.7512 61.2307 17.7427 61.2403 17.7348C61.2452 17.7308 61.2499 17.727 61.2544 17.7233C61.2566 17.7215 61.2598 17.7188 61.261 17.7179C61.2642 17.7153 61.2673 17.7127 54 8.88887C46.7326 0.0650536 46.7357 0.0625219 46.7387 0.0600241C46.7397 0.0592345 46.7427 0.0567658 46.7446 0.0551857C46.7485 0.0520238 46.7521 0.0489887 46.7557 0.0460799C46.7628 0.0402623 46.7694 0.0349487 46.7753 0.0301318C46.7871 0.0204986 46.7966 0.0128495 46.8037 0.00712562C46.8177 -0.00425175 46.8262 -0.0115974 46.8291 -0.0139841C46.8319 -0.0163422 46.8267 -0.0121454 46.8134 -0.00133865C46.8068 0.00407096 46.7976 0.0116844 46.7858 0.0214853C46.7623 0.0410683 46.7283 0.0702159 46.6842 0.108428C46.5959 0.184878 46.4677 0.29722 46.3009 0.440904C45.9667 0.728559 45.4885 1.13623 44.8742 1.64298C43.6414 2.65943 41.8728 4.10482 39.6369 5.70403C35.1484 8.91329 28.811 12.4814 21.0779 13.4845L22.2272 36.3128C34.0699 34.8597 43.5174 29.6597 49.9415 25.1063C53.1625 22.8231 55.7134 20.5807 57.5108 18.9276C58.4114 18.0992 59.1288 17.3844 59.6515 16.8403C59.9131 16.5681 60.1286 16.3328 60.2969 16.1406C60.3811 16.0445 60.4525 15.9622 60.5108 15.8948C60.54 15.8611 60.5664 15.8303 60.5899 15.8026C60.6017 15.7888 60.6129 15.7756 60.6235 15.7631C60.6289 15.7568 60.634 15.7507 60.6389 15.7449C60.6414 15.742 60.6438 15.7391 60.6461 15.7364C60.6473 15.735 60.6487 15.7334 60.6496 15.7323C60.6508 15.731 60.6519 15.7297 54 8.88887Z"
                                    fill="var(--primary-color)"
                                />
                            </g>
                        </svg>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">SISTEMAS BLUE</div>
                        <span class="text-muted-color font-medium">crie sua conta</span>
                    </div>

                    <div class="mb-8">
                        <Steps :model="items" :activeStep="active" />
                    </div>

                    <div v-if="active === 0">
                        <div class="">
                            <div class="flex flex-col mb-4">
                                <InputText id="name1" type="text" placeholder="Nome" class="w-full md:w-[30rem] h-12" v-model="v$.name.$model" :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty }" />
                                <small v-if="v$.name.$invalid && v$.name.$dirty" class="p-error">{{ v$.name.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-col mb-4">
                                <InputText id="email1" type="email" placeholder="Email" class="w-full md:w-[30rem] h-12" v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && v$.email.$dirty }" />
                                <small v-if="v$.email.$invalid && v$.email.$dirty" class="p-error">{{ v$.email.$errors[0].$message }}</small>
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="flex flex-col mb-4">
                                <Password id="password" v-model="v$.password.$model" placeholder="Senha" :toggleMask="true" class="w-full h-12" fluid :feedback="false" :class="{ 'p-invalid': v$.password.$invalid && v$.password.$dirty }"></Password>
                                <small v-if="v$.password.$invalid && v$.password.$dirty" class="p-error">{{ v$.password.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-col mb-4">
                                <Password
                                    id="confirmPassword"
                                    v-model="v$.confirmPassword.$model"
                                    placeholder="Confirmar Senha"
                                    :toggleMask="true"
                                    class="w-full h-12"
                                    fluid
                                    :feedback="false"
                                    :class="{ 'p-invalid': v$.confirmPassword.$invalid && v$.confirmPassword.$dirty }"
                                ></Password>
                                <small v-if="v$.confirmPassword.$invalid && v$.confirmPassword.$dirty" class="p-error">{{ v$.confirmPassword.$errors[0].$message }}</small>
                            </div>
                        </div>
                    </div>

                    <div v-if="active === 1">
                        <div class="lg:space-x-5">
                            <div class="flex flex-col mb-4">
                                <InputMask id="cnpj" mask="99.999.999/9999-99" placeholder="00.000.0000/000-00" class="w-full md:w-[30rem] h-12" v-model="v$.cnpj.$model" :class="{ 'p-invalid': v$.cnpj.$invalid && v$.cnpj.$dirty }" />
                                <small v-if="v$.cnpj.$invalid && v$.cnpj.$dirty" class="p-error">{{ v$.cnpj.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-col mb-4">
                                <InputText id="companyName" type="text" placeholder="Nome da Empresa" class="w-full md:w-[30rem] h-12" v-model="v$.companyName.$model" :class="{ 'p-invalid': v$.companyName.$invalid && v$.companyName.$dirty }" />
                                <small v-if="v$.companyName.$invalid && v$.companyName.$dirty" class="p-error">{{ v$.companyName.$errors[0].$message }}</small>
                            </div>
                        </div>
                        <div class="lg:space-x-5">
                            <div class="flex flex-col mb-4">
                                <InputText
                                    id="companyNickname"
                                    type="text"
                                    placeholder="Apelido da Empresa"
                                    class="w-full md:w-[30rem] h-12"
                                    v-model="state.companyNickname"
                                    :class="{ 'p-invalid': v$.companyNickname.$invalid && v$.companyNickname.$dirty }"
                                />
                                <small v-if="v$.companyNickname.$invalid && v$.companyNickname.$dirty" class="p-error">{{ v$.companyNickname.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-col mb-4">
                                <InputText
                                    id="stateRegistration"
                                    type="text"
                                    placeholder="Inscrição Estadual"
                                    class="w-full md:w-[30rem] h-12"
                                    v-model="state.stateRegistration"
                                    :class="{ 'p-invalid': v$.stateRegistration.$invalid && v$.stateRegistration.$dirty }"
                                />
                                <small v-if="v$.stateRegistration.$invalid && v$.stateRegistration.$dirty" class="p-error">{{ v$.stateRegistration.$errors[0].$message }}</small>
                            </div>
                        </div>
                    </div>

                    <div v-if="active === 2">
                        <div class="lg:space-x-5">
                            <div class="flex flex-col mb-4">
                                <InputMask mask="99.999-99" id="cep" type="text" placeholder="00.000-00" class="w-full md:w-[15rem] h-12" v-model="v$.cep.$model" :class="{ 'p-invalid': v$.cep.$invalid && v$.cep.$dirty }" />
                                <small v-if="v$.cep.$invalid && v$.cep.$dirty" class="p-error">{{ v$.cep.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-col mb-4">
                                <InputText id="address" type="text" placeholder="Endereço" class="w-full md:w-[45rem] h-12" v-model="v$.address.$model" :class="{ 'p-invalid': v$.address.$invalid && v$.address.$dirty }" />
                                <small v-if="v$.address.$invalid && v$.address.$dirty" class="p-error">{{ v$.address.$errors[0].$message }}</small>
                            </div>
                        </div>
                        <div class="lg:space-x-5">
                            <div class="flex flex-col mb-4">
                                <InputText id="neighborhood" type="text" placeholder="Bairro" class="w-full md:w-[15rem] h-12" v-model="v$.neighborhood.$model" :class="{ 'p-invalid': v$.neighborhood.$invalid && v$.neighborhood.$dirty }" />
                                <small v-if="v$.neighborhood.$invalid && v$.neighborhood.$dirty" class="p-error">{{ v$.neighborhood.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-col mb-4">
                                <InputText id="number" type="text" placeholder="Número" class="w-full md:w-[10rem] h-12" v-model="v$.number.$model" :class="{ 'p-invalid': v$.number.$invalid && v$.number.$dirty }" />
                                <small v-if="v$.number.$invalid && v$.number.$dirty" class="p-error">{{ v$.number.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-col mb-4">
                                <InputText id="city" type="text" placeholder="Cidade" class="w-full md:w-[15rem] h-12" v-model="v$.city.$model" :class="{ 'p-invalid': v$.city.$invalid && v$.city.$dirty }" />
                                <small v-if="v$.city.$invalid && v$.city.$dirty" class="p-error">{{ v$.city.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-col mb-4">
                                <InputText id="state" type="text" placeholder="Estado" class="w-full md:w-[10rem] h-12" v-model="v$.state.$model" :class="{ 'p-invalid': v$.state.$invalid && v$.state.$dirty }" />
                                <small v-if="v$.state.$invalid && v$.state.$dirty" class="p-error">{{ v$.state.$errors[0].$message }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between mt-2 mb-10 gap-8">
                        <div v-if="active === 0">
                            <div class="flex items-center mb-2">
                                <Checkbox v-model="v$.checked.$model" id="terms1" binary class="mr-2" :class="{ 'p-invalid': v$.checked.$invalid && v$.checked.$dirty }"></Checkbox>
                                <label for="terms1" class="text-sm">Aceito os termos e condições</label>
                            </div>
                            <small v-if="v$.checked.$invalid && v$.checked.$dirty" class="p-error">{{ v$.checked.$errors[0].$message }}</small>
                        </div>
                    </div>

                    <div class="flex justify-between">
                        <Button label="Voltar" class="w-1/4 h-12" @click="prevStep" v-if="active > 0"></Button>
                        <Button :label="active === items.length - 1 ? 'CRIAR CONTA' : 'Próximo'" class="w-1/4 h-12" @click="active === items.length - 1 ? createAccount() : nextStep()"></Button>
                    </div>

                    <div class="text-center mt-6">
                        <span class="text-muted-color text-sm">Já possui conta? <router-link to="/login" class="font-medium no-underline cursor-pointer text-primary hover:underline">Faça login</router-link></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
/* Força borda vermelha nos Password quando inválidos */
:deep(.p-password.p-invalid > .p-inputtext) {
    border-color: var(--p-inputtext-invalid-border-color) !important;
}

/* Deixa o placeholder vermelho também */
:deep(.p-password.p-invalid > .p-inputtext::placeholder) {
    color: var(--p-form-field-invalid-placeholder-color) !important;
    opacity: 1; /* garante visibilidade */
}

/* Mensagem de erro (small.p-error) vermelha */
:deep(.p-error) {
    color: var(--p-inputtext-invalid-border-color) !important;
    font-weight: 500;
}

/* Borda vermelha no checkbox quando inválido */
:deep(.p-checkbox.p-invalid .p-checkbox-box) {
    border-color: var(--p-inputtext-invalid-border-color) !important;
}
</style>
