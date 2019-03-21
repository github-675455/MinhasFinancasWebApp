import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { AccessToken } from 'src/app/model/access-token';
import { SubscriptionLike } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.sass']
})
export class AutenticacaoComponent implements OnInit, OnDestroy {
  login: string;
  senha: string;
  showSpinner: boolean;
  isAutenticado: boolean;
  returnUrl: string;
  subscriptions: SubscriptionLike[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private autenticacaoService: AutenticacaoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.returnUrl = queryParams.get('returnUrl');
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  autenticar() {

    this.subscriptions.push(
      this.autenticacaoService.login(this.login, this.senha).subscribe(
        (data: AccessToken) => {
          this.autenticacaoService.saveAccessToken(data);

          if (this.returnUrl !== null) {
            this.router.navigateByUrl(`/${this.returnUrl}`);
          } else {
            this.router.navigateByUrl('/');
          }

          this.snackBar.open('Autenticado com sucesso!', 'Ignorar', {
            duration: 5000
          });
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.snackBar.open('Usuário ou senha incorretos!', 'Ignorar', {
              duration: 5000
            });
          }
        }
      )
    );
  }
}
