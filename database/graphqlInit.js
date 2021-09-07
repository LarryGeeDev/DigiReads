const { ApolloServer } = require("apollo-server-express");
const root = require("./graphql/resolvers");
const typeDef = require("./graphql/typeDef");


const Server = new ApolloServer({
    typeDefs: typeDef,
    resolvers: root,
    context: ({ req }) => ({
        headerAuth: req.headers.authorization
    }),
});

module.exports = Server