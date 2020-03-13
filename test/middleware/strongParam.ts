import { expect } from "chai"
import httpMocks from "node-mocks-http";
import sinon from "sinon";

import { strongParam } from "../../src/middleware/strongParam"


describe('Strong Param Middleware', () => {
  
  it ('should create strong params', () => {
    const expectedParams = {
      name: 'string',
      points: 'number',
      exists: 'boolean'
    }

    const strongParamMW = strongParam(expectedParams);

    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/strongparamtest',
      body: {
        name: 'eddy',
        points: 35,
        exists: false
      }
    });

    let res = httpMocks.createResponse();

    const next = sinon.spy();

    strongParamMW(req, res, next);

    expect(res.locals.name).not.undefined;
    expect(res.locals.points).not.undefined;
    expect(res.locals.exists).not.undefined;
    
    expect(next.calledOnce).to.equal(true)
  });
});