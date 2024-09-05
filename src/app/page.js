'use client';

import Link from 'next/link';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import "./globals.css";

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen bg-gray-900 text-white`}>
      <main className="flex-grow">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="container mx-auto grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Master Your Studies with Smart Task Management
              </h1>
              <p className="max-w-[600px] text-xl md:text-2xl font-medium">
                Elevate your academic performance with our advanced task manager designed for students. Stay organized, focused, and achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tasks"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-full bg-white text-blue-600 hover:bg-gray-200 transition-colors duration-300"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <LineChart className="w-full max-w-lg aspect-[4/3]" />
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 lg:py-40 bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl md:text-5xl">
              Visualize Your Academic Journey
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-700 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                <LineChart className="w-full aspect-[4/3] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Task Completion Trends</h3>
                <p className="text-gray-400">
                  Track your progress over time and identify patterns in your productivity.
                </p>
              </div>
              <div className="bg-gray-700 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                <BarChart className="w-full aspect-[4/3] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Time Allocation</h3>
                <p className="text-gray-400">
                  Understand how you're spending your time across different subjects and tasks.
                </p>
              </div>
              <div className="bg-gray-700 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                <LineChart className="w-full aspect-[4/3] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Productivity Insights</h3>
                <p className="text-gray-400">
                  Gain valuable insights into your most productive times and habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-32 lg:py-40 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl md:text-5xl">
              Powerful Features for Academic Success
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: CalendarIcon, title: 'Smart Scheduling', description: 'Optimize your study schedule with intelligent task allocation.' },
                { icon: CheckIcon, title: 'Progress Tracking', description: 'Monitor your task completion and academic progress in real-time.' },
                { icon: SignalIcon, title: 'Priority Management', description: 'Focus on what matters most with our priority setting feature.' },
                { icon: ChartBarIcon, title: 'Performance Analytics', description: 'Gain insights into your study habits and improve your efficiency.' },
                { icon: ClockIcon, title: 'Time Management', description: 'Track time spent on tasks and improve your time management skills.' },
                { icon: TagIcon, title: 'Custom Categories', description: 'Organize your tasks with custom categories tailored to your courses.' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:scale-105"
                >
                  <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 lg:py-40 bg-gray-800">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-8 sm:text-4xl md:text-5xl">
              Join the Student Task Manager Community
            </h2>
            <p className="max-w-[600px] mx-auto text-xl md:text-2xl font-medium mb-12">
              Unlock your full academic potential and connect with like-minded students who are committed to success.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>&copy; 2023 Student Task Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'Desktop',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 },
            ],
          },
          {
            id: 'Mobile',
            data: [
              { x: 'Jan', y: 60 },
              { x: 'Feb', y: 48 },
              { x: 'Mar', y: 177 },
              { x: 'Apr', y: 78 },
              { x: 'May', y: 96 },
              { x: 'Jun', y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{ tickSize: 0, tickPadding: 16 }}
        axisLeft={{ tickSize: 0, tickValues: 5, tickPadding: 16 }}
        colors={['#2563eb', '#e11d48']}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: { borderRadius: '9999px' },
            container: { fontSize: '12px', textTransform: 'capitalize', borderRadius: '6px' },
          },
          grid: { line: { stroke: '#1f2937' } },
        }}
        role="application"
      />
    </div>
  );
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: 'Jan', count: 111 },
          { name: 'Feb', count: 157 },
          { name: 'Mar', count: 129 },
          { name: 'Apr', count: 150 },
          { name: 'May', count: 119 },
          { name: 'Jun', count: 72 },
        ]}
        keys={['count']}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={['#2563eb']}
        axisBottom={{ tickSize: 0, tickPadding: 16 }}
        axisLeft={{ tickSize: 0, tickValues: 4, tickPadding: 16 }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: { borderRadius: '9999px' },
            container: { fontSize: '12px', textTransform: 'capitalize', borderRadius: '6px' },
          },
          grid: { line: { stroke: '#1f2937' } },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SignalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>
  );
}

function ChartBarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
