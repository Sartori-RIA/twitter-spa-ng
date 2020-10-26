import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
  currentPage = 0;
  total = 0;
  private subscription: Subscription;

  constructor(private postagesService: PostagesService,
              private cdRefs: ChangeDetectorRef,
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

  deletePost(post: Postage): void {
    this.postagesService.destroy(post.user_id, post.id).subscribe(() => {
      this.posts$ = this.postagesService.userPostages(post.user_id).pipe(map((res) => res.body));
      this.cdRefs.detectChanges();
    });
  }

}
