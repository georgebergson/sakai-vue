export const ProdutosUnidadesService = {
    getData() {
        return [
            { name: 'UN', code: 1 },
            { name: 'KG', code: 2 },
            { name: 'G', code: 3 },
            { name: 'M', code: 4 },
            { name: 'M2', code: 5 },
            { name: 'M3', code: 6 },
            { name: 'LT', code: 7 },
            { name: 'CJ', code: 8 },
            { name: 'CX', code: 9 },
            { name: 'PC', code: 10 }
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
