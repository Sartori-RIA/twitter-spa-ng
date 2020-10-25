import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
import {FollowTitles} from '../../../core/models/follow';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Input() title: FollowTitles;

  constructor() {
  }

  ngOnInit(): void {
  }

}
