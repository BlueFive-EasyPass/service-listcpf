import { IDomain } from "../interfaces/domainInterface";
import { IService } from "../interfaces/interfaceService";

export class Domain implements IDomain {
    data: IDomain['data'];
    private service: IService
    constructor(data: IDomain['data'], service: IService) {
        this.data = data
        this.service = service
    }

    async save() {
        try {
            const result = await this.service.save(this.data)
            return result
        } catch (error) {
            throw error
        }
    }
    async search() {
        try {
            const result = await this.service.search(this.data)
            return result
        } catch (error) {
            throw error
        }
    }
    async update(params: IDomain['data']) {
        try {
            const result = await this.service.update(this.data, params)
            return result
        } catch (error) {
            throw error
        }
    }
    async delete() {
        try {
            const result = await this.service.delete(this.data)
            return result
        } catch (error) {
            throw error
        }
    }
}