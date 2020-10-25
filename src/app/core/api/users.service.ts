import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {User} from '../models/user';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Follow} from '../models/follow';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {

  constructor(protected http: HttpClient) {
    super(http, environment.api_url + 'users');
  }

  followers(id: number | string): Observable<HttpResponse<Follow[]>> {
    return this.http.get<Follow[]>(`${this.url}/${id}/followers`, {observe: 'response'});
  }

  follows(id: number | string): Observable<HttpResponse<Follow[]>> {
    return this.http.get<Follow[]>(`${this.url}/${id}/follows`, {observe: 'response'});
  }

  startToFollow(id: number, userId: number): Observable<Follow> {
    return this.http.post<Follow>(`${this.url}/${id}/follows`, {follow_id: userId});
  }

  stopToFollow(id: number, followId: number): Observable<Follow> {
    return this.http.delete<Follow>(`${this.url}/${id}/follows/${followId}`);
  }

  me(): Observable<User> {
    return super.show(1);
  }
}
