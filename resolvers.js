module.exports = {
  Query: {
    getUser: () => null
  },
  Mutation: {
    // destructure username, email, password from 'args' and destructure 'User' from context
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exsits');
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return newUser;
    }
  }
};
