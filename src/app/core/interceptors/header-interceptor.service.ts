import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let headers = req.headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', token);

    if (!(req.body instanceof FormData)) {
      headers = headers.append('Content-Type', 'application/json');
    }

    const cloneReq = req.clone({headers});
    return next.handle(cloneReq).pipe(
      catchError((err) => {
        console.log('deu ruim');
        return throwError(err);
      })
    );
  }
}
