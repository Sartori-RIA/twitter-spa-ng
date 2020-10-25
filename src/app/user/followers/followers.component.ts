import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Follow} from '../../core/models/follow';
import {map} from 'rxjs/operators';
import {FollowService} from '../../core/api/follow.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit, OnDestroy {

  followers$: Observable<Follow[]>;
  private subscription: Subscription;

  constructor(private followService: FollowService,
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

}
