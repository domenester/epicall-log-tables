import { LOG_CONFERENCE } from "./config";
import * as sequelize from "sequelize";
import { Sequelize } from "sequelize";
import { ITableHandler } from "./table-handler.interface";

export class LogConference implements ITableHandler{

  sequelize: Sequelize;
  model: sequelize.Model<string, {}>;

  constructor(sequelize: Sequelize){
    this.sequelize = sequelize;
  }

  initialize() {

    const { fields } = LOG_CONFERENCE;

    this.model = this.sequelize.define(LOG_CONFERENCE.name, {
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
        type: sequelize.STRING,
        allowNull: false
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
      timestamps: false
    });
  }

  hasMany(
    model: sequelize.Model<string, {}>, 
    options?: sequelize.AssociationOptionsBelongsTo
  ) {
    return this.model.hasMany(model, options || { 
      foreignKey: { allowNull: false }, onDelete: 'CASCADE' 
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
    const operation = await this.model.drop({cascade: true}).catch(err => err);
    return operation;
  }
}

export const LogConferenceInstance = (uri: string, options?: sequelize.Options): LogConference => {
  const sequelizeInstance = new sequelize(uri, options || { logging: false });
  const logConference = new LogConference(sequelizeInstance);
  logConference.initialize();
  return logConference;
}
