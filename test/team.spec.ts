import { expect, assert } from 'chai';
import mongoose from 'mongoose';
import Team, { ITeam } from '../src/models/Team';
import Ladder, { ILadder } from '../src/models/Ladder';
import User, { IUser } from '../src/models/User';


describe('Team Model', () => {
  let ladder: ILadder;
  let playersID: any = [];
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/outmatchgamingtest', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });

    // create ladder object to be as property for team tests
    ladder = new Ladder({
      name: 'Doubles Ladder',
      maxTeamSize: 2
    });

    ladder = await ladder.save();

    // create user id array to be used for 'players' property
    let user: IUser = new User({
      username: 'eddy',
      fullEmail: 'adnansumra115@gmail.com'
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
      ladder: ladder._id
    });

    const error = newTeam.validateSync();
    expect(error).to.equal(undefined);
  });

  describe('name field test', () => {
    it('must have length 3 or greater', () => {
      const newTeam: ITeam = new Team({
        name: 'ab',
        ladder: ladder._id
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
        ladder: ladder._id
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
        ladder: '5e4d918a666a08d3cc721ed0',
      });

      try {
        const error = await newTeam.validate();
        if (error === undefined) {
          expect(error).to.not.equal(undefined);
        }
      } catch(err) {
        expect(err.errors.ladder.message).to.equal('Validator failed for path `ladder` with value `5e4d918a666a08d3cc721ed0`');
      }
    });
  });

  // fix test for array
  /* describe('players field test', () => {
    it('all players must exist', async () => {
      const newTeam: ITeam = new Team({
        name: '100 Theives',
        ladder: ladder._id,
        players: ['5e4d918a666a08d3cc721ed0']
      });

      try {
        const error = await newTeam.validate();
        if (error === undefined) {
          expect(error).to.not.equal(undefined);
        }
      } catch(err) {
        console.log(err.message);
        expect(err.message).to.equal('team validation failed: players: Validator failed for path `players` with value `5e4d918a666a08d3cc721ed0`');
      }
    });
  }); */

  describe('points field test', () => {
    it('accepts positive values', () => {
      let team: ITeam = new Team({
        name: '100 Theives',
        ladder: ladder._id,
        points: 0,
      });

      let error = team.validateSync();
      expect(error).to.equal(undefined);
    });

    it('must not be negative', () => {
      let user: ITeam = new Team({
        name: '100 Theives',
        ladder: ladder._id,
        points: -1,
      });

      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });
  });
});