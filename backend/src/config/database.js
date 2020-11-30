module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: 'docker',
  database: 'labluby',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
