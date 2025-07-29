// src/api/apiService.ts
import axios from 'axios';

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

const aspApi = axios.create({ baseURL: 'https://localhost:5001/api' });
const springApi = axios.create({ baseURL: 'http://localhost:8080/api' });

export const getEmployees = () => aspApi.get<Employee[]>('/employees');
export const createEmployee = (data: Omit<Employee, 'employeeId'>) =>
  aspApi.post<Employee>('/employees', data);
export const updateEmployee = (id: number, data: Employee) =>
  aspApi.put(`/employees/${id}`, data);
export const deleteEmployee = (id: number) => aspApi.delete(`/employees/${id}`);

export const getDepartments = () => springApi.get<Department[]>('/departments');
export const createDepartment = (data: Omit<Department, 'departmentId'>) =>
  springApi.post<Department>('/departments', data);
export const updateDepartment = (id: number, data: Department) =>
  springApi.put(`/departments/${id}`, data);
export const deleteDepartment = (id: number) => springApi.delete(`/departments/${id}`);