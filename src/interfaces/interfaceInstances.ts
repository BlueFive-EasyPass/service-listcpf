import { IDatabaseConnection } from "./databaseInterface";
import { IRepository } from "./interfaceRepository";
import { IService } from "./interfaceService";

export interface IInstances {
    createInstances(): {
      databaseConnection: IDatabaseConnection;
      repository: IRepository;
      service: IService;
    };
  }