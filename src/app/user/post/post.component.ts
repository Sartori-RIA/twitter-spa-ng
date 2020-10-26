import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Postage} from '../../core/models/postage';
import {map} from 'rxjs/operators';
import {PostagesService} from '../../core/api/postages.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<Postage> = this.activatedRoute.data.pipe(map((res) => res.post));

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private postagesService: PostagesService) {
  }

  ngOnInit(): void {
  }

  deletePost(post: Postage): void {
    this.postagesService.destroy(post.user_id, post.id).subscribe(() => {
      this.router.navigate(['/usuarios', post.user_id, 'postagens']);
    });
  }
}
