import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IRegisterBody, ILoginBody } from '../interfaces/auth-body.interface';
import signValidator from '../validators/sign.validator';
import { AuthService } from '../shared/auth.service';

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

  private loginRequest() {
    
    // Triming data
    for (let key in this.loginBody) {
      if (key === 'avatar') continue;
      if (this.loginBody[key] !== null) this.loginBody[key].trim();
    }

    const errorMessage = signValidator(this.loginBody);

    if (errorMessage) {
      this.warningMessage = errorMessage;
      this.warning = true;
      return;
    }

    this.authService.loginRequest(this.loginBody).subscribe(data => {
      this.authService.setToken(data.headers);
      this.onSigenedId.emit(true);
    });

    this.loginBody = { email: null, password: null };
  }

  private registerRequest() {

    // Triming data
    for (let key in this.registerBody) {
      if (key === 'avatar') continue;
      if (this.registerBody[key] !== null) this.registerBody[key].trim();
    }

    const errorMessage = signValidator(this.registerBody);

    if (errorMessage) {
      this.warningMessage = errorMessage;
      this.warning = true;
      return;
    }

    this.authService.registerRequest(this.registerBody).subscribe(data => {
      this.authService.setToken(data.headers);
      this.onSigenedId.emit(true);
    })
    this.registerBody = {email: null, password: null, name: null};
  }

  ngOnInit() {
  }

}
