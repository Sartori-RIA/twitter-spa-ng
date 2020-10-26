import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../core/api/users.service';
import {Observable} from 'rxjs';
import {User} from '../../core/models/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  search: string;
  users$: Observable<User[]>;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
  }

  onChange(): void {
    this.users$ = this.userService.search(this.search);
  }
}
