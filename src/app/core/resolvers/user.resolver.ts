import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {UsersService} from '../api/users.service';

export class UserResolver implements Resolve<User> {
  constructor(private userService: UsersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    console.log(route.params);
    return this.userService.show(1);
  }
}
