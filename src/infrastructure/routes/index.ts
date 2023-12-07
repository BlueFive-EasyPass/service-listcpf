import { FastifyReply, FastifyRequest } from "fastify"
import { InstanceManager } from "../instanceManager"
import { IInstanceManager } from "../../interfaces/interfaceInstanceManager"
import { IDomain } from "../../interfaces/domainInterface"
import { IController } from "../../interfaces/interfaceController"
import { Resource } from "fastify-autoroutes"


export default () => <Resource>{
    post: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = request.body as IDomain['data']
                const instanceManager: IInstanceManager = new InstanceManager(data)
                const controller: IController = instanceManager.getController()
                await controller.Save(reply)
            } catch (error) {
                reply.code(500).send({ error: error })
            }
        }
    },

    get: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = request.query as IDomain['data']
                const instanceManager: IInstanceManager = new InstanceManager(data)
                const controller: IController = instanceManager.getController()
                console.log(data);
                console.log(instanceManager);
                console.log(controller);
                await controller.Search(reply)
            } catch (error) {
                reply.code(500).send({ error: error })
            }
        }
    },

    put: {
        url: "/:list_CPF",
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const CPF = request.params as IDomain['data']
                if (CPF.list_CPF.length !== 11) {
                    reply.code(500).send({ error: 'Parâmetro deve ser um CPF' })
                    return
                }
                const data = request.body as IDomain['data']
                const instanceManager: IInstanceManager = new InstanceManager(data)
                const controller: IController = instanceManager.getController()
                await controller.Update(CPF, reply)
            } catch (error) {
                reply.code(500).send({ error: error })
            }
        }
    },

    delete: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = request.body as IDomain['data']
                const instanceManager: IInstanceManager = new InstanceManager(data)
                const controller: IController = instanceManager.getController()
                await controller.Delete(reply)
            } catch (error) {
                reply.code(500).send({ error: error })
            }
        }
    }
}