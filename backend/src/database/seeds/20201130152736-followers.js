module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'followers',
      [
        {
          user_id: 1,
          follower_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          follower_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          follower_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          follower_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          follower_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async () => {},
};
