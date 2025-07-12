import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/employees')
      .then(res => setEmployees(res.data))
      .catch(() => alert('Failed to fetch employees'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await API.delete(`/employees/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2>Employee List</h2>
        <Link to="/add" className="add-btn">+ Add Employee</Link>
        {loading ? (
          <p>Loading...</p>
        ) : employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <Link to={`/employee/${emp._id}`}>View</Link>
                    <Link to={`/edit/${emp._id}`}>Edit</Link>
                    <button onClick={() => handleDelete(emp._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Dashboard;
