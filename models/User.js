const mongoose  = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fitness-activity'
    }
  ]
});

module.exports = mongoose.model('fitness-user', UserSchema);
