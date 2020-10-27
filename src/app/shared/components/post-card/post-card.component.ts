import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Postage} from '../../../core/models/postage';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectCurrentUser} from '../../../store/auth/auth.selectors';
import {MatDialog} from '@angular/material/dialog';
import {AddPostComponent} from '../dialogs/add-post/add-post.component';
import {User} from '../../../core/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Postage;
  @Output() onRemove = new EventEmitter<Postage>();

  user$ = this.store.pipe(select(selectCurrentUser));

  constructor(private store: Store<AppState>,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  destroyPostage(): void {
    this.onRemove.emit(this.post);
  }

  openEditDialog(): void {
    this.dialog.open(AddPostComponent, {
      data: this.post,
      minWidth: '50vh'
    });
  }

  openUser(user: User): void {
    this.router.navigate(['/usuarios/', user.id, 'postagens']);
  }

  openPostage(post: Postage): void {
    this.router.navigate(['/usuarios/', post.user_id, 'postagens', post.id]);
  }
}
