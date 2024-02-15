import { IArray, IDomain } from "../interfaces/domainInterface";
import { IModelDB } from "../interfaces/interfaceModel";
import { IRepository } from "../interfaces/interfaceRepository";

export class Repository implements IRepository {
    private modelDB: IModelDB
    constructor(modelDB: IModelDB) {
        this.modelDB = modelDB
    }

    async savefile(array: any[]): Promise<{ successful: any[], failed: any[] }> {
        const successful: any[] = [];
        const failed: any[] = [];

        try {
            const model = await this.modelDB.syncModel();

            for (const item of array) {
                try {

                    const result = await model.create(item);
                    console.log(result);
                    
                    successful.push(result);
                } catch (error) {
                    failed.push(item);
                }
            }

            return { successful, failed };
        } catch (error) {
            return { successful: [], failed: array };
        } finally {
            this.modelDB.desconnectModel();
        }
    }


    async save(data: IArray): Promise<any> {
        const results: any[] = [];

        try {
            const model = await this.modelDB.syncModel();

            for (const item of data) {
                const result = await model.create(item);
                results.push(result);
            }

            return results;
        } catch (error) {
            return false
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async search(data: IDomain['data']): Promise<any> {
        try {
            const model = await this.modelDB.syncModel()
            const resultJson = await model.findAll({
                where: { ...data }
            })
            const result = await resultJson.map((result: any) => result.toJSON());
            if (result.length > 0) {
                return result
            }
            return false
        } catch (error) {
            return error
        } finally {
            this.modelDB.desconnectModel()
        }
    }
    async update(data: IDomain['data'], params: any): Promise<any> {
        try {
            const model = await this.modelDB.syncModel()
            const result = await model.update({ ...data }, {
                where: { ...params }
            })
            if (result[0] > 0) {
                return result
            }
            return false
        } catch (error) {
            return false
        } finally {
            this.modelDB.desconnectModel()
        }
    }
    async delete(data: IDomain['data']): Promise<any> {
        try {
            const model = await this.modelDB.syncModel()
            const result = await model.destroy({
                where: { ...data }
            })
            if (result) {
                return result
            }
            return false
        } catch (error) {
            return false
        } finally {
            this.modelDB.desconnectModel()
        }
    }
}