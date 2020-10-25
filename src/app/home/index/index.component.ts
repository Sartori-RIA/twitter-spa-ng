import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {PostagesService} from '../../core/api/postages.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  postages$ = this.postagesService.index().pipe(map((r) => r.body));

  constructor(private postagesService: PostagesService) {
  }

  ngOnInit(): void {
  }

}
