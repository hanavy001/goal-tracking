import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const GoalForm = ({ fetchGoals }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/goals', { title, description, endDate, target });
      fetchGoals();
      setTitle('');
      setDescription('');
      setEndDate('');
      setTarget('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <input type="number" placeholder="Target" value={target} onChange={(e) => setTarget(e.target.value)} required />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default GoalForm;
