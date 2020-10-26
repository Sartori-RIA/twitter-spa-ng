import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Follow} from '../../core/models/follow';
import {map, take} from 'rxjs/operators';
import {FollowService} from '../../core/api/follow.service';
import {User} from '../../core/models/user';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {selectCurrentUser} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit, OnDestroy {

  followers$: Observable<Follow[]>;
  user$ = this.store.pipe(select(selectCurrentUser));
  private subscription: Subscription;

  constructor(private followService: FollowService,
              private store: Store<AppState>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.parent.params.subscribe(({id}) => {
      this.followers$ = this.followService.followers(id).pipe(map((res) => res.body));
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onFollowClick(profile: User): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      this.followService.startToFollow(user.id, profile.id).subscribe();
    });
  }
}
