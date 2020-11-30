import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        location: Sequelize.STRING,
        username: Sequelize.STRING,
        bio: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.hasMany(models.Repository, { as: 'repositories' });
    this.belongsToMany(models.Repository, {
      through: 'stars',
      foreignKey: 'user_id',
      as: 'users',
    });
    this.hasMany(models.Follower, { as: 'followers' });
  }
}

export default User;
