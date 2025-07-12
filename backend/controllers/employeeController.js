const Employee = require('../models/Employee');
const { employeeValidation } = require('../middleware/validate');

exports.createEmployee = async (req, res) => {
  const { error } = employeeValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  const { name, email, role, salary } = req.body;
  try {
    const employee = new Employee({ name, email, role, salary });
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ msg: 'Employee not found' });
  res.json(employee);
};

exports.updateEmployee = async (req, res) => {
  const { error } = employeeValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!employee) return res.status(404).json({ msg: 'Employee not found' });
  res.json(employee);
};

exports.deleteEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ msg: 'Employee not found' });
  res.json({ msg: 'Employee deleted' });
};
