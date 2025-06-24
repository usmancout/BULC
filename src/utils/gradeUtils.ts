import { GradeMapping } from '../types/Course';

export const gradeScale: GradeMapping[] = [
  { grade: 'A', point: 4.00, marksRange: '85.00 - 100.00' },
  { grade: 'A-', point: 3.70, marksRange: '80.00 - 84.99' },
  { grade: 'B+', point: 3.30, marksRange: '75.00 - 79.99' },
  { grade: 'B', point: 3.00, marksRange: '70.00 - 74.99' },
  { grade: 'B-', point: 2.70, marksRange: '65.00 - 69.99' },
  { grade: 'C+', point: 2.30, marksRange: '61.00 - 64.99' },
  { grade: 'C', point: 2.00, marksRange: '58.00 - 60.99' },
  { grade: 'C-', point: 1.70, marksRange: '55.00 - 57.99' },
  { grade: 'D', point: 1.00, marksRange: '50.00 - 54.99' },
  { grade: 'F', point: 0.00, marksRange: '0.00 - 49.99' }
];

export const getGradePoint = (grade: string): number => {
  const gradeMapping = gradeScale.find(g => g.grade === grade);
  return gradeMapping ? gradeMapping.point : 0;
};

export const creditHoursOptions = [1, 2, 3, 4, 5];