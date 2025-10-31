export const CountryService = {
    getData() {
        return [{ name: 'Brasil', code: 1058 }];
    },

    getCountries() {
        return Promise.resolve(this.getData());
    }
};
