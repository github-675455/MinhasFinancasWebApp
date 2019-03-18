import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {

  public isAutenticado = false;

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {
    this.isAutenticado = this.autenticacaoService.isAutenticado();

    this.autenticacaoService.assinaturaIsAutenticado.subscribe(e => {
      this.isAutenticado = e;
    });
  }

  ngOnDestroy() {
    this.autenticacaoService.assinaturaIsAutenticado.unsubscribe();
  }

  autenticar() {
    this.router.navigateByUrl('/autenticacao');
  }

  desconectar() {
    this.autenticacaoService.logout();
  }
}
