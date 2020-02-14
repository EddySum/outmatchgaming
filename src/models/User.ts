import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string;
  psnUser: string;
  rank: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String, 
    required: true,
    minlength: 3,
    maxlength: 16,
    validate: {
      validator: (username: string) => {
        // regex: checks alphanumeric. '_' only in middle of string
        if (!/^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/.test(username)) {
          throw new Error(`${username} is not a valid username. Please use letters, numbers and '_'`);
        }
        return true;
      }
    }
  },
  psnUser: {
    type: String, 
    minlength: 3,
    maxlength: 16,
    validate: {
      validator: (username: string) => {
        // regex: validates for letter, numbers, hyphens, underscores, hyphens 
        if (!/^[a-z0-9_-]{3,16}$/.test(username)) {
          throw new Error(`${username} is not a valid username. Please use letters, numbers, underscores and hyphens`);
        }
        return true;
      }
    }
  }, 
  xboxUser: String,
  points: Number
  //teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}] /* uncomment once teams schema is created */
});

const User = mongoose.model<IUser>('user', userSchema);

export default User;