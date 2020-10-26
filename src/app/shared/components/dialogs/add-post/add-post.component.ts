import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Postage} from '../../../../core/models/postage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostagesService} from '../../../../core/api/postages.service';
import {AppState} from '../../../../store';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../../store/auth/auth.selectors';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  user$ = this.store.pipe(select(selectCurrentUser));

  form: FormGroup = this.fb.group({
    content: [null, [Validators.required, Validators.maxLength(255)]]
  });

  constructor(public dialogRef: MatDialogRef<AddPostComponent>,
              private fb: FormBuilder,
              private store: Store<AppState>,
              private postageService: PostagesService,
              @Inject(MAT_DIALOG_DATA) public data: Postage) {
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.user$.pipe(take(1)).subscribe((user) => {
        const values = this.form.value;
        let obs: Observable<Postage>;
        if (this.data) {
          obs = this.postageService.update(user.id, {content: values.content});
        } else {
          obs = this.postageService.create(user.id, {content: values.content});
        }
        obs.subscribe(() => this.dialogRef.close());
      });

    }
    this.form.markAllAsTouched();
  }

  private updateForm(): void {
    this.form.patchValue({
      content: this.data?.content
    });
  }
}
