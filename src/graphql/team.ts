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

const getTeamsByPlayer = {
  type: new GraphQLList(GraphQLTeam),
  args: {
    playerId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, {playerId}: any) => {
    return await Team.find({ playersId: playerId });
  }
}

const getTeamsByLadder = {
  type: new GraphQLList(GraphQLTeam),
  args: {
    ladderId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, {ladderId}: any) => {
    return await Team.find({ ladderId });
  }
}

export const teamQueries = {
  getTeam,
  getTeamsByPlayer,
  getTeamsByLadder
};

export const teamMutations = {
  createTeam
};