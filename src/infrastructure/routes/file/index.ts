import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import multer from 'fastify-multer';
import xlsx from 'xlsx';
import path from 'path';

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
                
                const data = xlsx.utils.sheet_to_json(worksheet);
                const formattedData = data.map((row: any) => ({
                    cnpj: row['cnpj'],
                    tipo: row['tipo'],
                    cpf: row['cpf']
                }));
                
                console.log(formattedData);
                reply.code(200).send({ data: formattedData });
            } catch (error) {
                reply.code(500).send({ error: error });
            }
        }
    }
};
