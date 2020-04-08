import { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLInputField, GraphQLInputObjectType, GraphQLInt, GraphQLFloat,  } from 'graphql';
import {GraphQLTeam} from './models/team';
import Team from '../models/Team';

const createTeam = {  
  type: GraphQLTeam,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    ladderId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    playersId: {
      type: GraphQLList(GraphQLID)
    }
  },
  resolve: async (_: any, {name, ladderId, playersId}: any) => {
    return await Team.create({
      name, ladderId, playersId
    });
  }
}

const getTeam = {
  type: GraphQLTeam,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, {_id}: any) => {
    return await Team.findById(_id);
  }
}

export const teamQueries = {
  getTeam
};

export const teamMutations = {
  createTeam
};