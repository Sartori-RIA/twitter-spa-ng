import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {User} from '../models/user';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LocalStorage} from '../../utils/storage';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {

  constructor(protected http: HttpClient) {
    super(http, environment.api_url + 'users');
  }

  me(): Observable<User> {
    const user = LocalStorage.user();
    return super.show(user.id);
  }

  checkEmail(email: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/check/email`, {observe: 'response', params: {q: email}});
  }

  checkUsername(username: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/check/user_name`, {observe: 'response', params: {q: username}});
  }
}
