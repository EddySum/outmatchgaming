import { expect } from 'chai';
import mongoose from 'mongoose';
import User from '../src/models/User';

describe ('User model', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/outmatchgaming', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
  });

  afterEach(async () => {
    mongoose.connection.close();
  });

  it('should throw validation error', () => {
    const user = new User();

    expect(user.validate).throw();
  });

});