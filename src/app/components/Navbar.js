import React from 'react';
import Link from 'next/link';
import { Home, CheckSquare, BarChart2, Clock } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray p-8 shadow-lg border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-blue-400 text-2xl font-bold flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200">
          <BarChart2 size={28} />
          <span>ProductiViz</span>
        </Link>
        <ul className="flex space-x-6">
          <NavItem href="/" icon={<Home size={20} />} text="Home" />
          <NavItem href="/tasks" icon={<CheckSquare size={20} />} text="Tasks" />
          <NavItem href="/space-rep" icon={<BarChart2 size={20} />} text="Space Repetition" />
          <NavItem href="/pomo" icon={<Clock size={20} />} text="Pomodoro" />
        </ul>
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, text }) => (
  <li>
    <Link 
      href={href} 
      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1 py-1 px-2 rounded-md hover:bg-gray-900"
    >
      {icon}
      <span>{text}</span>
    </Link>
  </li>
);

export default Navbar;