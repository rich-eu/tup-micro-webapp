import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';


import { Observable, throwError, } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
      public router: Router
  ) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let username = localStorage.getItem("username")? localStorage.getItem("username") : '';
    let password = localStorage.getItem("password")? localStorage.getItem("password") : '';
    if(username && password)
    {
        request = request.clone({
        setHeaders: {
            username: `${username}`,
            password: `${password}`
        }
        });
    }

    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
            localStorage.clear();            
            this.router.navigate(['login']);
        }
        const error = err.error.message || err.statusText;
            return throwError(error);
    }));
  }
}