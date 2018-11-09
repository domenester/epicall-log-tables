import * as sequelize from "sequelize";

export interface ITableHandler {
  sequelize: sequelize.Sequelize;
  model: sequelize.Model<string, {}>;
  getModel: () => sequelize.Model<string, {}>;
  initialize: (modelForeign?: sequelize.Model<string, {}> | Array<sequelize.Model<string, {}>>) => void;
  createMocks: (mockRule: Function) => Promise<any>;
  drop: () => any;
  belongsTo?: (
    modelForeign: sequelize.Model<string, {}>,
    options?: sequelize.AssociationOptionsBelongsTo
  ) => sequelize.IncludeAssociation;
  hasMany?: (
    modelForeign: sequelize.Model<string, {}>,
    options?: sequelize.AssociationOptionsBelongsTo
  ) => sequelize.IncludeAssociation;
}