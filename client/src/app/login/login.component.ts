import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ILoginBody } from '../interfaces/auth-body.interface';
import signValidator from '../validators/sign.validator';
import { catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import IUser from '../interfaces/user.interface';
import { AuthService } from 'src/app/shared/auth.service';
import { Observable, of } from 'rxjs';
import dataTrim from '../helpers/log-data-trim.helper';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginBody: ILoginBody = {
    email: null,
    password: null,
  };

  private warningMessage: string;
  private warning: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      this.warningMessage = error.error;
      this.warning = true;

      return of(result as T);
    }
  }

  private loginRequest() {
    
    // Trim data value
    this.loginBody = dataTrim(this.loginBody) as ILoginBody;

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
        //this.onSigenedId.emit(true);
      });

    this.loginBody = { email: null, password: null };
  }

  ngOnInit() {
  }

}
