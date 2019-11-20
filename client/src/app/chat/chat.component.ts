import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../shared/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import IUser from '../interfaces/user.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private userLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { 
    this.initialUser();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.error);
      return of(result as T);
    }
  }

  public initialUser() {
    this.authService.getUser()
      .pipe(
        catchError(this.handleError<IUser>())
      )
      .subscribe(data => {
        if (!data)
          return;

        this.userService.initialUser(data);
        this.userLoaded = true;
      });
  }

  ngOnInit() {
  }
}
