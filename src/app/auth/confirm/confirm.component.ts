import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../core/models/user';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/api/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {

  error: number;
  loading = false;
  user: User;
  subscription: Subscription;
  alreadyConfirmed: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  ngOnInit(): void {
    this.loading = true;
    const params = this.activatedRoute.snapshot.queryParamMap.get('confirmation_token');
    this.subscription = this.authService
      .confirmAccount(params)
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user;
        this.error = undefined;
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        this.error = err.status;
        this.loading = false;
        this.alreadyConfirmed = !!err.error.email;
      });
  }
}
