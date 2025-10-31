export const ProdutosTiposService = {
    getData() {
        return [
            { id: 1, code: '00', name: 'Mercadoria para Revenda' },
            { id: 2, code: '01', name: 'Matéria-Prima' },
            { id: 3, code: '02', name: 'Embalagem' },
            { id: 4, code: '03', name: 'Produto em Processo' },
            { id: 5, code: '04', name: 'Produto Acabado' },
            { id: 6, code: '05', name: 'SubProduto' },
            { id: 7, code: '06', name: 'Produto Intermediário' },
            { id: 8, code: '07', name: 'Material de Uso e Consumo' },
            { id: 9, code: '08', name: 'Ativo Imobilizado' },
            { id: 10, code: '09', name: 'Serviços' },
            { id: 11, code: '10', name: 'Outros Insumos' },
            { id: 12, code: '99', name: 'Outras' }
        ];
    },

    getByCode(code) {
        return this.getData().find((item) => item.code === code);
    },

    getById(id) {
        return this.getData().find((item) => item.id === id);
    },

    getNameByCode(code) {
        const item = this.getByCode(code);
        return item ? item.name : null;
    },

    getCodeByName(name) {
        const item = this.getData().find((item) => item.name.toLowerCase() === name.toLowerCase());
        return item ? item.code : null;
    },

    getIdByCode(code) {
        const item = this.getByCode(code);
        return item ? item.id : null;
    },

    getCodeById(id) {
        const item = this.getById(id);
        return item ? item.code : null;
    }
};
