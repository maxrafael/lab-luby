module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          location: 'São Paulo/SP',
          avatar_id: 1,
          username: 'john',
          bio: 'Developer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Mary Doe',
          email: 'mary@doe.com',
          location: 'São Paulo/SP',
          avatar_id: 1,
          username: 'mary',
          bio: 'Developer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Peter Doe',
          email: 'peter@doe.com',
          location: 'São Paulo/SP',
          avatar_id: 1,
          username: 'peter',
          bio: 'Developer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Mike Doe',
          email: 'mike@doe.com',
          location: 'São Paulo/SP',
          avatar_id: 1,
          username: 'mike',
          bio: 'Developer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'kate Doe',
          email: 'kate@doe.com',
          location: 'São Paulo/SP',
          avatar_id: 1,
          username: 'kate',
          bio: 'Developer',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async () => {},
};
