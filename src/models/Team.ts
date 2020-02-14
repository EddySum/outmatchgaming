import mongoose, {Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  ladder: mongoose.Schema.Types.ObjectId
  players: [mongoose.Schema.Types.ObjectId]
  points: number; 
}

const teamSchema: Schema = new Schema({
  name: {
    type: String
  },
  ladder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ladder',
    required: true
  },
  players: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  points: {
    type: Number
  }
});

const Team = mongoose.model<ITeam>('team', teamSchema);

export default Team;