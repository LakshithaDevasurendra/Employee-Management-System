import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Department } from '../../models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class DepartmentFormComponent {
  department: Department;

  constructor(
    public dialogRef: MatDialogRef<DepartmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department,
    private api: ApiService
  ) {
    this.department = data ? { ...data } : {} as Department;
  }

  onSubmit() {
    if (this.data) {
      this.api.updateDepartment(this.data.departmentId, this.department).subscribe(() => this.dialogRef.close());
    } else {
      this.api.addDepartment(this.department).subscribe(() => this.dialogRef.close());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}