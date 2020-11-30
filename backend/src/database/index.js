import Sequelize from 'sequelize';

import User from '../app/models/User';
import Token from '../app/models/Token';
import File from '../app/models/File';
import Follower from '../app/models/Follower';
import Repository from '../app/models/Repository';
import Star from '../app/models/Star';

import databaseConfig from '../config/database';

const models = [User, Token, File, Follower, Repository, Star];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
