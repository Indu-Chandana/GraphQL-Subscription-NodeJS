const express = require("express");
const { createServer } = require("http");  // This is our subscription server live
const { makeExecutableSchema } = require("@graphql-tools/schema"); // this is make executable schema from our type defs and resolvers
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { ApolloServer} = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs.js");
const resolvers = require("./resolvers.js");

(async function () {
    const app = express();

    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: '/graphql'}
    );

    const server = new ApolloServer({
        schema,
        Plugin: [ 
            {
                async serverWillStart(){
                    return{
                        async drainServer() {
                            subscriptionServer.close();
                        }
                    };
                }
            }
        ]
    });

    await server.start();
    server.applyMiddleware({ app });

    mongoose.connect('mongodb+srv://user:user123@cluster001.n4vq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    console.log('Mongoose connected ...');

    const PORT = 4000;
    httpServer.listen(PORT, () => console.log("Server is now running on port " + PORT))
})();