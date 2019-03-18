import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.sass']
})
export class StatusComponent implements OnInit, OnDestroy {
  status = '';
  isActive = false;
  private subscribe: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.atualizarStatus();

    this.subscribe = interval(10000).subscribe(val => {
      this.atualizarStatus();
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  atualizarStatus() {
    this.http.get(`${environment.API_URL}health`).subscribe(
      (data: any) => {
        if (data.status === 'Healthy') {
          this.status = 'Funcionando normalmente';
          this.isActive = true;
        } else {
          this.status = 'Indisponível';
          this.isActive = false;
        }
      },
      (error: any) => {
        this.status = 'Indisponível';
        this.isActive = false;
      }
    );
  }
}
