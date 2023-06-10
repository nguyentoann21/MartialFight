import React from 'react';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Tooltip } from 'recharts';
import './chart.css'; // Import the CSS file

const AdminChart = () => {
  const dataBar = [
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
    { name: 'C', value: 15 },
    { name: 'D', value: 25 },
  ];

  const dataArea = [
    { name: 'Jan', value1: 100, value2: 200, value3: 150 },
    { name: 'Feb', value1: 150, value2: 220, value3: 180 },
    { name: 'Mar', value1: 200, value2: 250, value3: 210 },
    { name: 'Apr', value1: 180, value2: 200, value3: 170 },
    { name: 'May', value1: 250, value2: 300, value3: 280 },
    { name: 'Jun', value1: 300, value2: 350, value3: 320 },
  ];

  const dataPie = [
    { name: 'A', value: 30 },
    { name: 'B', value: 50 },
    { name: 'C', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="container">
      <h1>Charts</h1>
      <div className="chart-container">
        <div className="row">
          <div className="chart">
            <h2>Bar Chart</h2>
            <BarChart width={200} height={250} data={dataBar}>
              <Bar dataKey="value" fill="#8884d8" />
              <Tooltip />
            </BarChart>
          </div>
          <div className="chart">
            <h2>Pie Chart</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={dataPie}
                dataKey="value"
                fill="#8884d8"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#8884d8"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Tooltip />
              </Pie>
            </PieChart>
          </div>
        </div>
        <div className="row">
          <div className="chart">
            <h2>Area Chart</h2>
            <AreaChart width={600} height={200} data={dataArea}>
              <Area type="monotone" dataKey="value1" fill="#8884d8" stroke="#8884d8" />
              <Area type="monotone" dataKey="value2" fill="#82ca9d" stroke="#82ca9d" />
              <Area type="monotone" dataKey="value3" fill="#ffc658" stroke="#ffc658" />
              <Tooltip />
            </AreaChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChart;
