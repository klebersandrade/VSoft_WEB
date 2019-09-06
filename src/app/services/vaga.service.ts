import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Vaga } from './../models/vaga';
import { VagasQtd } from './../models/vagas-qtd';
import { VagaSituacao } from './../models/vaga-situacao';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  API = environment.apiUrl;
  constructor(
    private http: HttpClient,
    ) { }

  getVagas() {
    return this.http.get<Vaga[]>(this.API + '/vagas');
  }

  getVagasById(id: number) {
    return this.http.get<Vaga>(this.API + '/vagas/' + id);
  }

  setVagas(vaga: Vaga) {
    return this.http.post<Vaga>(this.API + '/vagas', vaga);
  }

  getQtdVagas() {
    return this.http.get<VagasQtd>(this.API + '/vagas/qtdvagas');
  }

  getVagasSituacoes() {
    return this.http.get<VagaSituacao[]>(this.API + '/vagas/situacoes');
  }
}
