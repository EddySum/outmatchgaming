import mongoose, {Schema, Document } from 'mongoose';
import Ladder from './Ladder';

export interface ITeam extends Document {
  name: string;
  ladder: mongoose.Schema.Types.ObjectId
  players: [mongoose.Schema.Types.ObjectId]
  points: number; 
}

const teamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name: string) => {
        if (name.length < 3 || name.length > 16) {
          throw new Error(`${name} is not a valid team name. Plese keep name size must between 3 and 16`);
        }  
        return true;
      }
    }
  },
  ladder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ladder',
    required: true,
   /*  validate: {
      validator: (id: mongoose.Schema.Types.ObjectId) => {
          Ladder.exists({ _id: id }).then((exists) => {
            console.log(exists);
            return Promise.resolve(exists);
          }).catch(() => {
            Promise.resolve(false);
          });

          return true
      }
    } */
  },
  players: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    // needs async validator
  },
  points: {
    type: Number,
    validate: {
      validator: (number: number) => {
        if (number < 0) {
          throw new Error(`number must be greater than 0`);
        }
        return true;
      }
    }
  }
});

const Team = mongoose.model<ITeam>('team', teamSchema);

export default Team;