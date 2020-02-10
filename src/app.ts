import express, { Request, Response } from 'express';
import mongoose from 'mongoose'

/* Connect to Local MongoDB */
mongoose.connect('mongodb://localhost:27017/outmatchgaming', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', (err) => {
  console.log('Failed to connect MongoDB', err);
});

/* Configure Express application */
const app: express.Application = express(); 

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
}); 

app.listen(5000, () => {
  console.log('Server Start')
});
