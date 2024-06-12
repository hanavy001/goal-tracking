// routes/goals.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Create a new goal
router.post('/', async (req, res) => {
  const newGoal = new Goal(req.body);
  try {
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
