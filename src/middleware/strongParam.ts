import { Request, Response, NextFunction } from "express"

// enter expected object data for params
export const strongParam = (params: {[key:string]: string}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const weakParams = req.body;
    req.body = null; //ensure weak params are not used

    Object.entries(params).forEach(([key, expectedType]) => {
      const weakParamType = typeof weakParams[key];
    
      if (weakParamType === expectedType) {
        res.locals[key] = weakParams[key];
      }

    });
    next();
  } 
}
