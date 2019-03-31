import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './share/material.module';
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoService } from './services/autenticacao.service';
import { AutenticacaoInterceptor } from './interceptors/autenticacao-interceptor';
import { AuthGuard } from './guards/auth-guard.service';
import { SnackBarService } from './services/snack-bar.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UpdateServiceWorkerService } from './services/update-service-worker.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    LayoutsModule,
    PagesModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('sw-master.js', { enabled: environment.production })
  ],
  providers: [
    AutenticacaoService,
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true
    },
    AuthGuard,
    UpdateServiceWorkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
