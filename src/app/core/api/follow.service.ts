import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Follow} from '../models/follow';
import {environment} from '../../../environments/environment';

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

  follows(id: number | string): Observable<HttpResponse<Follow[]>> {
    return this.http.get<Follow[]>(`${this.url}/${id}/follows`, {observe: 'response'});
  }

  startToFollow(id: number, userId: number): Observable<Follow> {
    return this.http.post<Follow>(`${this.url}/${id}/follows`, {follow_id: userId});
  }

  stopToFollow(id: number, followId: number): Observable<Follow> {
    return this.http.delete<Follow>(`${this.url}/${id}/follows/${followId}`);
  }
}
