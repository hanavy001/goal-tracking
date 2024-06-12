const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/goals', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Goal Model
const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  endDate: { type: Date, required: true },
  target: { type: Number, required: true },
  progress: { type: Number, default: 0 }
});

const Goal = mongoose.model('Goal', goalSchema);

// Routes
app.get('/api/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/goals', async (req, res) => {
  const { title, description, endDate, target } = req.body;
  try {
    const newGoal = new Goal({ title, description, endDate, target });
    const savedGoal = await newGoal.save();
    res.json(savedGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/goals/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, endDate, target } = req.body;
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(id, { title, description, endDate, target }, { new: true });
    res.json(updatedGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/goals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
