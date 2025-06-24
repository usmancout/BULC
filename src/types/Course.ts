export interface Course {
  id: string;
  creditHours: number;
  grade: string;
  gradePoint: number;
}

export interface GradeMapping {
  grade: string;
  point: number;
  marksRange: string;
}