import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {noop, Observable, Subscription} from 'rxjs';
import {User} from '../../core/models/user';
import {map} from 'rxjs/operators';
import {Counter} from '../../core/models/base-model';
import {FollowService} from '../../core/api/follow.service';
import {PostagesService} from '../../core/api/postages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profile$: Observable<User> = this.activatedRoute.data.pipe(map((res) => res.user));
  followsCount$: Observable<number>;
  followersCount$: Observable<number>;
  postagesCount$: Observable<number>;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private followService: FollowService,
              private postagesService: PostagesService) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.profile$.subscribe((user) => {
      this.followersCount$ = this.followService.followersCount(user.id).pipe(map((res) => res.total));
      this.followsCount$ = this.followService.followsCount(user.id).pipe(map((res) => res.total));
      this.postagesCount$ = this.postagesService.userPostagesCount(user.id).pipe(map((res) => res.total));
    });
  }

  openAvatarFull(user: User): void {
    noop();
  }
}
