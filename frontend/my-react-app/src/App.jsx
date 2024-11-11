import React from 'react';
import Signup from './components/auth/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/Employee/createEmployee';
import EmployeeList from './components/Employee/EmployeeList';
import Edit from './components/Employee/Edit';
import PrivateRoute from './components/PrivateRoute';  // Import the PrivateRoute component

const appRouter = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/create-employee',
    element: (
      <PrivateRoute>
        <CreateEmployee />
      </PrivateRoute>
    ),
  },
  {
    path: '/employee-list',
    element: (
      <PrivateRoute>
        <EmployeeList />
      </PrivateRoute>
    ),
  },
  {
    path: '/edit/:id',
    element: (
      <PrivateRoute>
        <Edit />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
