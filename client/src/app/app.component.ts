import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public MyData;
  public signedIn: boolean;

  constructor(private authService: AuthService, private userService: UserService) {
    this.authorization();
  }

  private async authorization(): Promise<void> {
    if (!localStorage.getItem('_access_token')) {
      this.signedIn = false;
    } else {
      this.MyData = await this.authService.getUser().pipe(/* TODO ERROR HANDLER */).subscribe(data => {
        this.MyData = data;
        this.userService.initialUser(data);
        this.signedIn = true;
      });
    }
  }

  private async openMessenger(status: boolean): Promise<void> {
    this.MyData = await this.authService.getUser().pipe(/* TODO ERROR HANDLER */).subscribe(data => {
      this.MyData = data;
      this.userService.initialUser(data);
    });
    this.signedIn = status;
  }
}
