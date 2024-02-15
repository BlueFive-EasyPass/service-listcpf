import { IArray, IDomain } from "./domainInterface";

export interface IService {

  savefile(data: any): Promise<any>;
  save(data: IArray): Promise<boolean>;
  search(data: IDomain['data']): Promise<any>;
  update(data: IDomain['data'], arg1: any): Promise<any>;
  delete(data: IDomain['data']): Promise<any>;
}
