import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VagaService } from './../services/vaga.service';
import { VagaSituacao } from './../models/vaga-situacao';

@Component({
  selector: 'app-operacao',
  templateUrl: './operacao.component.html',
  styleUrls: ['./operacao.component.css']
})
export class OperacaoComponent implements OnInit, OnDestroy {
  vagasSituacoes: VagaSituacao[] = [];
  qtdVagas: number;
  qtdVagasDisponiveis: number;
  subject: Subscription;
  constructor(
    private vagaService: VagaService
  ) { }

  ngOnInit() {
    this.subject = this.vagaService.getVagasSituacoes().subscribe(
      (vagas) => {
        this.vagasSituacoes = vagas;
        this.vagasSituacoes.forEach(situacao => {
          if (situacao.movimento) {
            situacao.movimento.dataEntrada = new Date(situacao.movimento.dataEntrada);
          }
        });
        this.qtdVagas = vagas.length;
        this.qtdVagasDisponiveis = vagas.filter(x => x.vaga.status === 'LIVRE').length;
      }
    );
  }

  ngOnDestroy() {
    if (this.subject) {
      this.subject.unsubscribe();
    }
  }

}
