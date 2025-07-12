import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    salary: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch employee data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      API.get(`/employees/${id}`)
        .then(res => setForm(res.data))
        .catch(() => alert('Failed to fetch employee'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await API.put(`/employees/${id}`, form);
        alert('Employee updated!');
      } else {
        await API.post('/employees', form);
        alert('Employee added!');
      }
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          type="number"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
