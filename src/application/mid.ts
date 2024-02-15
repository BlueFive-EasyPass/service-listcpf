import { IFile } from "../interfaces/domainInterface";
import { IMid } from "../interfaces/interfaceMid";

export class Mid implements IMid {
    private file: IFile<any>
    constructor(file: IFile<any>) {
        this.file = file;
    }

    private async validateCPF(cpf: string): Promise<boolean> {
        let Soma = 0;
        let Resto;

        if (
            [
                '00000000000',
                '11111111111',
                '22222222222',
                '33333333333',
                '44444444444',
                '55555555555',
                '66666666666',
                '77777777777',
                '88888888888',
                '99999999999',
            ].includes(cpf)
        ) {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            Soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        Resto = (Soma * 10) % 11;

        if (Resto === 10 || Resto === 11) {
            Resto = 0;
        }

        if (Resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        Soma = 0;

        for (let i = 1; i <= 10; i++) {
            Soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        Resto = (Soma * 10) % 11;

        if (Resto === 10 || Resto === 11) {
            Resto = 0;
        }

        if (Resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    }



    private async validateCNPJ(cnpj: string): Promise<boolean> {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
            return false;
        }

        if (
            cnpj === '00000000000000' ||
            cnpj === '11111111111111' ||
            cnpj === '22222222222222' ||
            cnpj === '33333333333333' ||
            cnpj === '44444444444444' ||
            cnpj === '55555555555555' ||
            cnpj === '66666666666666' ||
            cnpj === '77777777777777' ||
            cnpj === '88888888888888' ||
            cnpj === '99999999999999'
        ) {
            return false;
        }

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado.toString() !== digitos.charAt(0)) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado.toString() !== digitos.charAt(1)) {
            return false;
        }

        return true;
    }

    private async transformItem(item: any) {
        return {
            bussines_buss_CNPJ: item.cnpj,
            list_tipo: item.tipo,
            list_CPF: item.cpf
        };
    }
    
    async validateAll(): Promise<{ arrayValid: any[], arrayInvalid: any[] }> {
        const arrayValid: any[] = [];
        const arrayInvalid: any[] = [];
    
        for (const item of this.file) {
            const transformedItem = await this.transformItem(item);
            const isValidCPF = await this.validateCPF(transformedItem.list_CPF);
            const isValidCNPJ = await this.validateCNPJ(transformedItem.bussines_buss_CNPJ);
            const isValidType = transformedItem.list_tipo === 'student' || transformedItem.list_tipo === 'worker';
    
            if (isValidCPF && isValidCNPJ && isValidType) {
                arrayValid.push(transformedItem);
            } else {
                arrayInvalid.push(transformedItem);
            }
        }
    
        return { arrayValid, arrayInvalid };
    }
}     