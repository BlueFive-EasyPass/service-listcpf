export interface IDomain {
    data: {
        bussines_buss_CNPJ: string,
        list_tipo: string,
        list_CPF: string,
    }

    savefile(arg0: any): any
    save(): any
    search(): any
    update(arg0: any): any
    delete(): any
}

export interface RowData {
    cnpj: string;
    tipo: string;
    cpf: string;
}

export interface IFile<T> extends Array<T> {}

export type IArray = IDomain['data'][];
