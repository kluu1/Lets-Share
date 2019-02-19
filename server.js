const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

// create apollo/graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

// start apollo/graphql server
server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
