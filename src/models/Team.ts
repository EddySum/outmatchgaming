import mongoose, {Schema, Document } from 'mongoose';
import Game from './Game';
import User from './User';

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
  ladderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ladder',
    required: true,
    validate: {
      // ensure the ladder id exists in db
      validator: async (id: mongoose.Schema.Types.ObjectId) => {
        return await Game.exists( {"ladders._id": id} );
      }
    }
  },
  playersId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    validate: {
      // ensure the array of ids exist in db. Fix later
      validator: async (ids: [mongoose.Schema.Types.ObjectId]) => {

        for (const id of ids) {
          const exists = await User.exists({ _id: id });
          if (exists == false) {
            throw new Error(`No existng player with id: ${id}`);
          }
        }

        return true;
      }
    }
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