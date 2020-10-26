import {NgModule} from '@angular/core';

import {SearchRoutingModule} from './search-routing.module';
import {SharedModule} from '../shared/shared.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule {
}
