import { expect } from 'chai';
import mongoose from 'mongoose';
import User, { IUser } from '../src/models/User';

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

 

  describe('Username field unit test', () => {
    it('Should store the user', () => {
      const user: IUser = new User({
        username: "Eddy_Sumra",
      });
  
      const error = user.validateSync();
      expect(error).to.equal(undefined);
    });

    it('Should have length bigger than 3', () => {
      let user: IUser = new User({
        username: "Ed",
      });
      
      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });

    it('Should have length smaller than 16', () => {
      let user: IUser = new User({
        username: "ThisNameIs17chars",
      });
      
      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });

    it('Should only consist of alphanumeric and `_`', () => {
      let user: IUser = new User({
        username: "E@%$#@",
      });
      
      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });


  });

});