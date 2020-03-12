import { expect } from 'chai';
import mongoose from 'mongoose';
import User, { IUser } from '../src/models/User';

describe ('User model', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/outmatchgamingtest', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('Should create the user', () => {
    const user: IUser = new User({
      username: "Eddy_Sumra",
      fullEmail: "eddy@gmail.com",
      password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G'
    });

    const error = user.validateSync();
    expect(error).to.equal(undefined);
  });
 
  describe('username field test', () => {
    it('must have length bigger than 3', () => {
      let user: IUser = new User({
        username: "Ed",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G'
      });
      
      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });

    it('must have length smaller than 17', () => {
      let user: IUser = new User({
        username: "ThisNameIs17chars",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G'
      });
      
      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });

    it('must only have alphanumeric and underscore', () => {
      let user: IUser = new User({
        username: "E@%$#@",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G'
      });
      
      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });
  });

  describe('email field test', () => {
    it('should have virtual email and domain', () => {
      const user: IUser = new User({
        username: "Eddy_Sumra",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G',
        fullEmail: "eddy@gmail.com"
      });
  
      expect(user.email).to.equal('eddy');
      expect(user.domain).to.equal('gmail.com');
    })
  });

  describe('psnUser field test', () => {
    it ('must have length 3 or greater ', () => {
      let user: IUser = new User({
        username: "Eddy",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G',
        psnUser: "py"
      });
      
      // test size 2
      let error = user.validateSync();
      expect(error).to.not.equal(undefined);

      // test size 3
      user.psnUser = "pyt"
      error = user.validateSync();
      expect(error).to.equal(undefined);
    });

    it ('must have length 16 or smaller', () => {
      let user: IUser = new User({
        username: "Eddy",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G',
        psnUser: "ThisNameIs17chars"
      });
      
      // test size 17
      let error = user.validateSync();
      expect(error).to.not.equal(undefined);

      // test size 16
      user.psnUser = "ThisNameIs16char"
      error = user.validateSync();
      expect(error).to.equal(undefined);
    });

    it ('must only have alphanumeric, underscores and hyphens', () => {
      let user: IUser = new User({
        username: "Eddy",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G',
        psnUser: "ed_sum-python"
      });
      
      // test valid underscores and hyphens
      let error = user.validateSync();
      expect(error).to.equal(undefined);

      // test bad psnUser string
      user.psnUser = "ed@$#@*g"
      error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });
  });

  describe('points field test', () => {
    it('accepts positive values', () => {
      let user: IUser = new User({
        username: "Eddy",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G',
        psnUser: "ed_sum-python",
        points: 0,
      });

      let error = user.validateSync();
      expect(error).to.equal(undefined);
    });

    it('must not be negative', () => {
      let user: IUser = new User({
        username: "Eddy",
        password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G',
        psnUser: "ed_sum-python",
        points: -1,
      });

      let error = user.validateSync();
      expect(error).to.not.equal(undefined);
    });
  });
});