import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PostagesService} from '../api/postages.service';
import {Postage} from '../models/postage';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Postage> {
  constructor(private postageService: PostagesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Postage> | Promise<Postage> | Postage {
    return this.postageService.show(route.parent.params.id, route.params.id);
  }
}
