import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-ViewEmployee',
  templateUrl: './ViewEmployee.component.html',
  styleUrls: ['./ViewEmployee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 5;
  ModalTitle: string;
  ShowCreateUpdateComponent = false;
  closeResult = '';
  searchEmployee = '';
  employeeDetails: any;
  EmployeeDetails: any = [];
  eName: string = null;
  eEmail: string = null;

  constructor(private employeeService: EmployeeService, private modalService: NgbModal, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.AllEmployeeList();
  }

  AllEmployeeList(): void {
    this.employeeService.GetAllEmployees().subscribe(e => {
      this.EmployeeDetails = e;
    });
  }

  EmployeeByNameAndMail(name: string, mail: string): void {
    this.employeeService.GetEmployeesByNameAndMail(name, mail).subscribe(e => {
      this.EmployeeDetails = e;
    });
  }

  RemoveEmployee(eId: number): void {
    this.employeeService.DeleteEmployeeDetails(eId).subscribe(e => {
      if (e === true) {
        location.reload();
        this.toastr.success('Employee Successfully Deleted !');
      } else {
        this.toastr.error('Employee Delete Failed !');
      }
    });
  }

  onTableDataChange(event: number): void {
    this.page = event;
    this.AllEmployeeList();
  }

  searchEmployeeClick(): void {
    if (this.eName == null || this.eEmail === null || this.eName === '' || this.eEmail === '') {
      this.toastr.error('Please enter the name & email !');
    } else {
      this.page = 1;
      this.EmployeeByNameAndMail(this.eName, this.eEmail);
      this.searchEmployee = '- ' + this.eName;
    }
  }

  loadAllEmployeeClick(): void {
    location.reload();
  }

  deleteEmployeeClick(e): void {
    if (confirm('Are you sure to delete employe - ' + e.name + '')) {
      this.RemoveEmployee(e.id);
    }
  }

  addEmployeeClick(content): void {
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

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editEmployeeClick(e, content): void {
    this.ModalTitle = 'Edit Employee - ' + e.name + '';
    this.employeeDetails = e;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
