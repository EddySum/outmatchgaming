import { expect } from "chai"
import mongoose from "mongoose";
import Game, { IGame } from "../src/models/Game";

describe('Game Model', () => {
  beforeEach(async () => {
    mongoose.connect('mongodb://localhost:27017/outmatchgamingtest', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
  });

  it('should create game', () => {
    const newGame: IGame = new Game({
      name: 'Modern Warfare',
      platform: 'PS4',
      ladders: [
        {
          name: 'Doubles',
          maxPlayers: 2
        }
      ]
    });

    const error = newGame.validateSync();
    expect(error).to.equal(undefined);
  });

  describe('name field test', () => {
    it('must have length 3 or greater', () => {
      const newGame: IGame = new Game({
        name: 'ga',
        platform: 'PS4'
      });

      // test size 2
      let error = newGame.validateSync();
      expect(error).to.not.equal(undefined);

      // test size 3
      newGame.name = 'Sin';
      error = newGame.validateSync();
      expect(error).to.equal(undefined);
    });

    it('must be length 25 or less', () => {
      const newGame: IGame = new Game({
        name: 'thisgamenameis26letterscuz',
        platform: 'PS4'
      });

      // test size 26
      let error = newGame.validateSync();
      expect(error).to.not.equal(undefined);

      // test size 25
      newGame.name = 'thisgamenameis25letterscu';
      error = newGame.validateSync();
      expect(error).to.equal(undefined);
    });
  });

  describe('platform field test', () => {
    it('must be valid game platform', () => {
      const newGame: IGame = new Game({
        name: 'Modern Warfare',
        platform: 'fake'
      });

      const error = newGame.validateSync();
      expect(error).to.not.equal(undefined);
    });
  });

  describe('Ladder field test', () => {
    it('can hold multiple ladders', () => {
      const newGame = new Game({
        name: 'Modern Warfare',
        platform: 'PS4',
        ladders: [
          {
            name: 'Squads',
            maxPlayers: 10
          },
          {
            name: 'Doubles',
            maxPlayers: 4
          },
          {
            name: 'Singles',
            maxPlayers: 1
          }
        ]
      });

      const error = newGame.validateSync();
      expect(error).to.equal(undefined);
    });
  });
});