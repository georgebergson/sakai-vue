export const CoresService = {
    getData() {
        return [
            { code: 1, name: 'PADRAO' },
            { code: 2, name: 'AMARELO' },
            { code: 3, name: 'AZUL' },
            { code: 4, name: 'BEGE' },
            { code: 5, name: 'BRANCO GELO' },
            { code: 6, name: 'BRONZE' },
            { code: 7, name: 'DOURADO' },
            { code: 8, name: 'GELO' },
            { code: 9, name: 'LARANJA' },
            { code: 10, name: 'MARROM' },
            { code: 11, name: 'PADRÃO' },
            { code: 12, name: 'PRETO' },
            { code: 13, name: 'PRATA' },
            { code: 14, name: 'ROSA' },
            { code: 15, name: 'ROXO' },
            { code: 16, name: 'VERDE' },
            { code: 17, name: 'VERMELHO' },
            { code: 18, name: 'CINZA' }
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
