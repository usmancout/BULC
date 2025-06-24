import React from 'react';
import { Info } from 'lucide-react';
import { gradeScale } from '../utils/gradeUtils';

const GradeScale: React.FC = () => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Info className="w-5 h-5 mr-2 text-green-400" />
          University 4-Point Grading Scale
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left py-3 px-4 text-gray-300">Grade</th>
              <th className="text-center py-3 px-4 text-gray-300">GPA Points</th>
              <th className="text-center py-3 px-4 text-gray-300">Marks Range</th>
            </tr>
          </thead>
          <tbody>
            {gradeScale.map((grade) => (
              <tr key={grade.grade} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="py-3 px-4 text-green-400 font-semibold">{grade.grade}</td>
                <td className="text-center py-3 px-4 text-white">{grade.point.toFixed(2)}</td>
                <td className="text-center py-3 px-4 text-gray-300">{grade.marksRange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeScale;