import { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLInputField, GraphQLInputObjectType, GraphQLInt, GraphQLFloat,  } from 'graphql';
import {GraphQLTeam} from './models/team';
import Team, { ITeam } from '../models/Team';
import { Response } from 'express';
import User from '../models/User';

const createTeam = {  
  type: GraphQLTeam,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    ladderId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, {name, ladderId}: any, res: Response) => {
    const {userID} = res.locals; 

    if (!userID) {
      return;
    }

    return await Team.create({
      name, 
      ladderId, 
      playersId: userID
    });
  }
}

const addPlayerToTeam = {
  type: GraphQLTeam,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    playerId: {
      type: new GraphQLNonNull(GraphQLList(GraphQLID))
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, {_id, playerId, userId}: any) => {
    // TODO: create teamowner field & add validation for teamowner

    const team = await Team.findOne({_id});

    const playerExists = team?.playersId.some(id => {
      console.log(id, playerId);
      // strict comparison wont work due playerId being a list
      return id == playerId[0];
    });

    if (playerExists) {
      throw new Error("player is already on the team");
    }

    team?.playersId.push(playerId);
    return await team?.save();
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
    const team = await Team.findById(_id);

    const getPlayers = async () => {
      if (team) {
        return Promise.all(team.playersId.map(playerId => User.findById(playerId)));
      } else {
        return null;
      }
    }

    const players = await getPlayers();

    return {
      name: team?.name,
      playersId: team?.playersId,
      ladderId: team?.ladderId,
      points: team?.points,
      players
    }
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
  createTeam,
  addPlayerToTeam
};