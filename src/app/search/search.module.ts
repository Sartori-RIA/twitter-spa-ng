import {NgModule} from '@angular/core';

import {SearchRoutingModule} from './search-routing.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule {
}
