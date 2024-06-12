import React from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import axiosInstance from './utils/axiosInstance';

function App() {
  const fetchGoals = async () => {
    try {
      const response = await axiosInstance.get('/goals');
      console.log('Fetched goals:', response.data);
    } catch (error) {
      console.error('Error fetching goals:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Goal Tracker</h1>
      <GoalForm fetchGoals={fetchGoals} />
      <GoalList />
    </div>
  );
}

export default App;
