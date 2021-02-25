import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeDetails } from '../Models/EmployeeDetails';
import { Observable } from 'rxjs';
import { UrlConfig } from '../Shared/UrlConfig';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = UrlConfig.baseUrl;

  constructor(private http: HttpClient) {}

  GetAllEmployees(): Observable<any> {
    return this.http.get<EmployeeDetails[]>(this.baseUrl + 'AllEmployeeDetails' );
  }

  GetEmployeesByNameAndMail(name: string, email: string): Observable<any> {
    return this.http.get<EmployeeDetails[]>(this.baseUrl + 'GetEmployeeDetails/' + name + '/' + email );
  }

  AddNewEmployeeDetails(employeeDetail: EmployeeDetails): Observable<any> {
    return this.http.post<EmployeeDetails>(this.baseUrl + 'AddNewEmployee', employeeDetail);
  }
  UpdateEmployeeDetails(employeeDetail: EmployeeDetails): Observable<any> {
    return this.http.put<EmployeeDetails>(this.baseUrl + 'UpdateEmployee', employeeDetail);
  }

  DeleteEmployeeDetails(employeeId: number): Observable<any> {
    return this.http.delete<EmployeeDetails[]>(this.baseUrl + 'DeleteEmployee/' + employeeId );
  }

}
