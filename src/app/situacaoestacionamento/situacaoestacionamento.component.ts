import { Component, OnInit } from '@angular/core';
import { VagaService } from './../services/vaga.service';
import { VagaSituacao } from '../models/vaga-situacao';
import { exportHTMLToPdf, printToPdf } from '../helpers/helpers';

@Component({
  selector: 'app-situacaoestacionamento',
  templateUrl: './situacaoestacionamento.component.html',
  styleUrls: ['./situacaoestacionamento.component.css']
})
export class SituacaoestacionamentoComponent implements OnInit {
  situacoes: VagaSituacao[] = [];
  constructor(
    private vagaService: VagaService
  ) { }

  ngOnInit() {
    this.vagaService.getVagasSituacoes().subscribe(
      (situacoes) => {
        this.situacoes = situacoes;
      }
    );
  }

  exportPDF() {
    const dadosPDF = this.situacoes.map((situacao: VagaSituacao) => {
      return {
        vaga: situacao.vaga.numero,
        status: situacao.vaga.status,
        dataEntrada: (situacao.movimento ? situacao.movimento.dataEntrada : ''),
        descricao: (situacao.movimento ? situacao.movimento.cliente.descricao : ''),
        placa: (situacao.movimento ? situacao.movimento.cliente.placa : '')
      };
    });
    exportHTMLToPdf(dadosPDF, ['Vaga', 'Status', 'Data Entrada', 'Cliente', 'Placa'], false);
  }

  print() {
    const dadosPDF = this.situacoes.map((situacao: VagaSituacao) => {
      return {
        vaga: situacao.vaga.numero,
        status: situacao.vaga.status,
        dataEntrada: (situacao.movimento ? situacao.movimento.dataEntrada : ''),
        descricao: (situacao.movimento ? situacao.movimento.cliente.descricao : ''),
        placa: (situacao.movimento ? situacao.movimento.cliente.placa : '')
      };
    });
    const file = exportHTMLToPdf(dadosPDF, ['Vaga', 'Status', 'Data Entrada', 'Cliente', 'Placa'], true);
    printToPdf(file);
  }

}
