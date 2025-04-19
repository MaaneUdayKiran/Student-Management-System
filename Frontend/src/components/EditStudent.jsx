// // src/components/EditStudent.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import api from '../services/api';

// const EditStudent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(null);

//   useEffect(() => {
//     api.get(`/${id}`).then(res => setFormData(res.data));
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await api.put(`/${id}`, formData);
//     navigate('/students');
//   };

//   if (!formData) return <div className="container mt-4">Loading...</div>;

//   return (
//     <div className="container mt-15">
//       <h2>Edit Student</h2>
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
//         <button type="submit" className="btn btn-primary">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditStudent;

// src/components/EditStudent.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Select, Checkbox, Button, message } from 'antd';
import api from '../services/api';
import dayjs from 'dayjs';


const EditStudent = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/${id}`);
        const student = res.data;

        form.setFieldsValue({
          ...student,
          dob: student.dob ? dayjs(student.dob) : null,
        });
      } catch (error) {
        message.error('Failed to load student data');
      }
    };

    fetchStudent();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await api.put(`/${id}`, {
        ...values,
        dob: values.dob ? values.dob.toISOString() : null,
      });
      message.success('Student updated successfully');
      navigate('/students');
    } catch (error) {
      message.error('Update failed');
    }
  };

  return (
    <div className="container mt-4 w-50">
      <h2>Edit Student</h2>
      <Form
        layout="vertical"
        form={form}
        variant="outlined"
        style={{ maxWidth: 500 }}
        onFinish={onFinish}
      >
        <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
          <Input  />
        </Form.Item>

        <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="department" label="Department" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="CSE">CSE</Select.Option>
            <Select.Option value="ECE">ECE</Select.Option>
            <Select.Option value="EEE">EEE</Select.Option>
            <Select.Option value="IT">IT</Select.Option>
            <Select.Option value="MECH">MECH</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="enrollmentYear" label="Enrollment Year" rules={[{ required: true }]}>
          <InputNumber min={2000} max={2099} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>Is Active</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditStudent;
