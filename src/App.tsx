import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { Course } from './types/Course';
import { getGradePoint } from './utils/gradeUtils';
import Header from './components/Header';
import CourseTable from './components/CourseTable';
import GPAResult from './components/GPAResult';
import GradeScale from './components/GradeScale';
import Footer from './components/Footer';

interface GPAData {
  gpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  validCourses: Course[];
}

function App() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', creditHours: 0, grade: '', gradePoint: 0 }
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [gpaResult, setGpaResult] = useState<GPAData | null>(null);

  const addCourse = useCallback(() => {
    const newCourse: Course = {
      id: Date.now().toString(),
      creditHours: 0,
      grade: '',
      gradePoint: 0
    };
    setCourses(prev => [...prev, newCourse]);
    setGpaResult(null);
    setErrors([]);
  }, []);

  const removeCourse = useCallback((id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
    setGpaResult(null);
    setErrors([]);
  }, []);

  const updateCourse = useCallback((id: string, field: keyof Course, value: number | string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === id) {
        const updatedCourse = { ...course, [field]: value };
        if (field === 'grade') {
          updatedCourse.gradePoint = getGradePoint(value as string);
        }
        return updatedCourse;
      }
      return course;
    }));
    setGpaResult(null);
    setErrors([]);
  }, []);

  const validateCourses = useCallback(() => {
    const newErrors: string[] = [];
    const validCourses = courses.filter(course => course.creditHours > 0 && course.grade !== '');
    
    if (validCourses.length === 0) {
      newErrors.push('Please add at least one course with credit hours and grade selected.');
    }

    courses.forEach((course, index) => {
      if ((course.creditHours > 0 && !course.grade) || (!course.creditHours && course.grade)) {
        newErrors.push(`Course ${index + 1}: Please select both credit hours and grade.`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [courses]);

  const getCalculatedGPAData = useCallback((): GPAData => {
    const validCourses = courses.filter(course => course.creditHours > 0 && course.grade !== '');
    const totalQualityPoints = validCourses.reduce((sum, course) => 
      sum + (course.creditHours * course.gradePoint), 0
    );
    const totalCredits = validCourses.reduce((sum, course) => sum + course.creditHours, 0);
    
    return {
      gpa: totalCredits > 0 ? totalQualityPoints / totalCredits : 0,
      totalCredits,
      totalQualityPoints,
      validCourses
    };
  }, [courses]);

  const handleCalculateClick = useCallback(() => {
    if (validateCourses()) {
      const calculatedData = getCalculatedGPAData();
      setGpaResult(calculatedData);
    }
  }, [validateCourses, getCalculatedGPAData]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        <div className="space-y-8">
          {/* Course Input Section */}
          <CourseTable
            courses={courses}
            onUpdate={updateCourse}
            onRemove={removeCourse}
            onAdd={addCourse}
          />

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <ul className="text-red-400 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={handleCalculateClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center transform hover:scale-105 shadow-lg"
          >
            <Calculator className="w-6 h-6 mr-3" />
            Calculate My GPA
          </button>

          {/* GPA Results */}
          {gpaResult && errors.length === 0 && (
            <GPAResult
              courses={gpaResult.validCourses}
              gpa={gpaResult.gpa}
              totalCredits={gpaResult.totalCredits}
              totalQualityPoints={gpaResult.totalQualityPoints}
            />
          )}

          {/* Grade Scale Reference */}
          <GradeScale />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;