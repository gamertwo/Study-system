import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const CategoryRadarChart = ({ tasks, categories }) => {
  const categoryData = categories.map(category => {
    const categoryTasks = tasks.filter(task => task.category && task.category._id === category._id);
    const completionRate = categoryTasks.length > 0
      ? categoryTasks.filter(task => task.completed).length / categoryTasks.length
      : 0;

    return {
      subject: category.name,
      A: completionRate * 100,
      fullMark: 100,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={categoryData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Completion Rate (%)" dataKey="completionRate" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CategoryRadarChart;
