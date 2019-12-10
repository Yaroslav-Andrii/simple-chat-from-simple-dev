import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(private _router: Router) {
    this.authorization();
  }

  private authorization() {
    
    if (!localStorage.getItem('_access_token')) {
      this._router.navigate(['/login']);
    } else {
      this._router.navigate(['/chat']);
    }
  }
}
