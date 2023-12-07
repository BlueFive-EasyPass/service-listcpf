import { IController } from "./interfaceController";

export interface IInstanceManager {
    getController(): IController
}