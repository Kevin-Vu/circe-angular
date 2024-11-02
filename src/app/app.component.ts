import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'circe-angular';

  constructor(public translate: TranslateService){
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
  }

}
