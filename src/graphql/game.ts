import { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLInputField, GraphQLInputObjectType, GraphQLInt,  } from 'graphql';
import {GraphQLGame} from './models/game';
import Game from '../models/Game';
import { graphQLLadderInput } from './models/ladder';

const createGame = {  
  type: GraphQLGame,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    platform: {
      type: new GraphQLNonNull(GraphQLString)
    },
    ladders: {
      type: GraphQLList(graphQLLadderInput)
    }
  },
  resolve: async (_: any, {name, platform, ladders}: any) => {
    return await Game.create({name, platform, ladders});
  }
}

const getGames = {
  type: new GraphQLList(GraphQLGame),
  resolve: async () => {
    return await Game.find({});
  }
}

const getGame = {
  type: GraphQLGame,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, {_id}: any) => {
    return await Game.findById(_id);
  }
}

const getGamesByPlatform = {
  type: new GraphQLList(GraphQLGame),
  args: {
    platform: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (_: any, {platform}: any) => {
    return await Game.find({platform});
  }
}


export const gameQueries = {
  getGames,
  getGame,
  getGamesByPlatform
};

export const gameMutations = {
  createGame
};