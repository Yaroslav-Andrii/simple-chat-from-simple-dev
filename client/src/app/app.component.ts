import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import IUser from './interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public MyData;
  public signedIn: boolean;

  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private _router: Router
  ) {
    this.authorization();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.error);
      return of(result as T);
    }
  }

  private async authorization(): Promise<void> {
    if (!localStorage.getItem('_access_token')) {
      this._router.navigate(['/login']);
    } else {
      this.MyData = await this.authService.getUser()
      .pipe(
        catchError(this.handleError<IUser>())
      )
      .subscribe(data => {
        if (!data) return;

        this.MyData = data;
        this.userService.initialUser(data);
        this._router.navigate([''])
      });
    }
  }

  private async openMessenger(status: boolean): Promise<void> {
    this.MyData = await this.authService.getUser()
    .pipe(
      catchError(this.handleError<IUser>())
    )
    .subscribe(data => {
      if (!data) return;
        
      this.MyData = data;
      this.userService.initialUser(data);
      this.signedIn = status;
    });
  }
}
