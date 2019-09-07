import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovimentoService } from './../services/movimento.service';
import { Movimento } from './../models/movimento';
import { Subscription } from 'rxjs';
import { exportTableToCSV, exportTableToXLSX, exportHTMLToPdf, printToPdf, GoOutFullscreen, goInFullscreen } from '../helpers/helpers';
import { IsFullScreenCurrently } from './../helpers/helpers';

import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-movimentoperiodo',
  templateUrl: './movimentoperiodo.component.html',
  styleUrls: ['./movimentoperiodo.component.css']
})
export class MovimentoperiodoComponent implements OnInit, OnDestroy {
  qtdTotMovimentos: number;
  qtdTotHorasExtras: number;
  valorTotHorasExtras: string;
  valorTotal: string;
  movimentos: Movimento[];
  datasFiltroInicial: string;
  datasFiltroFinal: string;
  subscript: Subscription;
  constructor(
    private movimentoService: MovimentoService
  ) { }

  ngOnInit() {
    $('#datasFiltroInicial').datepicker({
      autoclose: true,
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    });
    $('#datasFiltroInicial').inputmask('99/99/9999', { placeholder: 'dd/mm/aaaa' });

    $('#datasFiltroFinal').datepicker({
      autoclose: true,
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    });
    $('#datasFiltroFinal').inputmask('99/99/9999', { placeholder: 'dd/mm/aaaa' });

    $('#datasFiltroInicial').datepicker('setDate', 'today');
    $('#datasFiltroFinal').datepicker('setDate', 'today');

    this.subscript = this.movimentoService.getMovimentosPeriodo(new Date(), new Date()).subscribe(
      (movimentos) => {
        this.movimentos = movimentos;

        this.qtdTotMovimentos = this.movimentos.length;
        this.qtdTotHorasExtras = 0;
        let total = 0.000;
        let totalExtras = 0.000;
        this.movimentos.forEach(movimento => {
          this.qtdTotHorasExtras += movimento.qtdHorasExtras;
          totalExtras += movimento.valorHorasExtras;
          total += movimento.valorTotal;
        });

        this.valorTotal = this.formatarMoeda(total);
        this.valorTotHorasExtras = this.formatarMoeda(totalExtras);
      }
    );
  }

  filtrar() {
    this.datasFiltroInicial = $('#datasFiltroInicial').datepicker('getDate');
    this.datasFiltroFinal = $('#datasFiltroFinal').datepicker('getDate');
    this.subscript = this.movimentoService.getMovimentosPeriodo(new Date(this.datasFiltroInicial),
      new Date(this.datasFiltroFinal)).subscribe(
        (movimentos) => {
          this.movimentos = movimentos;

          this.qtdTotMovimentos = this.movimentos.length;
          this.qtdTotHorasExtras = 0;
          let total = 0.000;
          let totalExtras = 0.000;
          this.movimentos.forEach(movimento => {
            this.qtdTotHorasExtras += movimento.qtdHorasExtras;
            totalExtras += movimento.valorHorasExtras;
            total += movimento.valorTotal;
          });

          this.valorTotal = this.formatarMoeda(total);
          this.valorTotHorasExtras = this.formatarMoeda(totalExtras);
        }
      );
  }

  ngOnDestroy() {
    if (this.subscript) {
      this.subscript.unsubscribe();
    }
  }

  formatarMoeda(valor: number) {
    return valor.toFixed(2).replace(/./g, (c, i, a) => {
      return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
    });
  }



  exportPDF() {
    const dadosPDF = this.movimentos.map((movimento: Movimento) => {
      return {
        ocupada: movimento.vaga.status === 'LIVRE' ? 'NÃO' : 'SIM',
        dataEntrada: moment(movimento.dataEntrada).format('DD/MM/YYYY hh:mm:ss'),
        dataSaida: (movimento.dataSaida ? moment(movimento.dataSaida).format('DD/MM/YYYY hh:mm:ss') : ''),
        vaga: movimento.vaga.numero,
        descricao: movimento.cliente.descricao,
        placa: movimento.cliente.placa,
        valor: movimento.valorTotal.toFixed(2)
      };
    });
    dadosPDF.push({
      ocupada: this.qtdTotMovimentos.toFixed(0),
      dataEntrada: '',
      dataSaida: '',
      vaga: '',
      descricao: '',
      placa: '',
      valor: this.valorTotal
    });
    exportHTMLToPdf(dadosPDF, ['Ocupada?', 'Data Entrada', 'Data Saída', 'Vaga', 'Descrição', 'Placa', 'Valor'], false, true);
  }

  print() {
    const dadosPDF = this.movimentos.map((movimento: Movimento) => {
      return {
        ocupada: movimento.vaga.status === 'LIVRE' ? 'NÃO' : 'SIM',
        dataEntrada: moment(movimento.dataEntrada).format('DD/MM/YYYY hh:mm:ss'),
        dataSaida: (movimento.dataSaida ? moment(movimento.dataSaida).format('DD/MM/YYYY hh:mm:ss') : ''),
        vaga: movimento.vaga.numero,
        descricao: movimento.cliente.descricao,
        placa: movimento.cliente.placa,
        valor: movimento.valorTotal.toFixed(2)
      };
    });
    dadosPDF.push({
      ocupada: this.qtdTotMovimentos.toFixed(0),
      dataEntrada: '',
      dataSaida: '',
      vaga: '',
      descricao: '',
      placa: '',
      valor: this.valorTotal
    });
    const file = exportHTMLToPdf(dadosPDF, ['Ocupada?', 'Data Entrada', 'Data Saída', 'Vaga', 'Descrição', 'Placa', 'Valor'], true, true);
    printToPdf(file);
  }

}
