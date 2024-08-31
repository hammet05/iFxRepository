import { inject, Injectable } from '@angular/core';
import { EmployeeDTO } from '../components/employees/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/employee';

  public save(employee:EmployeeDTO):Observable<EmployeeDTO>{
    return this.http.post<EmployeeDTO>(`${this.urlBase}/save`, employee);   
  }

}
