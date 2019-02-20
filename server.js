const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// import environment variables and mongoose models
require('dotenv').config();
const User = require('./models/User');
const Post = require('./models/Post');

// import graphql typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

// verify jwt token passed from client
const getUser = async (token) => {
  if (token) {
    try {
      let user = await jwt.verify(token, process.env.SECRET);
      console.log(user);
    } catch (err) {
      throw new AuthenticationError('Your session has ended. Please sign in again.');
    }
  }
};

// create apollo/graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization'];
    return { User, Post, currentUser: await getUser(token) };
  },
});

// start apollo/graphql server
server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
