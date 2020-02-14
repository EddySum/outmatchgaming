import { expect } from 'chai';
import mongoose from 'mongoose';
import Team, { ITeam } from '../src/models/Team';
import Ladder, { ILadder } from '../src/models/Ladder';


describe('Team Model', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/outmatchgamingtest', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
  });

  afterEach(async () => {
    //mongoose.connection.db.dropDatabase();
  });


  it('should create team', async () => {
    let ladder: ILadder = new Ladder({
      name: 'Doubles Ladder',
      maxPlayers: 2
    });

    ladder = await ladder.save();
    
    const newTeam: ITeam = new Team({
      name: '100 Theives',
      ladder: ladder._id
    });

    const error = newTeam.validateSync();
    expect(error).to.equal(undefined);
  });


});