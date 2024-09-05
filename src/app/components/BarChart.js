import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PriorityBarChart = ({ tasks }) => {
  const priorityData = ['low', 'medium', 'high'].map(priority => ({
    priority,
    count: tasks.filter(task => task.priority === priority).length
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={priorityData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="priority" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriorityBarChart;
