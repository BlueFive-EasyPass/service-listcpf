import { IArray, IDomain } from "../interfaces/domainInterface";
import { IRepository } from "../interfaces/interfaceRepository";
import { IService } from "../interfaces/interfaceService";

export class Service implements IService {
    private repository: IRepository
    constructor(repository: IRepository) {
        this.repository = repository
    }

    async save(data: IArray): Promise<boolean> {
        try {
            const result = await this.repository.save(data)
            return result
        } catch (error) {
            throw error
        }
    }
    async search(data: IDomain['data']): Promise<any> {
        try {
            const result = await this.repository.search(data)
            return result
        } catch (error) {
            throw error
        }
    }
    async update(data: IDomain['data'], params: any): Promise<any> {
        try {
            const result = await this.repository.update(data, params)
            return result
        } catch (error) {
            throw error
        }
    }
    async delete(data: IDomain['data']): Promise<any> {
        try {
            const result = await this.repository.delete(data)
            return result
        } catch (error) {
            throw error
        }
    }

}