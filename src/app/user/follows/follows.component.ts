import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Follow} from '../../core/models/follow';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {FollowService} from '../../core/api/follow.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {selectCurrentUser} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit, OnDestroy {

  follows$: Observable<Follow[]>;
  user$ = this.store.pipe(select(selectCurrentUser));
  private subscription: Subscription;

  constructor(private followService: FollowService,
              private store: Store<AppState>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.parent.params.subscribe(({id}) => {
      this.follows$ = this.followService.follows(id).pipe(map((res) => res.body));
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onFollowClick(follow: Follow): void {
    this.followService.startToFollow(follow.user_id, follow.id);
    this.follows$ = this.followService.follows(follow.user_id).pipe(map((res) => res.body));
  }
}
