import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  options: AnimationOptions = {
    path: '/assets/animations/loading.json',
  };

}
