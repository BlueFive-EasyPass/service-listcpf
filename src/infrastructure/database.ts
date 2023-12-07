import dotenv from 'dotenv'
import { IDatabaseConnection } from '../interfaces/databaseInterface';
import { Sequelize } from 'sequelize';

dotenv.config()

export class SequelizeConnection implements IDatabaseConnection {
  private sequelize: Sequelize;
  private database = process.env.database
  private username = process.env.admin
  private password = process.env.password
  private host = process.env.host
  
  constructor() {
    this.sequelize = new Sequelize({
      database: this.database,
      username: this.username,
      password: this.password,
      host: this.host,
      port: 3306,
      dialect: 'mysql',
    });
  }

  getInstance() {
    return this.sequelize;
  }

  async Connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Conexão Sequelize estabelecida com sucesso');
    } catch (error) {
      console.error('Erro ao conectar via Sequelize:', error);
      throw error;
    }
  }

  async Disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log('Conexão Sequelize encerrada');
    } catch (error) {
      console.error('Erro ao desconectar via Sequelize:', error);
      throw error;
    }
  }
}
