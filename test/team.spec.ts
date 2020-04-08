import { expect, assert } from 'chai';
import mongoose from 'mongoose';
import Team, { ITeam } from '../src/models/Team';
import Ladder, { ILadder } from '../src/models/Ladder';
import User, { IUser } from '../src/models/User';
import Game, { IGame } from '../src/models/Game';


describe('Team Model', () => {
  let game: IGame;
  let playersID: any = [];
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/outmatchgamingtest', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });

    // create game object with a ladder to be used as property for team tests
    game = await new Game({
      name: "Modern Warfare 2019",
      platform: "PS4",
      ladders: [{
        name: "1v1 Gunfight",
        maxPlayers: 2
      }]
    }).save();


    // create user id array to be used for 'players' property
    let user: IUser = new User({
      username: 'eddy',
      fullEmail: 'adnansumra115@gmail.com',
      password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G'
    });

    user = await user.save();
    playersID.push(user._id);
  });

  afterEach(async () => {
    mongoose.connection.db.dropDatabase();
  });


  it('should create team', async () => {
    const newTeam: ITeam = new Team({
      name: '100 Theives',
      ladderId: game.ladders[0]._id
    });

    const error = newTeam.validateSync();
    console.log(error);
    expect(error).to.equal(undefined);
  });

  describe('name field test', () => {
    it('must have length 3 or greater', () => {
      const newTeam: ITeam = new Team({
        name: 'ab',
        ladderId: game.ladders[0]._id
      });
  
      // test size 2
      let error = newTeam.validateSync();
      expect(error).to.not.equal(undefined);

      // test size 3
      newTeam.name = 'abc'
      error = newTeam.validateSync();
      expect(error).to.equal(undefined);
    });

    it('must have length 16 or smaller', () => {
      const newTeam: ITeam = new Team({
        name: 'thisTeamNameis17s',
        ladderId: game.ladders[0]._id
      });
  
      // test size 17
      let error = newTeam.validateSync();
      expect(error).to.not.equal(undefined);

      // test size 16
      newTeam.name = 'thisTeamNameis16'
      error = newTeam.validateSync();
      expect(error).to.equal(undefined);

    });
  });

  describe('ladder field test', () => {
    it('must be a existing ladder', async () => {
      const newTeam: ITeam = new Team({
        name: '100 Theives',
        ladderId: '5e4d918a666a08d3cc721ed0',
      });

      try {
        const error = await newTeam.validate();
        if (error === undefined) {
          expect(error).to.not.equal(undefined);
        }
      } catch(err) {
        expect(err.errors.ladderId.message).to.equal('Validator failed for path `ladderId` with value `5e4d918a666a08d3cc721ed0`');
      }
    });
  });

  // fix test for array
   describe('players field test', () => {
    it('all players must exist', async () => {
      const newTeam: ITeam = new Team({
        name: '100 Theives',
        ladderId: game.ladders[0]._id,
        playersId: ['5e4d918a666a08d3cc721ed']
      });

      try {
        const error = await newTeam.validate();
        if (error === undefined) {
          expect(error).to.not.equal(undefined);
        }
      } catch(err) {
        expect(err.message).to.equal(`team validation failed: playersId: Cast to Array failed for value "[ '5e4d918a666a08d3cc721ed' ]" at path "playersId"`);
      }
    });
  }); 

  describe('points field test', () => {
    it('accepts positive values', () => {
      let team: ITeam = new Team({
        name: '100 Theives',
        ladderId: game.ladders[0]._id,
        points: 0,
      });

      let error = team.validateSync();
      expect(error).to.equal(undefined);
    });

    it('must not be negative', () => {
      let user: ITeam = new Team({
        name: '100 Theives',
        ladderId: game.ladders[0]._id,
        points: -1,
      });

      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });
  });
});