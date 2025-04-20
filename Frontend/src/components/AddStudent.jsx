
import React from 'react';
import { useRef } from 'react';
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
  const studentIdRef = useRef(null); // 👈 create ref for Student ID input
  const emailRef = useRef(null);


  // const onFinish = async (values) => {
  //   const formattedValues = {
  //     ...values,
  //     dob: values.dob.format('YYYY-MM-DD'), // format date
  //   };
  //   try {
  //     await api.post('/', formattedValues);
  //     message.success('Student added successfully');
  //     navigate('/students');
  //   } catch (error) {
  //     message.error('Failed to add student');
  //   }
  // };
  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      dob: values.dob.format('YYYY-MM-DD'),
    };
  
    try {
      await api.post('/', formattedValues);
      message.success('Student added successfully');
      navigate('/students');
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message
      ) {
        const errorMsg = error.response.data.message;
    
        let fieldsWithErrors = [];
    
        if (errorMsg.includes('Student with this ID')) {
          fieldsWithErrors.push({
            name: 'studentId',
            errors: ['Student ID already exists.'],
          });
        }
    
        if (errorMsg.includes('Email')) {
          fieldsWithErrors.push({
            name: 'email',
            errors: ['Email already exists.'],
          });
        }
    
        form.setFields(fieldsWithErrors);
    
        // Focus on the first error field
        if (fieldsWithErrors.some(field => field.name === 'studentId')) {
          studentIdRef.current?.focus();
        } else if (fieldsWithErrors.some(field => field.name === 'email')) {
          emailRef.current?.focus();
        }
      } else {
        message.error('Failed to add student');
      }
    }
  };    
  

  return (
    <div className="container-fluid bg-white rounded-3 pr-md-4   add-student-form">
      <h2 className="mt-1 text-center pb-lg-1">Add Student</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600, maxHeight: '80vh', overflowY: 'auto' }}
        variant='outlined'
        
      >
        <Form.Item
          label="Student ID"
          name="studentId"
          rules={[{ required: true, message: 'Please enter Student ID' }]}
        >
        
        <Input ref={studentIdRef} />
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
          label="Email-id"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input ref={emailRef} />
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
          <Button  styles={{margin:"4px"}} type="primary" htmlType="submit">
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStudent;
