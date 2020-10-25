import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';

const NG_MODULES = [
  CommonModule,
  FlexLayoutModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...NG_MODULES,
    MaterialModule
  ],
  exports: [
    ...NG_MODULES,
    MaterialModule
  ]
})
export class SharedModule {
}
