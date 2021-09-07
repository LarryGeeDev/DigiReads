const { ApolloServer } = require("apollo-server-express");
const root = require("./graphql/resolvers");
const typeDef = require("./graphql/schema");


const Server = new ApolloServer({
    typeDefs: typeDef,
    resolvers: root,
});

module.exports = Server