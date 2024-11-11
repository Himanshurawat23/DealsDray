import React from 'react';
import Navbar from './shared/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Welcome to the Admin Panel</h1>
      </div>
    </div>
  );
};

export default Dashboard;
