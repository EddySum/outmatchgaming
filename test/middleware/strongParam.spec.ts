import { expect } from "chai"
import httpMocks from "node-mocks-http";
import sinon from "sinon";

import { strongParam } from "../../src/middleware/strongParam"

describe('Strong Param Middleware', () => {
  let req: any, res: any, next :any;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/strongparamtest'
    });

    res = httpMocks.createResponse();

    next = sinon.spy();
  });
  
  it('should move strong params to response.locals', () => {
    const expectedParams = {
      name: 'string',
      points: 'number',
      exists: 'boolean'
    }

    const strongParamMW = strongParam(expectedParams);

    req.body = {
      name: 'eddy',
      points: 35,
      exists: false
    }

    strongParamMW(req, res, next);

    expect(res.locals.name).not.undefined;
    expect(res.locals.points).not.undefined;
    expect(res.locals.exists).not.undefined;
  });

  it('should call next function', () => {
    const expectedParams = {
      name: 'string',
      points: 'number',
      exists: 'boolean'
    }

    const strongParamMW = strongParam(expectedParams);

    req.body = {
      name: 'eddy',
      points: 35,
      exists: false
    }

    strongParamMW(req, res, next);
    
    expect(next.calledOnce).to.equal(true);
  });

  it('should only permit the correct params', () => {
    const expectedParams = {
      name: 'string',
      points: 'number',
      exists: 'boolean'
    }

    const strongParamMW = strongParam(expectedParams);

    req.body = {
      name: 'ed',
      points: '5',
      exists: 1
    }

    strongParamMW(req, res, next);

    expect(res.locals.name).not.undefined;
    expect(res.locals.points).undefined;
    expect(res.locals.exists).undefined;
  });

  it('should not move null name field to response.locals', () => {
    const expectedParams = {
      name: 'string'
    }

    const strongParamMW = strongParam(expectedParams);

    req.body = {
      name: null
    }

    strongParamMW(req, res, next);

    expect(res.locals.name).undefined;
  });

  it('should not let numbers be accepted in a boolean field', () => {
    const expectedParams = {
      exists: 'boolean'
    }

    const strongParamMW = strongParam(expectedParams);

    req.body = {
      exists: 1
    }

    strongParamMW(req, res, next);

    expect(res.locals.exists).undefined;
  });

  it('should not let booleans be accepted in a number field', () => {
    const expectedParams = {
      points: 'number'
    }

    const strongParamMW = strongParam(expectedParams);

    req.body = {
      points: true
    }

    strongParamMW(req, res, next);

    expect(res.locals.points).undefined;
  });
});