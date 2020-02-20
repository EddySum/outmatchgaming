import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string;
  psnUser: string;
  points: Number;
  email: String;
  domain: String;
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
        if (!(/^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/.test(username))) {
          throw new Error(`${username} is not a valid username. Please use letters, numbers and '_'`);
        }
        return true;
      }
    }
  },
  email: {
    type: String,
  },
  domain: {
    type: String
  },
  psnUser: {
    type: String, 
    minlength: 3,
    maxlength: 16,
    validate: {
      validator: (psnUser: string) => {
        // regex: validates for letter, numbers, hyphens, underscores, hyphens 
        if (!(/^[a-zA-Z0-9_-]*$/.test(psnUser))) {
          throw new Error(`${psnUser} is not a valid psnUser. Please use letters, numbers, underscores and hyphens`);
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
  },
});

// virtual will take full email as input and split apart into email and domain properties
userSchema.virtual("fullEmail")
.get(function(this: IUser) {
  return this.email + '@' + this.domain;
})
.set(function(this: IUser, fullEmail: string) {
  const [email, domain]: string[] = fullEmail.split('@');
  this.email = email;
  this.domain = domain;
});

const User = mongoose.model<IUser>('user', userSchema);

export default User;