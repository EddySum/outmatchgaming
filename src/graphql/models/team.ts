import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLFloat } from 'graphql';
import { GraphQLUser } from './user';

export const GraphQLTeam = new GraphQLObjectType({
  name: 'Team',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    ladderId: {
      type: GraphQLID
    },
    playersId: {
      type: GraphQLList(GraphQLID)
    },
    points: {
      type: GraphQLFloat
    },
    players: {
      type: GraphQLList(GraphQLUser)
    }
  }
});