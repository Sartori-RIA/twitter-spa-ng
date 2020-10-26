import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Follow} from '../models/follow';
import {environment} from '../../../environments/environment';
import {Counter} from '../models/base-model';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  url = environment.api_url + 'users';

  constructor(protected http: HttpClient) {
  }

  followers(id: number | string): Observable<HttpResponse<Follow[]>> {
    return this.http.get<Follow[]>(`${this.url}/${id}/followers`, {observe: 'response'});
  }

  followersCount(id: number): Observable<Counter> {
    return this.http.get<Counter>(`${this.url}/${id}/followers/count`);
  }

  follows(id: number | string): Observable<HttpResponse<Follow[]>> {
    return this.http.get<Follow[]>(`${this.url}/${id}/follows`, {observe: 'response'});
  }

  followsCount(id: number): Observable<Counter> {
    return this.http.get<Counter>(`${this.url}/${id}/follows/count`);
  }

  startToFollow(id: number, userId: number): Observable<Follow> {
    return this.http.post<Follow>(`${this.url}/${id}/follows`, {follow_id: userId});
  }

  stopToFollow(id: number, followId: number): Observable<Follow> {
    return this.http.delete<Follow>(`${this.url}/${id}/follows/${followId}`);
  }
}
