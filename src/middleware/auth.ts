import { Request, Response, NextFunction } from "express";
import Session from "../models/Session";

type AuthMiddlewareConfig = {
  graphql: boolean
}

const defaultConfig: AuthMiddlewareConfig = {
  graphql: false
}

export const authenticate = (config: AuthMiddlewareConfig = defaultConfig) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.signedCookies && req.signedCookies['session']) {
      const session = await Session.findById(req.signedCookies['session']);
      if (session) {
        res.locals.userID = session.userID;
        return next();
      }
    } else if (config.graphql) {
    res.locals.userID = null;
    return next();
    }
    
  return res.sendStatus(400);
  } 
}
