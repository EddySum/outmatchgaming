import User from '../models/User';
import Session from '../models/Session'
import express, {Request, Response} from 'express';
import {authenticate} from '../middleware/auth'

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const {fullEmail} = req.body;


  //TODO: hash & password match
  const [email, domain]: string[] = fullEmail.split('@');
  const user = await User.findOne({email, domain});

  if (user) {
    const session = await Session.create({userID: user?._id});
    
    res.cookie('session', session._id, { signed: true, httpOnly: true });

    return res.sendStatus(200);
  }

  return res.sendStatus(400);
  
});

router.post('/logout', async (req: Request, res: Response) => {
  if (req.signedCookies && req.signedCookies['session']) {
    const session = await Session.findByIdAndDelete(req.signedCookies['session']);
    res.clearCookie('session');
    if (session) {
      return res.sendStatus(200);
    }
  }

  return res.sendStatus(400);
});


router.get('/userID', [authenticate], (req: Request, res: Response) => {
  console.log(res.locals.userID);
  res.send(res.locals.userID);
});

module.exports = router;