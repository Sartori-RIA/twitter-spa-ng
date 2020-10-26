import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../core/models/user';
import {FollowTitles} from '../../../core/models/follow';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Input() shotBtn = true;
  @Input() title: FollowTitles;
  @Output() followUser = new EventEmitter<User>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  openProfile(): void {
    this.router.navigate(['/usuarios', this.user.id, 'postagens']);
  }

  onFollowClick(): void {
    this.followUser.emit(this.user);
  }
}
