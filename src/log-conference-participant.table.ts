import { LOG_CONFERENCE_PARTICIPANT } from "./config";
import { ITableHandler } from "./table-handler.interface";
import { Sequelize } from "sequelize";
import * as sequelize from "sequelize";

export class LogConferenceParticipant implements ITableHandler{

  sequelize: Sequelize;
  model: sequelize.Model<string, {}>;

  constructor(sequelize: Sequelize){
    this.sequelize = sequelize;
  }

  initialize() {

    const { fields } = LOG_CONFERENCE_PARTICIPANT;

    this.model = this.sequelize.define(LOG_CONFERENCE_PARTICIPANT.name, {
      [fields.id.value]: {
        type: sequelize.UUID,
        primaryKey: fields.id.primaryKey
      },
      [fields.createdAt.value]: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
      },
      [fields.userId.value]: {
        type: sequelize.STRING,
        allowNull: false
      },
      [fields.gotInAt.value]: {
        type: sequelize.DATE,
        allowNull: false
      },
      [fields.gotOutAt.value]: {
        type: sequelize.DATE,
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

  belongsTo(
    model: sequelize.Model<string, {}>, 
    options?: sequelize.AssociationOptionsBelongsTo
  ) {
    return this.model.belongsTo(model, options || { 
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
    const operation = await this.model.drop().catch(err => err);
    return operation;
  }
}

export const LogConferenceParticipantInstance = (
  uri: string,
  options?: sequelize.Options
): LogConferenceParticipant => {
  const sequelizeInstance = new sequelize(uri, options || {
    dialect: "postgres",
    logging: false 
  });
  const logConference = new LogConferenceParticipant(sequelizeInstance);
  logConference.initialize();
  return logConference;
}
