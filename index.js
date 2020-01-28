import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './typedefs/schema';
import { decodeToken } from './auth';

const server = new ApolloServer({
    schema: schema,
    context: async ({ req }) => {
        if (req.headers.token)
        {
            return decodeToken(req.headers.token);
        } else {
            return null;
        }
    }
});
const app = express();
app.use(cors());
server.applyMiddleware({app});

app.listen({port: 4000}, () => {
    mongoose.connect('mongodb://localhost:27017/dds');
    console.log('Server is now running on port 4000!');
});