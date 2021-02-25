import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { UrlConfig } from '../Shared/UrlConfig';
let EmployeeService = class EmployeeService {
    constructor(http) {
        this.http = http;
        this.baseUrl = UrlConfig.baseUrl;
    }
    GetAllEmployees() {
        return this.http.get(this.baseUrl + 'AllEmployeeDetails');
    }
    GetEmployeesByNameAndMail(name, email) {
        return this.http.get(this.baseUrl + 'GetEmployeeDetails/' + name + '/' + email);
    }
    AddNewEmployeeDetails(employeeDetail) {
        return this.http.post(this.baseUrl + 'AddNewEmployee', employeeDetail);
    }
    UpdateEmployeeDetails(employeeDetail) {
        return this.http.put(this.baseUrl + 'UpdateEmployee', employeeDetail);
    }
    DeleteEmployeeDetails(employeeId) {
        return this.http.delete(this.baseUrl + 'DeleteEmployee/' + employeeId);
    }
};
EmployeeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EmployeeService);
export { EmployeeService };
//# sourceMappingURL=employee.service.js.map