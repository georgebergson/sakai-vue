export const StatusService = {
    getStatus() {
        return [
            {
                name: 'Ativo',
                code: '0'
            },
            {
                name: 'Inativo',
                code: '1'
            },
            {
                name: 'Bloqueado',
                code: '2'
            }
        ];
    }
};
