import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns = ['name', 'email', 'salary', 'actions'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.api.getEmployees().subscribe(res => this.employees = res);
  }

  deleteEmployee(id: number) {
    if (confirm('Delete this employee?')) {
      this.api.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }
}