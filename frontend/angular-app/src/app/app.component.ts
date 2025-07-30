import { Component } from '@angular/core';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    EmployeeListComponent,
    DepartmentListComponent,
    MatToolbarModule
  ]
})
export class AppComponent {
  title = 'angular-app';
}