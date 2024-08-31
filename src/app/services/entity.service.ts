import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.development';
import { EntityDTO } from '../components/entities/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/entity';

  public crearGet(): Observable<EntityDTO>{
    return this.http.get<EntityDTO>(`${this.urlBase}/GetAllEntitiesAsync`);
  }

  public save(entity:EntityDTO):Observable<EntityDTO>{
    return this.http.post<EntityDTO>(`${this.urlBase}/save`, entity);   
  }
}
