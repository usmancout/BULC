import React from 'react';
import { Trophy, BookOpen, Calculator } from 'lucide-react';
import { Course } from '../types/Course';

interface GPAResultProps {
  courses: Course[];
  gpa: number;
  totalCredits: number;
  totalQualityPoints: number;
}

const GPAResult: React.FC<GPAResultProps> = ({
  courses,
  gpa,
  totalCredits,
  totalQualityPoints
}) => {
  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-400';
    if (gpa >= 3.0) return 'text-blue-400';
    if (gpa >= 2.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGPALabel = (gpa: number) => {
    if (gpa >= 3.7) return 'Excellent';
    if (gpa >= 3.0) return 'Good';
    if (gpa >= 2.5) return 'Satisfactory';
    if (gpa >= 2.0) return 'Needs Improvement';
    return 'Poor';
  };

  if (courses.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Summary Table */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-4 bg-gray-800 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-400" />
            Course Summary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left py-3 px-4 text-gray-300">Course</th>
                <th className="text-center py-3 px-4 text-gray-300">Credits</th>
                <th className="text-center py-3 px-4 text-gray-300">Grade</th>
                <th className="text-center py-3 px-4 text-gray-300">Quality Points</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-white font-medium">Course {index + 1}</td>
                  <td className="text-center py-3 px-4 text-gray-300">{course.creditHours}</td>
                  <td className="text-center py-3 px-4 text-green-400 font-semibold">{course.grade}</td>
                  <td className="text-center py-3 px-4 text-gray-300">
                    {(course.creditHours * course.gradePoint).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GPA Result */}
      <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-6 md:p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
          <h3 className="text-2xl font-bold text-white">Your GPA</h3>
        </div>
        
        <div className="mb-6">
          <div className={`text-4xl md:text-6xl font-bold mb-2 ${getGPAColor(gpa)}`}>
            {gpa.toFixed(2)}
          </div>
          <div className={`text-lg md:text-xl font-semibold ${getGPAColor(gpa)}`}>
            {getGPALabel(gpa)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Calculator className="w-5 h-5 text-gray-400 mr-2" />
            </div>
            <div className="text-xl md:text-2xl font-bold text-white">{totalCredits}</div>
            <div className="text-sm text-gray-400">Total Credits</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-xl md:text-2xl font-bold text-green-400">{totalQualityPoints.toFixed(2)}</div>
            <div className="text-sm text-gray-400">Quality Points</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-xl md:text-2xl font-bold text-blue-400">{courses.length}</div>
            <div className="text-sm text-gray-400">Courses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAResult;