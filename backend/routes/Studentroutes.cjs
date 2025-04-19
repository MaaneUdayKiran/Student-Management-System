const express = require('express');
const router = express.Router();
const studentController = require('../controllers/Studentcontrollers.js');

router.get('/', studentController.getAllStudents);
router.get('/dashboard', studentController.getDashboardData); // 👈 define this first

router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);


// router.get('/:id', studentController.getStudentById);

// GET /dashboard


module.exports = router;
