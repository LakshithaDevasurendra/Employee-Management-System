// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee, Department } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private aspUrl = 'http://localhost:5121/api/employees';        // ASP.NET Core (MSSQL)
  private springUrl = 'http://localhost:8080/api/departments';   // Spring Boot (MySQL)

  constructor(private http: HttpClient) { }

  // --- EMPLOYEES (ASP.NET Core) ---
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.aspUrl);
  }

  addEmployee(emp: Omit<Employee, 'employeeId'>): Observable<Employee> {
    return this.http.post<Employee>(this.aspUrl, emp);
  }

  updateEmployee(id: number, emp: Employee): Observable<any> {
    return this.http.put(`${this.aspUrl}/${id}`, emp);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.aspUrl}/${id}`);
  }

  // --- DEPARTMENTS (Spring Boot) ---
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.springUrl);
  }

  addDepartment(dept: Omit<Department, 'departmentId'>): Observable<Department> {
    return this.http.post<Department>(this.springUrl, dept);
  }

  updateDepartment(id: number, dept: Department): Observable<any> {
    return this.http.put(`${this.springUrl}/${id}`, dept);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.springUrl}/${id}`);
  }
}

export type { Department };
