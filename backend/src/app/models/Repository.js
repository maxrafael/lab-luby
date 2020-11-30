import Sequelize, { Model } from 'sequelize';

class Repository extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        public: Sequelize.BOOLEAN,
        slug: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsToMany(models.User, {
      through: 'stars',
      foreignKey: 'repository_id',
      as: 'whoStarred',
    });
  }
}

export default Repository;
