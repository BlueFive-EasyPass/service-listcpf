import { FastifyReply } from "fastify"

export interface IController {
    Save(reply: FastifyReply): any
    Search(reply: FastifyReply): any
    Update(arg0: any, reply: FastifyReply): any
    Delete(reply: FastifyReply): any
}