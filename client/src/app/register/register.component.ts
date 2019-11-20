import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IRegisterBody } from '../interfaces/auth-body.interface';
import signValidator from '../validators/sign.validator';
import { catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import IUser from '../interfaces/user.interface';
import { AuthService } from 'src/app/shared/auth.service';
import { Observable, of } from 'rxjs';
import dataTrim from '../helpers/log-data-trim.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerBody: IRegisterBody = {
    email: null,
    password: null,
    name: null,
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

  private registerRequest() {

    // Trim data value
    this.registerBody = dataTrim(this.registerBody) as IRegisterBody;

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
        //this.onSigenedId.emit(true);
      })
    this.registerBody = {email: null, password: null, name: null};
  }

  ngOnInit() {
  }

}
