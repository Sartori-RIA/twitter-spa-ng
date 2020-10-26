import {Component, Input, OnInit} from '@angular/core';
import {Postage} from '../../../core/models/postage';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectCurrentUser} from '../../../store/auth/auth.selectors';
import {MatDialog} from '@angular/material/dialog';
import {AddPostComponent} from '../dialogs/add-post/add-post.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Postage;
  user$ = this.store.pipe(select(selectCurrentUser));

  constructor(private store: Store<AppState>,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openEditDialog(): void {
    this.dialog.open(AddPostComponent, {
      data: this.post,
      minWidth: '50vh'
    });
  }
}
