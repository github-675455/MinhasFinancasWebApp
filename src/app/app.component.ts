import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isOpened = true;
  title = 'minhas-financas-webapp';
  public screenWidth: number;

  constructor(private breakpointObserver: BreakpointObserver) {

    this.screenWidth = window.innerWidth;

    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  isMobile() {
    return this.screenWidth > 840;
  }

  isMobileSidenavMode() {
    return this.isMobile() ? 'side' : 'over';
  }
}
