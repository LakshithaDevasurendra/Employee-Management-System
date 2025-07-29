// src/App.tsx
import React from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management System</h1>
      </header>
      <main>
        <section>
          <h2>Employees</h2>
          <EmployeeList />
        </section>
        <section>
          <h2>Departments</h2>
          <DepartmentList />
        </section>
      </main>
    </div>
  );
}

export default App;