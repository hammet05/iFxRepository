import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.development';
import { CredentialsUserDto, ResponseAuthenticationDto } from './interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  private http= inject(HttpClient);
  private baseUrl= environment.apiURL + '/users'
  private readonly keyToken="token";
  private readonly keyExpiration="token-expiration";

  login(credentials:CredentialsUserDto):Observable<ResponseAuthenticationDto>{
    return this.http.post<ResponseAuthenticationDto>(`${this.baseUrl}/login`, credentials)
    .pipe(
          tap(responseAuthentication=>this.saveToken(responseAuthentication))
         )
  }

  saveToken(responseAuthentication: ResponseAuthenticationDto) {
    localStorage.setItem(this.keyToken, responseAuthentication.token);
    localStorage.setItem(this.keyExpiration, responseAuthentication.expiration.toString());
  }

  register(credenciales: CredentialsUserDto): Observable<ResponseAuthenticationDto> {
    return this.http.post<ResponseAuthenticationDto>(`${this.baseUrl}/register`, credenciales)
      .pipe(
        tap(respuestaAutenticacion => this.saveToken(respuestaAutenticacion))
      )
  }

  getJWT(field: string): string {
    const token = localStorage.getItem(this.keyToken);
    if (!token) { return '' }
    var dataToken = JSON.parse(atob(token.split('.')[1]))
    return dataToken[field];
  }

  isLoggedIn(): boolean{
    const token = localStorage.getItem(this.keyToken);

    if (!token) {
      return false;
    }

    const expiration = localStorage.getItem(this.keyExpiration)!;
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }
    return true
  }

  logout() {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyExpiration);
  }


  getRol():string {
    return '';
  }

  getToken():string | null{
    return localStorage.getItem(this.keyToken)
  }
}
