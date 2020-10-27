import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {PostagesService} from '../../core/api/postages.service';
import {Postage} from '../../core/models/postage';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  currentPage = 0;
  total = 0;
  postages: Postage[] = [];
  page = 1;
  loading = false;
  count = 0;
  userId: number;
  private subscription: Subscription;

  constructor(private postagesService: PostagesService,
              private cdRefs: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.parent.params.subscribe(({id}) => {
      this.userId = id;
      this.makeRequest('1');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deletePost(post: Postage): void {
    this.postagesService.destroy(post.user_id, post.id).subscribe(() => {
      this.postages = [];
      this.makeRequest('1');
    });
  }

  onScroll(): void {
    this.count++;
    if (this.count >= this.postages.length && this.postages.length > 0) {
      this.page++;
      this.makeRequest(`${this.page}`);
    }
  }

  private makeRequest(page: string): void {
    this.loading = true;
    this.postagesService.userPostages(this.userId, {page})
      .pipe(take(1))
      .subscribe(({body, headers}) => {
        this.postages = [...this.postages, ...body];
        this.total = Number(headers.get('total'));
        this.loading = false;
        this.cdRefs.detectChanges();
      });
  }

}
