import { Controller } from "../adapters/controller";
import { Repository } from "../adapters/repository";
import { Service } from "../application/service";
import { Domain } from "../domain/domain";
import { IDatabaseConnection } from "../interfaces/databaseInterface";
import { IArray, IDomain } from "../interfaces/domainInterface";
import { IController } from "../interfaces/interfaceController";
import { IInstanceManager } from "../interfaces/interfaceInstanceManager";
import { IModelDB } from "../interfaces/interfaceModel";
import { IRepository } from "../interfaces/interfaceRepository";
import { IService } from "../interfaces/interfaceService";
import { SequelizeConnection } from "./database";
import { ModelDB } from "./modelDB";

export class InstanceManager implements IInstanceManager {
  private data: IDomain['data'];
  private databaseConnection: IDatabaseConnection;
  private repository: IRepository;
  private service: IService;
  private domain: IDomain;
  private controller: IController;
  private modelDB: IModelDB;
  private array: IArray;

  constructor(data: any, arrayData: any) {
    this.data = data;
    this.array = arrayData
    this.databaseConnection = new SequelizeConnection()
    this.modelDB = new ModelDB(this.databaseConnection)
    this.repository = new Repository(this.modelDB);
    this.service = new Service(this.repository);
    this.domain = new Domain(this.data, this.service, this.array);
    this.controller = new Controller(this.domain);
  }

  getController(): IController {
    console.log(this.data);

    return this.controller;
  }
}
