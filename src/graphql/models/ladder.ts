import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLInputObjectType } from 'graphql';

export const GraphQLLadder = new GraphQLObjectType({
  name: 'Ladder',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    maxPlayers: {
      type: GraphQLInt
    }
  }
});

export const graphQLLadderInput = new GraphQLInputObjectType({
  name: 'LadderInput',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    maxPlayers: {
      type: GraphQLInt
    }
  })
})