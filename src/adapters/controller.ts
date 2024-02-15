import { FastifyReply} from "fastify";
import { IController } from "../interfaces/interfaceController";
import { IDomain } from "../interfaces/domainInterface";
import { IMid } from "../interfaces/interfaceMid";

export class Controller implements IController {
    private domain: IDomain
    private mid: IMid

    constructor(domain: IDomain, mid: IMid) {
        this.domain = domain
        this.mid = mid
    }

    async SaveFile(reply: FastifyReply) {
        try {
            const validate = await this.mid.validateAll()
            const result = await this.domain.savefile(validate['arrayValid'])
            console.log(result);
            if (result['successful'][0]) {
                reply.code(200).send({ send: result, error: validate['arrayInvalid']})
            }
            reply.code(400).send({ failed: result, error: validate })

        } catch (error) {
            reply.code(500).send({ error: error })
        }
    }

    async Save(reply: FastifyReply) {
        try {
            const result = await this.domain.save()
            if (result) {
                reply.code(200).send({ send: result })
            } else {
                reply.code(400).send({ error: 'Erro ao salvar no banco' })
            }
        } catch (error) {
            reply.code(500).send({ error: error })
        }
    }
    async Update(params: IDomain['data'], reply: FastifyReply) {
        try {
            const result = await this.domain.update(params)
            if (result) {
                reply.code(200).send({ send: `${result} usuário(s) alterado(s)` })
            } else {
                reply.code(400).send({ error: 'Erro ao atualizar no banco' })
            }
        } catch (error) {
            reply.code(500).send({ error: error })
        }
    }
    async Search(reply: FastifyReply) {
        try {
            const result = await this.domain.search()
            if (result) {
                reply.code(200).send({ send: result })
            } else {
                reply.code(400).send({ error: 'Erro ao pesquisar no banco' })
            }
        } catch (error) {
            reply.code(500).send({ error: error })
        }
    }
    async Delete(reply: FastifyReply) {
        try {
            const result = await this.domain.delete()
            if (result) {
                reply.code(200).send({ send: `${result} usuário(s) deletado(s)` })
            } else {
                reply.code(400).send({ error: 'Erro ao deletar no banco' })
            }
        } catch (error) {
            reply.code(500).send({ error: error })
        }
    }
}