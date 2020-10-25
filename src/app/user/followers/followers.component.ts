import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../../core/api/users.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Follow} from '../../core/models/follow';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit, OnDestroy {

  followers$: Observable<Follow[]>;
  private subscription: Subscription;

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.parent.params.subscribe(({id}) => {
      this.followers$ = this.userService.followers(id).pipe(map((res) => res.body));
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
