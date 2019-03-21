import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccessToken } from '../model/access-token';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class AutenticacaoService {
  private accessToken = '';
  private expiration: moment.Moment;

  public assinaturaIsAutenticado = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.restoreAccessToken();
  }

  login(usuario: string, senha: string): Observable<AccessToken> {
    return this.http.post<AccessToken>(
      `${environment.API_URL}${environment.API_VERSION}usuario/autenticar`,
      { Login: usuario, Senha: senha }
    );
  }

  saveAccessToken(accessToken: AccessToken) {
    const expiresAt = moment().add(accessToken.expiresIn, 'second');
    this.accessToken = accessToken.accessToken;
    this.expiration = expiresAt;
    localStorage.setItem('access_token', accessToken.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
    this.emitAutenticado(true);
  }

  isAutenticado() {
    return typeof this.accessToken !== 'undefined' && this.accessToken !== '';
  }

  getAccessToken() {
    return this.accessToken;
  }

  emitAutenticado(autenticado: boolean) {
    return this.assinaturaIsAutenticado.next(autenticado);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.accessToken = '';
    this.emitAutenticado(false);
  }

  restoreAccessToken() {
    this.accessToken = localStorage.getItem('access_token');
    this.expiration = JSON.parse(localStorage.getItem('expires_at'));
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
