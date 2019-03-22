import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { LoginResponse } from 'src/app/model/login-response';
import { SubscriptionLike } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.sass']
})
export class AutenticacaoComponent implements OnInit {
  login: string;
  senha: string;
  showSpinner: boolean;
  isAutenticado: boolean;
  returnUrl: string;
  subscriptions: SubscriptionLike[] = [];
  autenticarForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private autenticacaoService: AutenticacaoService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder
  ) {
    this.autenticarForm = this.formBuilder.group({
      login: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z0-9_-]{3,256}')]
      ],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.returnUrl = queryParams.get('returnUrl');
    });
  }

  getServerErrors() {
    return this.autenticarForm.get('senha').errors.serverError;
  }

  autenticarOnEnter() {
    this.autenticar();
  }

  autenticar() {
    if (this.autenticarForm.invalid) {
      return;
    }

    this.autenticacaoService
      .login(
        this.autenticarForm.controls.login.value,
        this.autenticarForm.controls.senha.value
      )
      .subscribe(
        (data: LoginResponse) => {
          this.autenticacaoService.saveAccessToken(data);

          if (data.errors.length === 0) {
            if (this.returnUrl !== null) {
              this.router.navigateByUrl(`/${this.returnUrl}`);
            } else {
              this.router.navigateByUrl('/');
            }

            this.snackBarService.show('Autenticado com sucesso!', 'Ignorar');
          } else {
            data.errors.forEach(item => {
              const formControl = this.autenticarForm.get('senha');
              if (formControl) {
                formControl.setErrors({
                  serverError: item.description
                }, {emitEvent: true});
              }
            });
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.snackBarService.show(
              'Usuário ou senha incorretos!',
              'Ignorar'
            );
          }
        }
      );
  }
}
