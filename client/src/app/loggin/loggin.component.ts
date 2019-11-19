import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IRegisterBody, ILoginBody } from '../interfaces/auth-body.interface';
import signValidator from '../validators/sign.validator';
import { AuthService } from '../shared/auth.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import IUser from '../interfaces/user.interface';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss']
})
export class LogginComponent implements OnInit {

  @Output() onSigenedId: EventEmitter<boolean> = new EventEmitter();

  private warningMessage: string;
  private warning: boolean = false;

  public registration: boolean = false;

  private loginBody: ILoginBody = {
    email: null,
    password: null,
  };

  private registerBody: IRegisterBody = {
    email: null,
    password: null,
    name: null,
  };

  constructor(private authService: AuthService) {}

  private handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      this.warningMessage = error.error;
      this.warning = true;

      return of(result as T);
    }
  }

  private dataTrim(data: ILoginBody | IRegisterBody): ILoginBody | IRegisterBody {

    for (let key in data) {
      if (key === 'avatar') continue;

      if (data[key] !== null) {
        data[key] = data[key].trim();
      }
    }
    return data;
  }

  private loginRequest() {
    
    // Trim data value
    this.loginBody = this.dataTrim(this.loginBody) as ILoginBody;

    // Validate data value
    const errorMessage = signValidator(this.loginBody);

    if (errorMessage) {
      this.warningMessage = errorMessage;
      this.warning = true;
      return;
    }

    // Send request
    this.authService.loginRequest(this.loginBody)
      .pipe(
        catchError(this.handleError<HttpResponse<IUser>>())
      )
      .subscribe(data => {
        if (!data) return;
        this.authService.setToken(data.headers);
        this.onSigenedId.emit(true);
      });

    this.loginBody = { email: null, password: null };
  }

  private registerRequest() {

    // Trim data value
    this.registerBody = this.dataTrim(this.registerBody) as IRegisterBody;

    // Validate data value
    const errorMessage = signValidator(this.registerBody);

    if (errorMessage) {
      this.warningMessage = errorMessage;
      this.warning = true;
      return;
    }

    // Send request
    this.authService.registerRequest(this.registerBody)
      .pipe(
        catchError(this.handleError<HttpResponse<IUser>>())
      )
      .subscribe(data => {
        if (!data) return;
        this.authService.setToken(data.headers);
        this.onSigenedId.emit(true);
      })
    this.registerBody = {email: null, password: null, name: null};
  }

  ngOnInit() {
  }

}
