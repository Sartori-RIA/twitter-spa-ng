import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SignInPayload, User} from '../models/user';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {LocalStorage} from '../../utils/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected url = environment.auth_url;

  constructor(private http: HttpClient) {
  }

  onSignIn(data: SignInPayload): Observable<User> {
    return this.http.post<User>(`${this.url}sign_in`, data, {observe: 'response'}).pipe(map((response) => {
      const token = response.headers.get('Authorization');
      LocalStorage.setJwt(token);
      LocalStorage.setUser(response.body);
      return response.body;
    }));
  }

  onSignUp(data: User): Observable<User> {
    return this.http.post<User>(`${this.url}sign_up`, data, {observe: 'response'}).pipe(map((response) => {
      const token = response.headers.get('Authorization');
      LocalStorage.setJwt(token);
      LocalStorage.setUser(response.body);
      return response.body;
    }));
  }

  sendCodeToEmail(email: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}password`, {email}, {observe: 'response'});
  }

  submitPinCode(code: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}code`, {reset_password_token: code}, {observe: 'response'});
  }

  resetPassword(newPassword: string, token: string): Observable<HttpResponse<User>> {
    return this.http.put<any>(
      `${this.url}reset_passwords`,
      {password: newPassword},
      {
        observe: 'response', headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  onSignOut(): Observable<any> {
    return this.http.delete(`${this.url}sign_out`).pipe(tap(() => {
      LocalStorage.reset();
    }), catchError((e) => {
      LocalStorage.reset();
      return of(e);
    }));
  }
}
