import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta/conta.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MaterialModule } from '../share/material.module';
import { ContaAddComponent } from './conta-add/conta-add.component';

@NgModule({
  declarations: [ContaComponent, UsuarioComponent, ContaAddComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
   exports: [
     ContaComponent, 
     UsuarioComponent,
     ContaAddComponent
   ]
})
export class PagesModule { }
