import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Postage} from '../models/postage';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostagesService {
  url = environment.api_url + 'users';

  constructor(protected http: HttpClient) {
  }

  index(params?: { [key: string]: string | string[] }): Observable<HttpResponse<Postage[]>> {
    return this.http.get<Postage[]>(`${environment.api_url}postages`, {params, observe: 'response'}).pipe();
  }

  userPostages(userId: number, params?: { [key: string]: string | string[] }): Observable<HttpResponse<Postage[]>> {
    return this.http.get<Postage[]>(`${this.url}${userId}/postages`, {params, observe: 'response'}).pipe();
  }

  show(userId: number, id: number): Observable<Postage> {
    return this.http.get<Postage>(`${this.url}${userId}/postages/${id}`).pipe();
  }

  create(userId: number, data: Postage): Observable<Postage> {
    return this.http.post<Postage>(`${this.url}${userId}/postages`, data).pipe();
  }

  update(userId: number, data: Postage): Observable<Postage> {
    return this.http.put<Postage>(`${this.url}${userId}/postages/${data.id}`, data).pipe();
  }

  destroy(userId: number, id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.url}${userId}/postages/${id}`).pipe(map(() => ({id})));
  }
}
