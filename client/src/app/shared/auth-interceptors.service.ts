import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptors implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!localStorage.getItem('_access_token')) {
      this._router.navigate(['/login']);
      return next.handle(req);
    } 

    const request = req.clone({setHeaders: {'access-token': localStorage.getItem('_access_token')}});
    return next.handle(request)
  }

  constructor(private _router: Router) { }
}
