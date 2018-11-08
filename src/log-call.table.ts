import { LOG_CALL } from "./config";
import { ITableHandler } from "./table-handler.interface";
import { Sequelize } from "sequelize";
import * as sequelize from "sequelize";

export class LogCall implements ITableHandler{

  sequelize: Sequelize;
  model: sequelize.Model<string, {}>;

  constructor(sequelize: Sequelize){
    this.sequelize = sequelize;
  }

  initialize() {

    const { fields } = LOG_CALL;

    this.model = this.sequelize.define(LOG_CALL.name, {
      [fields.id.value]: {
        type: sequelize.UUID,
        primaryKey: fields.id.primaryKey
      },
      [fields.createdAt.value]: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
      },
      [fields.userIdFrom.value]: {
        type: sequelize.UUID,
        allowNull: false
      },
      [fields.userIdTo.value]: {
        type: sequelize.UUID,
        allowNull: false
      },
      [fields.type.value]: {
        type: sequelize.INTEGER
      },
      [fields.startedAt.value]: {
        type: sequelize.DATE,
        allowNull: false
      },
      [fields.endedAt.value]: {
        type: sequelize.DATE,
        allowNull: false
      },
      [fields.file.value]: {
        type: sequelize.STRING({ length: 255 }),
        allowNull: false
      },
      [fields.status.value]: {
        type: sequelize.INTEGER,
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

export const LogCallInstance = (uri: string, options?: sequelize.Options): LogCall => {
  const sequelizeInstance = new sequelize(uri, options || { logging: false });
  const logCall = new LogCall(sequelizeInstance);
  logCall.initialize();
  return logCall;
}
