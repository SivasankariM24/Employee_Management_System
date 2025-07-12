import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(() => alert('Failed to fetch employee'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found.</p>;

  return (
    <>
      <Navbar />
      <div className="details-container">
        <h2>Employee Details</h2>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </>
  );
}

export default EmployeeDetails;
