import React from 'react';
import { LineChart as LineChartLib, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#FF1493'];

export const LineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChartLib data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="date" stroke="#00FFFF" />
        <YAxis stroke="#00FFFF" />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #00FFFF' }}
          itemStyle={{ color: '#00FFFF' }}
        />
        <Legend wrapperStyle={{ color: '#00FFFF' }} />
        <Line 
          type="monotone" 
          dataKey="completedTasks" 
          stroke="#FF00FF" 
          activeDot={{ r: 8, fill: '#FFFF00' }} 
          strokeWidth={2}
        />
      </LineChartLib>
    </ResponsiveContainer>
  );
};
