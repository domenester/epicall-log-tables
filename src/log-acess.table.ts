import * as sequelize from "sequelize";
import { Sequelize, Model as sequelizeModel } from "sequelize";
import { LOG_ACCESS } from "./config";
import { ITableHandler }  from "./table-handler.interface";

export class LogAccess implements ITableHandler{

  sequelize: Sequelize;
  model: sequelize.Model<string, {}>;

  constructor(sequelize: Sequelize){
    this.sequelize = sequelize;
  }

  initialize() {

    const { fields } = LOG_ACCESS;

    this.model = this.sequelize.define(LOG_ACCESS.name, {
      [fields.id.value]: {
        type: sequelize.UUID,
        primaryKey: fields.id.primaryKey,
      },
      [fields.userId.value]: {
        type: sequelize.UUID,
        allowNull: false
      },
      [fields.createdAt.value]: {
        type: sequelize.DATE,
        allowNull: false
      },
      [fields.isLogoff.value]: {
        type: sequelize.BOOLEAN,
        allowNull: false
      }
    }, { 
      freezeTableName: true,
      timestamps:false
    });
  }

  getModel() {
    return this.model;
  }

  async createMocks(mockRule: Function) {
    const operation = await mockRule(this.model);
    return operation;
  }

  async drop() {
    const operation = await this.model.drop().catch(err => err);
    return operation;
  }
}

export const LogAccessInstance = (uri: string): LogAccess => {
  const sequelizeInstance = new sequelize(uri);
  const logAccess = new LogAccess(sequelizeInstance);
  logAccess.initialize();
  return logAccess;
}