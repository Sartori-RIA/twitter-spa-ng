import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseModel} from '../models/base-model';

export abstract class BaseService<T extends BaseModel> {

  protected constructor(protected http: HttpClient, protected url: string) {
  }

  index(params?: { [key: string]: string | string[] }): Observable<HttpResponse<T[]>> {
    return this.http.get<T[]>(this.url, {params, observe: 'response'}).pipe();
  }

  search(search: string): Observable<T[]> {
    return this.http.get<T[]>(this.url + '/search', {params: {q: search}}).pipe();
  }

  show(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`).pipe();
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(this.url, data).pipe();
  }

  update(data: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${data.id}`, data).pipe();
  }

  destroy(id: number): Observable<{ id: number }> {
    return this.http.delete<{ id: number }>(`${this.url}/${id}`).pipe(map(() => ({id})));
  }
}
