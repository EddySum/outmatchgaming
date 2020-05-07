import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLInputObjectType } from 'graphql';

export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: GraphQLID
    },
    username: {
      type: GraphQLString
    },
    points: {
      type: GraphQLInt
    }
  }
});