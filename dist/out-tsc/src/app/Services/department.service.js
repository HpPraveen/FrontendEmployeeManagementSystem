import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { UrlConfig } from '../Shared/UrlConfig';
let DepartmentService = class DepartmentService {
    constructor(http) {
        this.http = http;
        this.baseUrl = UrlConfig.baseUrl;
    }
    GetAllDepartments() {
        return this.http.get(this.baseUrl + 'AllDepartments');
    }
};
DepartmentService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DepartmentService);
export { DepartmentService };
//# sourceMappingURL=department.service.js.map