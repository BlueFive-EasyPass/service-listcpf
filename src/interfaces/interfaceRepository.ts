import { IArray, IDomain } from "./domainInterface";

export interface IRepository {
    save(data: IArray): Promise<any>;
    search(data: IDomain['data']): Promise<any>;
    update(data: IDomain['data'], arg1: any): Promise<any>
    delete(data: IDomain['data']): Promise<any>;
}