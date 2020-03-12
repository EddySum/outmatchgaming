import express, { Request, Response } from 'express';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

/* Setup enviroment variables */
dotenv.config();

/* Connect to Local MongoDB */
mongoose.connect('mongodb://localhost:27017/outmatchgaming', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,  
  useFindAndModify: false
});
mongoose.connection.on('error', (err) => {
  console.log('Failed to connect MongoDB', err);
});

/* Configure Express application */
const app: express.Application = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env['COOKIE_SECRET']));



const router = express.Router();

router.use('/users', require('./routes/user'));

app.use('', router);



app.listen(5000, () => {
  console.log('Server Start')
});
