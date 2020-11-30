module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'default-avatar.png',
          path: '873046379019b206e7ed6db9490fc9f2.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async () => {},
};
