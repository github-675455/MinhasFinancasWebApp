import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaComponent } from './pages/conta/conta.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ContaAddComponent } from './pages/conta-add/conta-add.component';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';
import { StatusComponent } from './pages/status/status.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: 'conta', component: ContaComponent, canActivate: [AuthGuard]},
  { path: 'conta/adicionar', component: ContaAddComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'autenticacao', component: AutenticacaoComponent },
  { path: 'status', component: StatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
