import User from '../models/User';
import Session from '../models/Session'
import {authenticate} from '../middleware/auth'
import {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';

import { strongParam } from '../middleware/strongParam';

const router = Router();
const saltRounds = 3; // 12+ for production. Will be used in register route
let strongParamConfig: { [key: string]: string; };

strongParamConfig = {fullEmail: 'string', password: 'string'}
//TODO: Need to add something to ensure multiple session are not created per user. 
router.post('/login', [strongParam(strongParamConfig)], async (req: Request, res: Response) => {
  const {fullEmail} = res.locals;

  const [email, domain]: string[] = fullEmail.split('@');
  const user = await User.findOne({email, domain});

  if (user) {
    const passMatched = await bcrypt.compare(res.locals.password, user.password);
    if (passMatched) {
      const session = await Session.create({userID: user?._id});
      res.cookie('session', session._id, { signed: true, httpOnly: true });
      
      return res.sendStatus(200);
    }
  }

  return res.send(400);
});

strongParamConfig = {}
router.post('/logout', [strongParam(strongParamConfig)], async (req: Request, res: Response) => {
  if (req.signedCookies && req.signedCookies['session']) {
    const session = await Session.findByIdAndDelete(req.signedCookies['session']);
    res.clearCookie('session');
    if (session) {
      return res.sendStatus(200);
    }
  }
  return res.sendStatus(400);
});

router.get('/info', [authenticate], async (req: Request, res: Response) => {
  const userID = res.locals.userID
  
  const user = await User.findById(userID);
  const userInfo = {
    username: user?.username,
    email: user?.fullEmail,
  }

  return res.json(userInfo);
});

module.exports = router;