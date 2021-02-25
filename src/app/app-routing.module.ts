import { LoginComponent } from './Components/employee/login/login.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: 'employee',
  component: EmployeeComponent
}, {
  path: 'login',
  component: LoginComponent
}, ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
