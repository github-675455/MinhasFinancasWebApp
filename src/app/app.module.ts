import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './share/material.module';
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    LayoutsModule,
    PagesModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
