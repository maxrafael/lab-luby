module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'stars',
      [
        {
          repository_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          repository_id: 1,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          repository_id: 1,
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          repository_id: 1,
          user_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          repository_id: 2,
          user_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async () => {},
};
