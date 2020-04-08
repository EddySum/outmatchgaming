import mongoose, {Schema, Document } from 'mongoose';
import { ILadder, ladderSchema } from './Ladder';

export interface IGame extends Document {
  name: string;
  platform: string;
  ladders: ILadder[];
}

const gameSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name: string) => {
        // simple regex for string size
        if (name.length < 3 || name.length > 25) {
          throw new Error(`${name} is not a valid name. Plese keep name size must between 3 and 25`);
        }
        return true;
      }
    }
  },
  platform: {
    type: String,
    required: true,
    validate: {
      validator: (platform: string) => {
        const platforms = ['PS4', 'XBOX ONE', 'PC', 'CROSSPLAY'];
        
        if (platforms.includes(platform)) return true;

        return false;
      }
    }

  },
  ladders: [ladderSchema]
});

const Game = mongoose.model<IGame>('game', gameSchema);

export default Game;