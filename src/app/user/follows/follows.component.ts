import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Follow} from '../../core/models/follow';
import {UsersService} from '../../core/api/users.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit, OnDestroy {

  follows$: Observable<Follow[]>;
  private subscription: Subscription;

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.parent.params.subscribe(({id}) => {
      this.follows$ = this.userService.follows(id).pipe(map((res) => res.body));
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
