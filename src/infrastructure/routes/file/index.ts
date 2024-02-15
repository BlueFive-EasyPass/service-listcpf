import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import multer from 'fastify-multer';
import xlsx from 'xlsx';
import path from 'path';
import { IInstanceManager } from '../../../interfaces/interfaceInstanceManager';
import { IController } from '../../../interfaces/interfaceController';
import { InstanceManager } from '../../instanceManager';
import { IFile, RowData } from '../../../interfaces/domainInterface';

const upload = multer({ dest: 'src/uploads/' });

export default () => <Resource>{
    post: {
        preHandler: upload.single('data'),
        handler: async (request: any, reply: FastifyReply) => {
            try {
                const filePath = path.join(process.cwd(), request.file.path);
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                
                const data: IFile<any> = xlsx.utils.sheet_to_json(worksheet);

                const formattedData: RowData[] = Object.values(data).map((row: any) => ({
                    cnpj: row['cnpj'],
                    tipo: row['tipo'],
                    cpf: row['cpf']
                }));
                
                console.log(formattedData);
                
                const instanceManager: IInstanceManager = new InstanceManager(null, null, data)
                const controller: IController = instanceManager.getController()
                await controller.SaveFile(reply)
            } catch (error) {
                reply.code(500).send({ error: error });
            }
        }
    }
};
