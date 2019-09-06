import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estaciona } from './../models/estacionar';
import { Movimento } from './../models/movimento';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {
  API = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }

  setEstaciona(estaciona: Estaciona) {
    return this.http.post<Movimento>(this.API + '/estaciona', estaciona);
  }

  getMovimentoByVaga(id: number) {
    return this.http.get<Movimento>(this.API + '/movimentosbyvaga/' + id);
  }

  setPagarTicket(movimento: Movimento) {
    return this.http.post<Movimento>(this.API + '/pagaticket', movimento);
  }

  getMovimentoAbertoById(id: number) {
    return this.http.get<Movimento>(this.API + '/movimentoabertobyid/' + id);
  }

  getMovimentosPeriodo(dataInicial: Date, dataFinal: Date) {
    return this.http.get<Movimento[]>(this.API + '/movimentos/' + dataInicial + '/' + dataFinal);
  }
}
