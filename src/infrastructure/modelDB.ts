import { DataTypes } from 'sequelize';
import { IDatabaseConnection } from '../interfaces/databaseInterface';
import { IModelDB } from '../interfaces/interfaceModel';


export class ModelDB implements IModelDB {
    private connection: IDatabaseConnection;
    private instance: IDatabaseConnection['getInstance'];

    constructor(connection: IDatabaseConnection) {
        this.connection = connection;
        this.instance = this.connection.getInstance()
    }


    private defineModel() {
        return this.instance.define('list_CPF', {
            list_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            bussines_buss_CNPJ: {
                type: DataTypes.STRING,
                allowNull: false
            },
            list_tipo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            list_CPF: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            tableName: 'list_CPF',
            timestamps: false
        });
    }

    async syncModel() {
        try {
            const model = this.defineModel();
            this.connection.Connect();
            await this.instance.sync();
            console.log('Modelo sincronizado com o banco de dados');
            return model;
        } catch (err) {
            console.error('Erro ao sincronizar o modelo:', err);
            throw err;
        }
    }

    desconnectModel() {
        console.log('Modelo desconectado');
        this.connection.Disconnect();
    }
}
