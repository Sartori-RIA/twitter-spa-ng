import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {User} from '../models/user';
import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LocalStorage} from '../../utils/storage';
import {tap} from 'rxjs/operators';

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

  update(data: User): Observable<User> {
    return super.update(data).pipe(tap((user) => LocalStorage.setUser(user)));
  }

  checkEmail(email: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/check/email`, {observe: 'response', params: {q: email}});
  }

  checkUsername(username: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/check/user_name`, {observe: 'response', params: {q: username}});
  }

  userImage(id: number, file: File): Observable<HttpEvent<User>> {
    const url = `${this.url}/${id}`;
    return this.sendImage(url, file, 'avatar');
  }

  userBanner(id: number, file: File): Observable<HttpEvent<User>> {
    const url = `${this.url}/${id}`;
    return this.sendImage(url, file, 'banner');
  }

  private sendImage(url: string, file: File, fieldName: string): Observable<HttpEvent<User>> {
    const formData = new FormData();
    formData.append(fieldName, file, file.name);

    return this.http.put(url, formData, {
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    }) as Observable<HttpEvent<User>>;
  }
}
