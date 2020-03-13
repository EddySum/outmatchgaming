import { expect } from "chai"
import httpMocks from "node-mocks-http";
import sinon from "sinon";
import mongoose from "mongoose"
import { authenticate } from "../../src/middleware/auth";
import User, { IUser } from "../../src/models/User";
import Session, { ISession } from "../../src/models/Session";

describe('Strong Param Middleware', () => {
  let req: any, res: any, next :any;
  let user: IUser, session: ISession;

  before(() => {
    mongoose.connect('mongodb://localhost:27017/outmatchgamingtest', {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
  });

  beforeEach(async () => {
    const userData: IUser = new User({
      username: "Eddy_Sumra",
      fullEmail: "eddy@gmail.com",
      password: '$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G'
    });

    user = await userData.save();

    const sessionData: ISession = new Session({
      userID: user._id
    });

    session = await sessionData.save();

    req = httpMocks.createRequest({
      method: 'GET',
      url: '/authmiddlewaretest',
      signedCookies: {session: session._id}
    });

    res = httpMocks.createResponse();

    next = sinon.spy();
  });

  afterEach(() => {
    mongoose.connection.db.dropDatabase();
  });

  it('should set userID given session id', async () => {
    await authenticate(req, res, next);

    expect(res.locals.userID).to.deep.equal(user._id);
  });

  it('should call next function', async () => {
    await authenticate(req, res, next);

    expect(next.calledOnce).to.equal(true);
  });

  it('should not set userID given deleted sessionID ', async () => {
    req.signedCookies['session'] = session._id;
    await Session.findByIdAndDelete(session._id);
    
    await authenticate(req, res, next);

    expect(res.locals.userID).to.equal(undefined);
  });

  it('should not set userID given invalid session id', async () => {
    req.signedCookies['session'] = 'aaaaaaaaaaaaaaaaaaaaaaaa';
                                    
    await authenticate(req, res, next);

    expect(res.locals.userID).to.equal(undefined);
  });

  it('should not set userID given no session id', async () => {
    req.signedCookies = {};

    await authenticate(req, res, next);

    expect(res.locals.userID).to.equal(undefined);
  });

  it('should not set a userID given userID for session cookie', async () => {
    req.signedCookies['session'] = user._id;

    await authenticate(req, res, next);

    expect(res.locals.userID).to.equal(undefined);
  });
});