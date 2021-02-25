import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let CreateAndUpdateEmployeeComponent = class CreateAndUpdateEmployeeComponent {
    constructor(employeeService, departmentService, toastr) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.toastr = toastr;
        this.fName = ' ';
        this.lName = ' ';
        this.eEmail = ' ';
        this.eDob = '';
        this.eAddress = '';
        this.edepatmentId = 1;
        this.genderChecked = '0';
        this.DepartmentList = [];
    }
    ngOnInit() {
        this.AllDepartmentList();
        this.imgURL = this.employee.imageName;
        this.fName = this.employee.firstName;
        this.lName = this.employee.lastName;
        this.eEmail = this.employee.email;
        this.eDob = this.employee.dateOfBirth;
        this.eAddress = this.employee.homeAddress;
        const eGender = this.employee.gender;
        if (eGender === 'Male') {
            this.genderChecked = '1';
        }
        else if (eGender === 'Female') {
            this.genderChecked = '2';
        }
        else {
            this.genderChecked = '1';
        }
        const edepatment = this.employee.department;
        if (edepatment === 'IT') {
            this.edepatmentId = 1;
        }
        else if (edepatment === 'Finance') {
            this.edepatmentId = 2;
        }
        else if (edepatment === 'HR') {
            this.edepatmentId = 3;
        }
    }
    AllDepartmentList() {
        this.departmentService.GetAllDepartments().subscribe(d => {
            this.DepartmentList = d;
        });
    }
    AddEmployee(employeeDetails) {
        this.employeeService.AddNewEmployeeDetails(employeeDetails).subscribe(e => {
            if (e === true) {
                location.reload();
                this.toastr.success('New Employee Successfully Added !');
            }
            else {
                this.toastr.error('New Employee Add Failed !');
            }
        });
    }
    UpdateEmployee(employeeDetails) {
        this.employeeService.UpdateEmployeeDetails(employeeDetails).subscribe(e => {
            if (e === true) {
                location.reload();
                this.toastr.success('Employee Successfully Updated !');
            }
            else {
                this.toastr.error('New Employee Update Failed !');
            }
        });
    }
    addEmployeeClick() {
        if (this.fName === '' || this.lName === '' || this.eDob === '' ||
            this.eEmail === '' || this.genderChecked === '' || this.eAddress === '' ||
            this.fName === null || this.lName === null || this.eDob === null ||
            this.eEmail === null || this.genderChecked === null || this.eAddress === null) {
            this.toastr.error('Please fill the required fields !');
        }
        else {
            const eName = this.fName + ' ' + this.lName;
            this.employeeService.GetEmployeesByNameAndMail(eName, this.eEmail).subscribe(e => {
                if (e.length === 0) {
                    this.EmployeeDetailList = {
                        firstName: this.fName,
                        lastName: this.lName,
                        dateOfBirth: this.eDob,
                        email: this.eEmail,
                        gender: this.genderChecked,
                        homeAddress: this.eAddress,
                        departmentId: this.edepatmentId,
                        imageName: this.imgURL
                    };
                    this.AddEmployee(this.EmployeeDetailList);
                }
                else {
                    this.toastr.error('Employee Already Added !');
                    this.toastr.error('Please use different name / email');
                }
            });
        }
    }
    editEmployeeClick() {
        if (this.fName === '' || this.lName === '' || this.eDob === '' ||
            this.eEmail === '' || this.genderChecked === '' || this.eAddress === '' ||
            this.fName === null || this.lName === null || this.eDob === null ||
            this.eEmail === null || this.genderChecked === null || this.eAddress === null) {
            this.toastr.error('Please fill the required fields !');
        }
        else {
            this.EmployeeDetailList = {
                id: this.employee.id,
                firstName: this.fName,
                lastName: this.lName,
                dateOfBirth: this.eDob,
                email: this.eEmail,
                gender: this.genderChecked,
                homeAddress: this.eAddress,
                departmentId: this.edepatmentId,
                imageName: this.imgURL
            };
            this.UpdateEmployee(this.EmployeeDetailList);
        }
    }
    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.imgURL = event.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
        if (this.selectedFile.type !== 'image/jpeg') {
            this.toastr.error('Please select jpeg image !');
        }
    }
};
__decorate([
    Input()
], CreateAndUpdateEmployeeComponent.prototype, "employee", void 0);
CreateAndUpdateEmployeeComponent = __decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'app-CreateAndUpdateEmployee',
        templateUrl: './CreateAndUpdateEmployee.component.html',
        styleUrls: ['./CreateAndUpdateEmployee.component.css']
    })
], CreateAndUpdateEmployeeComponent);
export { CreateAndUpdateEmployeeComponent };
//# sourceMappingURL=CreateAndUpdateEmployee.component.js.map