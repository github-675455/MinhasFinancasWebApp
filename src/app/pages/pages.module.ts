import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta/conta.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MaterialModule } from '../share/material.module';
import { ContaAddComponent } from './conta-add/conta-add.component';
import { ContaModalAddComponent } from './conta-modal-add/conta-modal-add.component';

@NgModule({
  declarations: [ContaComponent, UsuarioComponent, ContaAddComponent, ContaModalAddComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
   exports: [
     ContaComponent, 
     ContaModalAddComponent,
     UsuarioComponent,
     ContaAddComponent
   ],
   entryComponents: [ContaModalAddComponent]
})
export class PagesModule { }
