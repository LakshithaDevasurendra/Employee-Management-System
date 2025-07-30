import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { Department } from '../../models';
import { DepartmentFormComponent } from '../department-form/department-form.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  displayedColumns = ['name', 'location', 'actions'];

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.api.getDepartments().subscribe(res => this.departments = res);
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(DepartmentFormComponent);
    dialogRef.afterClosed().subscribe(() => this.loadDepartments());
  }

  openEditDialog(dept: Department) {
    const dialogRef = this.dialog.open(DepartmentFormComponent, {
      data: { ...dept }
    });
    dialogRef.afterClosed().subscribe(() => this.loadDepartments());
  }

  deleteDepartment(id: number) {
    if (confirm('Delete this department?')) {
      this.api.deleteDepartment(id).subscribe(() => this.loadDepartments());
    }
  }
}