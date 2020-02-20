import { expect } from 'chai';
import mongoose from 'mongoose';
import Ladder, { ILadder } from '../src/models/Ladder';

describe('Ladder Model', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/outmatchgamingtest', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should save ladder', () => {
    const newLadder: ILadder = new Ladder({
      name: 'Doubles Ladder',
      maxTeamSize: 2
    });

    const error = newLadder.validateSync();
    expect(error).to.equal(undefined);
  });

  it('must have name', () => {
    const newLadder: ILadder = new Ladder({
      maxTeamSize: 2
    });

    const error = newLadder.validateSync();
    expect(error).to.not.equal(undefined);
  });

  it('must have max players', () => {
    const newLadder: ILadder = new Ladder({
      name: 'Doubles Ladder'
    });

    const error = newLadder.validateSync();
    expect(error).to.not.equal(undefined);
  });

});