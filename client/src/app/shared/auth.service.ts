import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { ILoginBody, IRegisterBody } from '../interfaces/auth-body.interface';
import IUser from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private serverPath = 'http://localhost:3000/'

  private getUserUrl = `${this.serverPath}getUserInfo`;
  private loginUrl = `${this.serverPath}login`;
  private registerUrl = `${this.serverPath}register`;

  constructor(private httpClient: HttpClient) { }

  public setToken(headers: HttpHeaders): void {
    localStorage.setItem('_access_token', headers.get('access-token'));
  }

  public registerRequest(body: IRegisterBody): Observable<HttpResponse<IUser>> {
    return this.httpClient.post<IUser>(this.registerUrl, body, { observe: 'response' })
  }

  public loginRequest(body: ILoginBody): Observable<HttpResponse<IUser>> {
    return this.httpClient.post<IUser>(this.loginUrl, body, { observe: 'response' })
  }

  public getUser(): Observable<IUser> {
    return this.httpClient.get<IUser>(this.getUserUrl);
  }
}

