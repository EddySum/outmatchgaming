import express, { Request, Response } from 'express';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import { authenticate } from './middleware/auth'
import dotenv from 'dotenv';
import graphqlHTTP from 'express-graphql'
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { gameMutations, gameQueries } from './graphql/game';
import { teamQueries, teamMutations } from './graphql/team';
import { ServerResponse, IncomingMessage } from 'http';


var cors = require('cors')

/* Setup enviroment variables */
dotenv.config();

/* Connect to Local MongoDB */
mongoose.connect('mongodb://localhost:27017/outmatchgaming', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,  
  useFindAndModify: false
});
mongoose.connection.on('error', (err) => {
  console.log('Failed to connect MongoDB', err);
});

/* Configure Express application */
const app: express.Application = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env['COOKIE_SECRET']));
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000" // client address
})) 

const router = express.Router();

router.use('/users', require('./routes/user'));

app.use('', router);

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...gameQueries,
    ...teamQueries
  })
});

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...gameMutations,
    ...teamMutations
  })
});

app.use(
  '/graphql', 
  authenticate({graphql: true}),
  graphqlHTTP((req: IncomingMessage, res: ServerResponse) => {
    return {
      schema: new GraphQLSchema({ 
        query: rootQuery,
        mutation: rootMutation 
      }),
      context: res,
      graphiql: true,
    };
  })
)



app.listen(5000, () => {
  console.log('Server Start')
});
