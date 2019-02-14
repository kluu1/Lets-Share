const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, { userNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }
`;

const resolvers = {
  Query: {
    getTodos: () => todos
  }
};

const server = new ApolloServer({
  typeDefs
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
