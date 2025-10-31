export const TipoDeRecebimentoFiscal = {
    getData() {
        return [
            { name: 'DINHEIRO', code: 1 },
            { name: 'CHEQUE', code: 2 },
            { name: 'CARTÃO DE CRÉDITO', code: 3 },
            { name: 'CARTÃO DE DÉBITO', code: 4 },
            { name: 'CRÉDITO DA LOJA', code: 5 },
            { name: 'VALE ALIMENTAÇÃO', code: 10 },
            { name: 'VALE REFEIÇÃO', code: 11 },
            { name: 'VALE PRESENTE', code: 12 },
            { name: 'VALE COMBUSTÍVEL', code: 13 },
            { name: 'DUPLICATA MERCANTIL', code: 14 },
            { name: 'BOLETO BANCÁRIO', code: 15 },
            { name: 'DEPÓSITO BANCÁRIO', code: 16 },
            { name: 'PIX - DINÂMICO', code: 17 },
            { name: 'TRANSFERÊNCIA BANCÁRIA', code: 18 },
            { name: 'FIDELIDADE,CASHBACK', code: 19 },
            { name: 'PIX - ESTÁTICO', code: 20 },
            { name: 'SEM PAGAMENTO', code: 90 },
            { name: 'OUTROS', code: 99 }
        ];
    },

    getByCode(code) {
        return this.getData().find((item) => item.code === code);
    },

    getNameByCode(code) {
        const item = this.getByCode(code);
        return item ? item.name : null;
    },

    getCodeByName(name) {
        const item = this.getData().find((item) => item.name.toLowerCase() === name.toLowerCase());
        return item ? item.code : null;
    }
};
