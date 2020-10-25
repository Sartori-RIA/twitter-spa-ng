import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppState} from '../../store';
import {Store} from '@ngrx/store';
import {LocalStorage} from '../../utils/storage';
import {SIGN_OUT} from '../../store/auth/auth.actions';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = LocalStorage.jwt();
    let headers = req.headers.append('Accept', 'application/json');
    if (token) {
      headers = headers.append('Authorization', token);
    }

    if (!(req.body instanceof FormData)) {
      headers = headers.append('Content-Type', 'application/json');
    }

    const cloneReq = req.clone({headers});
    return next.handle(cloneReq).pipe(
      catchError((err) => {
        switch (err.status) {
          case 500:
            console.log('internal server error');
            break;
          case 403:
            this.store.dispatch(SIGN_OUT());
            break;
          case 401:
            if (!req.url.includes('/auth/sign_in')) {
              this.store.dispatch(SIGN_OUT());
            }
            break;
          case 0:
            console.log('server offline');
            break;
        }
        return throwError(err);
      })
    );
  }
}
