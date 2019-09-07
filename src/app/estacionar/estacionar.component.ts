import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VagaService } from './../services/vaga.service';
import { Vaga } from './../models/vaga';
import { Cliente } from './../models/cliente';
import { Estaciona } from './../models/estacionar';
import { MovimentoService } from './../services/movimento.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-estacionar',
  templateUrl: './estacionar.component.html',
  styleUrls: ['./estacionar.component.css']
})
export class EstacionarComponent implements OnInit, OnDestroy {
  subscriber: Subscription;
  vagaSelecionada: Vaga;
  placaUnmasked: string;
  cliente: Cliente;
  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private movimentoService: MovimentoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.placaUnmasked = '';
    $('#placa').inputmask({ mask: 'AAA-9999' });
    this.cliente = {
      descricao: '',
      id: 0,
      placa: ''
    };

    // $('#placa').keypress((e) => {
    //   const valor: string = $('#placa').inputmask('unmaskedvalue');
    //   this.placaUnmasked = valor;
    //   console.log(this.placaUnmasked);
    //   if (valor.trim() === '' && valor.length < 7) {
    //     this.cliente.placa = null;
    //   } else {
    //     this.cliente.placa = $('#placa').val();
    //   }

    // });

    $('#placa').keyup((e) => {
      const valor: string = $('#placa').inputmask('unmaskedvalue');
      this.placaUnmasked = valor;
      if (valor.trim() === '' && valor.length < 7) {
        this.cliente.placa = null;
      } else {
        this.cliente.placa = $('#placa').val();
      }

    });

    this.vagaSelecionada = {
      id: 0,
      numero: '',
      status: ''
    };
    this.subscriber = this.route.params.subscribe(
      (parametros) => {
        this.vagaService.getVagasById(parametros.id).subscribe((vaga) => {
          this.vagaSelecionada = vaga;
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  voltar() {
    this.router.navigate(['/operacao']);
  }


  onSubmitForm() {
    const estaciona: Estaciona = {
      clienteDescricao: this.cliente.descricao,
      clientePlaca: this.cliente.placa,
      vagaNumero: this.vagaSelecionada.numero
    };

    this.movimentoService.setEstaciona(estaciona).subscribe(
      () => {
        this.toastr.success('Confirmação', 'Estacionamento realizado com Sucesso!');
        this.router.navigate(['/operacao']);
      },
      (erro: HttpErrorResponse) => {
        this.toastr.error('Erro', 'Erro ao estacionar na Vaga: \n' + erro.error.message);
      }
    );
  }

  placaChange(ctPlaca) {
    console.log(ctPlaca);
  }

}
