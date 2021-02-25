import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departmet } from '../Models/Departmet';
import { UrlConfig } from '../Shared/UrlConfig';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = UrlConfig.baseUrl;

  constructor(private http: HttpClient) {}

  GetAllDepartments(): Observable<any> {
    return this.http.get<Departmet[]>(this.baseUrl + 'AllDepartments' );
  }

}
