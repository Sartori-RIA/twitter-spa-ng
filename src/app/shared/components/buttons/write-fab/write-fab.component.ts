import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddPostComponent} from '../../dialogs/add-post/add-post.component';

@Component({
  selector: 'app-write-fab',
  templateUrl: './write-fab.component.html',
  styleUrls: ['./write-fab.component.scss']
})
export class WriteFabComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(AddPostComponent, {
      minWidth: '50vh'
    });
  }
}
