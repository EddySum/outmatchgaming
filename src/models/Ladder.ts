import mongoose, {Schema, Document } from 'mongoose';

export interface ILadder extends Document {
  name: string
  seasonStart: Date,
  seasonEnd: Date,
  maxPlayers: Number
}

export const ladderSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name: string) => {
        if (name.length < 3 || name.length > 16) {
          throw new Error(`${name} is not a valid ladder name. Plese keep name size must between 3 and 16`);
        }
        return true;
      }
    }
  },
  maxTeamSize: {
    type: Number,
    required: true,
  }
});

const Ladder = mongoose.model<ILadder>('ladder', ladderSchema);

export default Ladder;



