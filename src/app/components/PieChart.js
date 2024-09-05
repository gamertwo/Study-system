import React from 'react';
import { PieChart as PieChartLib, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#F5E6D3', '#A8D0E6', '#8D9B6A', '#F3A683', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

export const PieChart = ({ data }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const dataWithPercentage = data.map(entry => ({
    ...entry,
    percentage: ((entry.value / total) * 100).toFixed(2)
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChartLib>
        <Pie
          data={dataWithPercentage}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={60}
          fill="#8884d8"
          label={({ name, percentage }) => `${name}: ${percentage}%`}
          labelLine={false}
        >
          {dataWithPercentage.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name, props) => [`${value} (${props.payload.percentage}%)`, name]}
          contentStyle={{ backgroundColor: '#F5F5F5', border: '1px solid #D3D3D3' }}
          itemStyle={{ color: '#333333', fontFamily: 'Arial, sans-serif' }}
        />
        <Legend 
          wrapperStyle={{ color: '#333333', fontFamily: 'Arial, sans-serif' }}
        />
      </PieChartLib>
    </ResponsiveContainer>
  );
};
