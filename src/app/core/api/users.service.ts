import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {

  constructor(protected http: HttpClient) {
    super(http, environment.api_url + 'users');
  }

  me(): Observable<User> {
    return super.show(1);
  }
}
