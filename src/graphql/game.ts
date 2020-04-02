import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import GraphQLGame from './models/game';
import Game from '../models/Game';

const createGame = {  
  type: GraphQLGame,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    platform: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (_: any, {name, platform}: any) => {
    return await Game.create({name, platform});
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

export const gameQueries = {
  getGame
};

export const gameMutations = {
  createGame
};