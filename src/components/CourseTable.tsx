import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Course } from '../types/Course';
import { gradeScale, creditHoursOptions } from '../utils/gradeUtils';

interface CourseTableProps {
  courses: Course[];
  onUpdate: (id: string, field: keyof Course, value: number | string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  onUpdate,
  onRemove,
  onAdd
}) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Course Information</h2>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Course</th>
              <th className="text-center py-3 px-4 text-gray-300 font-semibold">Credit Hours</th>
              <th className="text-center py-3 px-4 text-gray-300 font-semibold">Grade</th>
              <th className="text-center py-3 px-4 text-gray-300 font-semibold">Quality Points</th>
              <th className="text-center py-3 px-4 text-gray-300 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="py-3 px-4 text-white font-medium">
                  Course {index + 1}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={course.creditHours || ''}
                    onChange={(e) => onUpdate(course.id, 'creditHours', parseInt(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select</option>
                    {creditHoursOptions.map(credit => (
                      <option key={credit} value={credit}>
                        {credit}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={course.grade || ''}
                    onChange={(e) => onUpdate(course.id, 'grade', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select</option>
                    {gradeScale.map(gradeItem => (
                      <option key={gradeItem.grade} value={gradeItem.grade}>
                        {gradeItem.grade}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4 text-center text-green-400 font-semibold">
                  {course.grade && course.creditHours 
                    ? (course.creditHours * course.gradePoint).toFixed(2)
                    : '-'
                  }
                </td>
                <td className="py-3 px-4 text-center">
                  {courses.length > 1 && (
                    <button
                      onClick={() => onRemove(course.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      aria-label="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {courses.map((course, index) => (
          <div key={course.id} className="p-4 border-b border-gray-700 last:border-b-0">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">Course {index + 1}</h3>
              {courses.length > 1 && (
                <button
                  onClick={() => onRemove(course.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  aria-label="Remove course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Credit Hours
                </label>
                <select
                  value={course.creditHours || ''}
                  onChange={(e) => onUpdate(course.id, 'creditHours', parseInt(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select credits</option>
                  {creditHoursOptions.map(credit => (
                    <option key={credit} value={credit}>
                      {credit} {credit === 1 ? 'Credit' : 'Credits'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Grade
                </label>
                <select
                  value={course.grade || ''}
                  onChange={(e) => onUpdate(course.id, 'grade', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select grade</option>
                  {gradeScale.map(gradeItem => (
                    <option key={gradeItem.grade} value={gradeItem.grade}>
                      {gradeItem.grade} ({gradeItem.point.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {course.grade && course.creditHours && (
                <div className="pt-2 border-t border-gray-700">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Quality Points:</span>
                    <span className="text-green-400 font-semibold">
                      {course.creditHours} × {course.gradePoint.toFixed(2)} = {(course.creditHours * course.gradePoint).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <button
          onClick={onAdd}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseTable;