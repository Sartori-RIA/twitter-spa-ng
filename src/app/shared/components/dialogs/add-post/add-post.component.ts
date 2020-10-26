import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Postage} from '../../../../core/models/postage';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  form: FormGroup = this.fb.group({
    content: [null, [Validators.required, Validators.maxLength(255)]]
  });

  constructor(public dialogRef: MatDialogRef<AddPostComponent>,
              private fb: FormBuilder,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: Postage) {
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onSubmit(): void {
    if (this.form.valid) {

    }
    this.form.markAllAsTouched();
  }

  private updateForm(): void {
    this.form.patchValue({
      content: this.data.content
    });
  }
}
