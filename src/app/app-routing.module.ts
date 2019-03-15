import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaComponent } from './pages/conta/conta.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ContaAddComponent } from './pages/conta-add/conta-add.component';

const routes: Routes = [
  { path: 'conta', component: ContaComponent },
  { path: 'conta/adicionar', component: ContaAddComponent },  
  { path: 'usuario', component: UsuarioComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
