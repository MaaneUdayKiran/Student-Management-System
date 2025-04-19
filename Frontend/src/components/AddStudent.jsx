// // src/components/AddStudent.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import { toast } from 'react-toastify';


// const AddStudent = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     studentId: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     dob: '',
//     department: '',
//     enrollmentYear: '',
//     isActive: true
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await api.post('/', formData);
//     navigate('/students');
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Add Student</h2>
//       <form onSubmit={handleSubmit}>
//         {["studentId", "firstName", "lastName", "email", "dob", "department", "enrollmentYear"].map(field => (
//           <div className="mb-3" key={field}>
//             <label className="form-label">{field}</label>
//             <input
//               type={field === "dob" ? "date" : field === "email" ? "email" : "text"}
//               className="form-control"
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ))}
//         <div className="form-check mb-3">
//           <input
//             type="checkbox"
//             className="form-check-input"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//           />
//           <label className="form-check-label">Is Active</label>
//         </div>
//         <button type="submit" className="btn btn-success">Add</button>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;

// src/components/AddStudent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  message,
} from 'antd';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../App.css'

const { Option } = Select;

const AddStudent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      dob: values.dob.format('YYYY-MM-DD'), // format date
    };
    try {
      await api.post('/', formattedValues);
      message.success('Student added successfully');
      navigate('/students');
    } catch (error) {
      message.error('Failed to add student');
    }
  };

  return (
    <div className="container-fluid mt-1  bg-white w-50 rounded-3">
      <h2 className="mt-5 text-center">Add Student</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        variant='outlined'
      >
        <Form.Item
          label="Student ID"
          name="studentId"
          rules={[{ required: true, message: 'Please enter Student ID' }]}
        >
        
          <Input />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: 'Please select DOB' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select placeholder="Select Department">
            <Option value="Computer Science">Computer Science</Option>
            <Option value="Electronics">Electronics</Option>
            <Option value="Mechanical">Mechanical</Option>
            <Option value="Civil">Civil</Option>
            <Option value="IT">IT</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Enrollment Year"
          name="enrollmentYear"
          rules={[{ required: true, message: 'Please enter enrollment year' }]}
        >
          <InputNumber min={2000} max={2099} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Is Active"
          name="isActive"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>

        <Form.Item className="mb-5 btn1">
          <Button  styles={{margin:"4"}} type="primary" htmlType="submit">
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStudent;
