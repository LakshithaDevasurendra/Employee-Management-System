// src/app/models.ts
export interface Employee {
  employeeId: number;
  name: string;
  email: string;
  phone: string;
  salary: number;
  departmentId: number;
}

export interface Department {
  departmentId: number;
  name: string;
  location: string;
}