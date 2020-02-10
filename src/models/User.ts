import mongoose, { Schema } from 'mongoose'

const userSchema: Schema = new Schema({
  username: {type: String, required: true},
  rank: Number
  //teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}] /* uncomment once teams schema is created */
});

const User = mongoose.model('User', userSchema);

export default User;