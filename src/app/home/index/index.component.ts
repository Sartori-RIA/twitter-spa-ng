import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {PostagesService} from '../../core/api/postages.service';
import {Postage} from '../../core/models/postage';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  postages: Postage[] = [];
  page = 1;
  total = 0;
  loading = false;
  count = 0;

  constructor(private postagesService: PostagesService) {
  }

  ngOnInit(): void {
    this.makeRequest('1');
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
    this.postagesService.index({page})
      .pipe(take(1))
      .subscribe(({body, headers}) => {
        this.postages = [...this.postages, ...body];
        this.total = Number(headers.get('total'));
        this.loading = false;
      });
  }
}
