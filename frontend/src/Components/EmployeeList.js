import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get('/employees').then(res => setEmployees(res.data));
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/employees/${id}`);
    setEmployees(employees.filter(emp => emp._id !== id));
  };

  return (
    <div>
      <Link to="/add">Add Employee</Link>
      <ul>
        {employees.map(emp => (
          <li key={emp._id}>
            {emp.name} - {emp.role}
            <Link to={`/employee/${emp._id}`}>View</Link>
            <Link to={`/edit/${emp._id}`}>Edit</Link>
            <button onClick={() => handleDelete(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
