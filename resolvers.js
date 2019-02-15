module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        });
      return posts;
    }
  },

  Mutation: {
    addPost: async (
      _,
      // destructure fields from 'args'
      { title, imageUrl, categories, description, creatorId },
      // destructure 'Post' from context
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();
      return newPost;
    },

    // destructure fields from 'args' and destructure 'User' from context
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
