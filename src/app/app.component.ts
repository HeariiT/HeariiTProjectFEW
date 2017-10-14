import { Component } from '@angular/core';
import { GlobalDataService } from './services/global-data.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor( private gbService: GlobalDataService, private sessionService: SessionService) { }
}
