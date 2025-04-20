import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import api from '../services/api';
import '../App.css';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9966CC'];

const Dashboard = () => {
  const [data, setData] = useState({
    total: 0,
    active: 0,
    departments: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/dashboard');
      setData(res.data);
    };
    fetchData();
  }, []);

  const departmentData = Object.entries(data.departments).map(([key, value]) => ({
    name: key,
    value
  }));

  return (
    <div style={{ padding: '1rem' }}>
      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="bg-dark-subtle">
            <Statistic
              title={<span style={{ color: 'black' }}>Total Students</span>}
              value={data.total}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="bg-dark-subtle">
            <Statistic
              title={<span style={{ color: 'black' }}>Active Students</span>}
              value={data.active}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card className="bg-dark-subtle">
            <Statistic
              title={<span style={{ color: 'black' }}>Departments</span>}
              value={Object.keys(data.departments).length}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="mt-3">
        <Col xs={24} md={12}>
          <Card className="bg-dark-subtle" title="Department-wise Distribution (Pie)">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {departmentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="bg-dark-subtle" title="Department-wise Distribution (Bar)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
