import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeesDisplay from './pages/EmployeesDisplay';
import FormPage from './pages/FormPage';

function App() {
  return (
      <Routes>
        <Route path="/edit/:id" element={<FormPage />} />
        <Route excat path="/register" element={<FormPage />} />
        <Route exact path="/" element={<EmployeesDisplay />} />
      </Routes>
  );
}

export default App;
