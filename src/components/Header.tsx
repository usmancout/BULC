import React from 'react';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <GraduationCap className="w-12 h-12 text-green-400 mr-3" />
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Bahria University GPA Calculator
        </h1>
      </div>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        Calculate your Grade Point Average using the standard 4-point university scale. 
        Add your courses, select grades and credit hours to get your GPA instantly.
      </p>
    </header>
  );
};

export default Header;