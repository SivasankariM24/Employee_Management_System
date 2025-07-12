const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const employeeController = require('../controllers/employeeController');

router.post('/', auth, employeeController.createEmployee);
router.get('/', auth, employeeController.getEmployees);
router.get('/:id', auth, employeeController.getEmployee);
router.put('/:id', auth, employeeController.updateEmployee);
router.delete('/:id', auth, employeeController.deleteEmployee);

module.exports = router;
