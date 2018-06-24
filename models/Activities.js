const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: String,
  user: {
    username: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fitness-user'
    }
  },
  description: String,
  duration: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('fitness-activity', ActivitySchema);
