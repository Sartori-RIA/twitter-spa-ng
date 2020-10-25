import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {PostagesService} from '../../core/api/postages.service';
import {Postage} from '../../core/models/postage';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts$: Observable<Postage[]>;
  private subscription: Subscription;

  constructor(private postagesService: PostagesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.parent.params.subscribe(({id}) => {
      this.posts$ = this.postagesService.userPostages(id).pipe(map((res) => res.body));
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
