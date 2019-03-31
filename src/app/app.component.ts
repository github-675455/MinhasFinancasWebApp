import { Component, ApplicationRef } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable, interval, concat } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { AskUpdateComponent } from './pages/ask-update/ask-update.component';
import { MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';
import { UpdateServiceWorkerService } from './services/update-service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isOpened = true;
  title = 'minhas-financas-webapp';
  public screenWidth: number;

  isWeb$: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appRef: ApplicationRef,
    private updates: SwUpdate,
    private dialog: MatDialog
  ) {
    if (environment.production) {
      const appIsStable$ = appRef.isStable.pipe(
        first(isStable => isStable === true)
      );
      const everySixHours$ = interval(5000);
      const everySixHoursOnceAppIsStable$ = concat(
        appIsStable$,
        everySixHours$
      );

      everySixHoursOnceAppIsStable$.subscribe(() => {
        updates.checkForUpdate();
      });

      updates.available.subscribe(event => {
        const result = this.dialog.open(AskUpdateComponent);
        result.afterClosed().subscribe(e => {
          if (e === 'true') {
            updates.activateUpdate().then(() => document.location.reload());
          }
        });
      });
    }

    this.isWeb$.subscribe(e => (this.isOpened = e.matches));

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
