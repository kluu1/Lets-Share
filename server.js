const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config();

// import db models
const User = require('./models/Users');
const Post = require('./models/Post');

// connect to mongo db
mongoose
  .connect(process.env.MONGO_URI, { userNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

// define type definition
const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }
`;

// define the resolvers
const resolvers = {
  Query: {
    getTodos: () => todos
  }
};

// setup apollo server
const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
