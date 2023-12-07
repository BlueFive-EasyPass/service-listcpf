export interface IDomain {
    data: {
        bussines_buss_CNPJ: string,
        list_tipo: string,
        list_CPF: string,
    }

    save(): any
    search(): any
    update(arg0: any): any
    delete(): any
}