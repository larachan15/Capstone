const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  // Associates user by their ID
  // Reference the collection in the DB which is users
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  userProfile: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  },
  pronouns: {
    type: String
  },
  hometown: {
    type: String
  },
  interests: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
