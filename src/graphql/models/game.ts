import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import {GraphQLLadder} from './ladder';

export const GraphQLGame = new GraphQLObjectType({
  name: 'Game',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    platform: {
      type: GraphQLString
    },
    ladders: {
      type: GraphQLList(GraphQLLadder)
    },
    imageLink: {
      type: GraphQLString
    }
  }
});