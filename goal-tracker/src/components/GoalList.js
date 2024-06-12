import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [target, setTarget] = useState('');

  const fetchGoals = async () => {
    try {
      const response = await axiosInstance.get('/goals');
      setGoals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axiosInstance.delete(`/goals/${id}`);
      fetchGoals(); // Refresh the goals list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (goal) => {
    setEditingGoal(goal._id);
    setTitle(goal.title);
    setDescription(goal.description);
    setEndDate(goal.endDate);
    setTarget(goal.target);
  };

  const cancelEditing = () => {
    setEditingGoal(null);
    setTitle('');
    setDescription('');
    setEndDate('');
    setTarget('');
  };

  const updateGoal = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/goals/${editingGoal}`, {
        title,
        description,
        endDate,
        target
      });
      fetchGoals();
      cancelEditing();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div>
      {goals.map(goal => (
        <div key={goal._id}>
          {editingGoal === goal._id ? (
            <form onSubmit={updateGoal}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
              <button type="submit">Update Goal</button>
              <button type="button" onClick={cancelEditing}>Cancel</button>
            </form>
          ) : (
            <>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
              <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
              <p>Target: {goal.target}</p>
              <p>Progress: {goal.progress}</p>
              <button onClick={() => startEditing(goal)}>Edit</button>
              <button onClick={() => deleteGoal(goal._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default GoalList;
