import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
let ViewEmployeeComponent = class ViewEmployeeComponent {
    constructor(employeeService, modalService, toastr) {
        this.employeeService = employeeService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.page = 1;
        this.count = 0;
        this.tableSize = 5;
        this.ShowCreateUpdateComponent = false;
        this.closeResult = '';
        this.searchEmployee = '';
        this.EmployeeDetails = [];
        this.eName = null;
        this.eEmail = null;
    }
    ngOnInit() {
        this.AllEmployeeList();
    }
    AllEmployeeList() {
        this.employeeService.GetAllEmployees().subscribe(e => {
            this.EmployeeDetails = e;
        });
    }
    EmployeeByNameAndMail(name, mail) {
        this.employeeService.GetEmployeesByNameAndMail(name, mail).subscribe(e => {
            this.EmployeeDetails = e;
        });
    }
    RemoveEmployee(eId) {
        this.employeeService.DeleteEmployeeDetails(eId).subscribe(e => {
            if (e === true) {
                location.reload();
                this.toastr.success('Employee Successfully Deleted !');
            }
            else {
                this.toastr.error('Employee Delete Failed !');
            }
        });
    }
    onTableDataChange(event) {
        this.page = event;
        this.AllEmployeeList();
    }
    searchEmployeeClick() {
        if (this.eName == null || this.eEmail === null || this.eName === '' || this.eEmail === '') {
            this.toastr.error('Please enter the name & email !');
        }
        else {
            this.page = 1;
            this.EmployeeByNameAndMail(this.eName, this.eEmail);
            this.searchEmployee = '- ' + this.eName;
        }
    }
    loadAllEmployeeClick() {
        location.reload();
    }
    deleteEmployeeClick(e) {
        if (confirm('Are you sure to delete employe - ' + e.name + '')) {
            this.RemoveEmployee(e.id);
        }
    }
    addEmployeeClick(content) {
        this.ModalTitle = 'Add New Employee';
        this.employeeDetails = {
            id: 0,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            email: '',
            gender: '',
            homeAddress: '',
            departmentId: '',
            imageName: ''
        };
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    editEmployeeClick(e, content) {
        this.ModalTitle = 'Edit Employee - ' + e.name + '';
        this.employeeDetails = e;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    getDismissReason(reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return `with: ${reason}`;
        }
    }
};
ViewEmployeeComponent = __decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'app-ViewEmployee',
        templateUrl: './ViewEmployee.component.html',
        styleUrls: ['./ViewEmployee.component.scss']
    })
], ViewEmployeeComponent);
export { ViewEmployeeComponent };
//# sourceMappingURL=viewEmployee.component.js.map