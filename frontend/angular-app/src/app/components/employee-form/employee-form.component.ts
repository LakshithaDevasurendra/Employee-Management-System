// src/app/components/employee-form/employee-form.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private api: ApiService
  ) {
    this.employee = data ? { ...data } : {} as Employee;
  }

  onSubmit() {
    if (this.data) {
      this.api.updateEmployee(this.data.employeeId, this.employee).subscribe(() => this.dialogRef.close());
    } else {
      this.api.addEmployee(this.employee).subscribe(() => this.dialogRef.close());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}