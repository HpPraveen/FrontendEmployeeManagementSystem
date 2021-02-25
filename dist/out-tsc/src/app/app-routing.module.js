import { __decorate } from "tslib";
import { LoginComponent } from './Components/employee/login/login.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
const routes = [{
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }, {
        path: 'employee',
        component: EmployeeComponent
    }, {
        path: 'login',
        component: LoginComponent
    },];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map