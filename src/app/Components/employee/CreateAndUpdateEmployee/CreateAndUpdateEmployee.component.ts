import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/Services/department.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-CreateAndUpdateEmployee',
  templateUrl: './CreateAndUpdateEmployee.component.html',
  styleUrls: ['./CreateAndUpdateEmployee.component.css']
})
export class CreateAndUpdateEmployeeComponent implements OnInit {

  @Input() employee: any;
  fName = ' ';
  lName = ' ';
  eEmail = ' ';
  eDob = '';
  eAddress = '';
  edepatmentId = 1;
  genderChecked = '0';
  selectedFile: File;
  imgURL: any;
  EmployeeDetailList: any;
  DepartmentList: any = [];

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, private toastr: ToastrService) {}
  ngOnInit(): void {
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
    } else if (eGender === 'Female') {
      this.genderChecked = '2';
    } else {
      this.genderChecked = '1';
    }

    const edepatment = this.employee.department;
    if (edepatment === 'IT') {
      this.edepatmentId = 1;
    } else if (edepatment === 'Finance') {
      this.edepatmentId = 2;
    } else if (edepatment === 'HR') {
      this.edepatmentId = 3;
    }
  }

  AllDepartmentList(): void {
    this.departmentService.GetAllDepartments().subscribe(d => {
      this.DepartmentList = d;
    });
  }

  AddEmployee(employeeDetails: any): void {
    this.employeeService.AddNewEmployeeDetails(employeeDetails).subscribe(e => {
      if (e === true) {
        location.reload();
        this.toastr.success('New Employee Successfully Added !');
      } else {
        this.toastr.error('New Employee Add Failed !');
      }
    });
  }

  UpdateEmployee(employeeDetails: any): void {
    this.employeeService.UpdateEmployeeDetails(employeeDetails).subscribe(e => {
      if (e === true) {
        location.reload();
        this.toastr.success('Employee Successfully Updated !');
      } else {
        this.toastr.error('New Employee Update Failed !');
      }
    });
  }

  addEmployeeClick(): void {
    if (this.fName === '' || this.lName === '' || this.eDob === '' ||
      this.eEmail === '' || this.genderChecked === '' || this.eAddress === '' ||
      this.fName === null || this.lName === null || this.eDob === null ||
      this.eEmail === null || this.genderChecked === null || this.eAddress === null) {
      this.toastr.error('Please fill the required fields !');

    } else {
      const eName = this.fName  + ' ' + this.lName;
      this.employeeService.GetEmployeesByNameAndMail(eName , this.eEmail).subscribe(e => {

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
        } else {
          this.toastr.error('Employee Already Added !');
          this.toastr.error('Please use different name / email');
        }
      });
    }
  }

  editEmployeeClick(): void {
    if (this.fName === '' || this.lName === '' || this.eDob === '' ||
      this.eEmail === '' || this.genderChecked === '' || this.eAddress === '' ||
      this.fName === null || this.lName === null || this.eDob === null ||
      this.eEmail === null || this.genderChecked === null || this.eAddress === null) {
      this.toastr.error('Please fill the required fields !');

    } else {
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

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event: any) => {
        this.imgURL = event.target.result;
    };
    reader.readAsDataURL(this.selectedFile);

    if (this.selectedFile.type !== 'image/jpeg') {
      this.toastr.error('Please select jpeg image !');
    }
  }

}

