import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FollowTitles} from '../../../../core/models/follow';

@Component({
  selector: 'app-follow-btn',
  templateUrl: './follow-btn.component.html',
  styleUrls: ['./follow-btn.component.scss']
})
export class FollowBtnComponent implements OnInit {

  @Input() title: FollowTitles;
  @Output() followClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
