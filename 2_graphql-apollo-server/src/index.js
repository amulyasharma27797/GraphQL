import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import Query from './resolvers/Query';
import User from './resolvers/Users';
import Comment from './resolvers/Comment';
import Post from './resolvers/Post';
import Mutation from './resolvers/Mutation';
import db from './db';
import schema from "./schema";

export default (async function(){
    // Creating an ApolloSever
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: {
            Query,
            User,
            Comment,
            Post,
            Mutation
        },
        context: {
            db
        }
    })

    // Initializing express
    const app = express();

    // Using the express as middleware 
    // and providing the url path
    server.applyMiddleware({
        app,
        path: '/graphql',
    })

    // Providing the port and host to listen by express
    app.listen({port:4000, host:'0.0.0.0'}, () => console.log("Server is running!"))
    return server;
}());
