import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject, zip} from 'rxjs';
import {User} from '../../core/models/user';
import {map, take, takeUntil} from 'rxjs/operators';
import {FollowService} from '../../core/api/follow.service';
import {PostagesService} from '../../core/api/postages.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {selectCurrentUser} from '../../store/auth/auth.selectors';
import {Follow} from '../../core/models/follow';
import {UploadFileComponent, UploadFileParams} from '../../upload-file/upload-file/upload-file.component';
import {MatDialog} from '@angular/material/dialog';
import {LOAD_USER} from '../../store/auth/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  user$: Observable<User> = this.store.pipe(select(selectCurrentUser));
  profile$: Observable<User> = this.activatedRoute.data.pipe(map((res) => res.user));
  followsCount$: Observable<number>;
  followersCount$: Observable<number>;
  postagesCount$: Observable<number>;
  destroy$ = new Subject<boolean>();
  alreadyFollow: boolean;
  follow: Follow;
  user: User;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              private followService: FollowService,
              private cdRefs: ChangeDetectorRef,
              private dialog: MatDialog,
              private postagesService: PostagesService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    zip(this.profile$, this.user$).pipe(takeUntil(this.destroy$)).subscribe(([profile, user]) => {
      this.followersCount$ = this.followService.followersCount(profile.id).pipe(map((res) => res.total));
      this.followsCount$ = this.followService.followsCount(profile.id).pipe(map((res) => res.total));
      this.postagesCount$ = this.postagesService.userPostagesCount(profile.id).pipe(map((res) => res.total));
      if (user) {
        this.followService.alreadyFollow(user.id, profile.id).pipe(take(1)).subscribe(({body, status}) => {
          this.follow = body;
          this.alreadyFollow = status === 200;
        }, (e) => {
          this.alreadyFollow = false;
        });
      }
    });
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.profile$.pipe(take(1)).subscribe((profile) => {
        if (user == null) {
          this.user = profile;
        }
        if (user?.id === profile?.id) {
          this.user = user;
        } else {
          this.user = profile;
        }
      });
    });
  }

  openAvatarFull(profile: User): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user.id !== profile.id) {
        return;
      }
      const params: UploadFileParams = {
        entityId: user.id,
        type: 'avatar'
      };
      const dialog = this.dialog.open(UploadFileComponent, {
        disableClose: true,
        minWidth: '33%',
        data: params
      });
      dialog.afterClosed().pipe(take(1)).subscribe((res) => {
        if (res?.success) {
          this.store.dispatch(LOAD_USER());
        }
      });
    });
  }

  onFollowClick(profile: User): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (this.alreadyFollow) {
        this.followService.stopToFollow(this.follow.user_id, this.follow.id)
          .pipe(take(1))
          .subscribe(() => {
            this.follow = undefined;
            this.alreadyFollow = false;
          });
      } else {
        this.followService.startToFollow(user.id, profile.id)
          .pipe(take(1))
          .subscribe((follow) => {
            this.follow = follow;
            this.alreadyFollow = true;
          });
      }
    });
  }

  uploadBanner(profile: User): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (profile.id !== user.id) {
        return;
      }
      const params: UploadFileParams = {
        entityId: user.id,
        type: 'banner'
      };
      const dialog = this.dialog.open(UploadFileComponent, {
        disableClose: true,
        minWidth: '33%',
        data: params
      });
      dialog.afterClosed().pipe(take(1)).subscribe((res) => {
        if (res?.success) {
          this.store.dispatch(LOAD_USER());
        }
      });
    });
  }
}
