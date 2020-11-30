module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'repositories',
      [
        {
          name: 'ReactJS',
          description: 'Repo reactjs',
          slug: 'john-ReactJS',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'ReactNative',
          description: 'Repo react native',
          slug: 'john-ReactNative',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'VueJS',
          description: 'Repo vuejs',
          slug: 'john-VueJS',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'PHP',
          description: 'Repo php',
          slug: 'john-PHP',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async () => {},
};
