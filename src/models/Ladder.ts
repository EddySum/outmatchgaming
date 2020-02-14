import mongoose, {Schema, Document } from 'mongoose';

export interface ILadder extends Document {
  name: string
  seasonStart: Date,
  seasonEnd: Date,
  maxPlayers: Number
}

const ladderSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  seasonStart: {
    type: Date
  },
  seasonEnd: {
    type: Date
  },
  maxPlayers: {
    type: Number,
    required: true
  }
});

const Ladder = mongoose.model<ILadder>('ladder', ladderSchema);

export default Ladder;



