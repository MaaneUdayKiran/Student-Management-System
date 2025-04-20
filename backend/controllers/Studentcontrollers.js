// CommonJS syntax
const Student = require('../models/Student.cjs');

// Destructure Mongoose methods from Student model
const { find, findById, findByIdAndUpdate, findByIdAndDelete } = Student;

// Controller functions
async function getAllStudents(req, res) {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
}

async function getStudentById(req, res) {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
}

async function createStudent(req, res) {
  // const existingStudent = await Student.findOne({ studentId: req.body.studentId });

  const existingStudent = await Student.findOne({ studentId: req.body.studentId });
  if (existingStudent) {
    return res.status(400).json({ message: "Student with this ID already exists." });
  }
  
  const existingEmail = await Student.findOne({ email: req.body.email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists." });
  }
  

  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
}

async function updateStudent(req, res) {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}

async function deleteStudent(req, res) {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
}





async function getDashboardData(req,res){
  try {
    const students = await Student.find();
    const total = students.length;
    const active = students.filter(s => s.isActive).length;

    const departments = {};
    students.forEach(s => {
      departments[s.department] = (departments[s.department] || 0) + 1;
    });

    res.json({ total, active, departments });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }

}

// ✅ Export all functions (CommonJS)
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardData
};
