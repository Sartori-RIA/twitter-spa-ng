import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Postage} from '../../core/models/postage';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<Postage> = this.activatedRoute.data.pipe(map((res) => res.post));

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
