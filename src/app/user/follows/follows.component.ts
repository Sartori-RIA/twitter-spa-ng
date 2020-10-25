import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Follow} from '../../core/models/follow';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {FollowService} from '../../core/api/follow.service';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit, OnDestroy {

  follows$: Observable<Follow[]>;
  private subscription: Subscription;

  constructor(private followService: FollowService,
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

}
