import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {AvatarModule} from 'ngx-avatar';

const NG_MODULES = [
  CommonModule,
  FlexLayoutModule,
  ReactiveFormsModule,
];

const LIBS_MODULES = [
  AvatarModule
];

@NgModule({
  declarations: [],
  imports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    MaterialModule
  ],
  exports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    MaterialModule
  ]
})
export class SharedModule {
}
