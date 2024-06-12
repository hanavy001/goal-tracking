// models/Goal.js
const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  target: { type: Number, required: true },
  progress: { type: Number, default: 0 }
});

module.exports = mongoose.model('Goal', GoalSchema);
