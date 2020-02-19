import { expect, assert } from 'chai';
import mongoose from 'mongoose';
import Team, { ITeam } from '../src/models/Team';
import Ladder, { ILadder } from '../src/models/Ladder';


describe('Team Model', () => {
  let ladder: ILadder;
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/outmatchgamingtest', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });

    ladder = new Ladder({
      name: 'Doubles Ladder',
      maxTeamSize: 2
    });

    ladder = await ladder.save();
  });

  afterEach(async () => {
    //mongoose.connection.db.dropDatabase();
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

  /* describe('ladder field test', () => {
    it('must be a existing ladder', async () => {
      const newTeam: ITeam = new Team({
        name: '100 Theives',
        ladder: '5e4d918a666a08d3cc721ed0'
      });

      const error = await newTeam.validate();
      console.log(error);
      if (error !== undefined) {
        console.log(1);
        assert.ok(1);
      }
    });
  }); */


});