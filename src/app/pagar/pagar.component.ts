import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovimentoService } from './../services/movimento.service';
import { Movimento } from './../models/movimento';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit, OnDestroy {
  movimento: Movimento;
  subscriber: Subscription;

  valorPermanencia = '';
  qtdHorasExtras = '';
  valorHorasExtras = '';
  valorTotal = '';
  constructor(
    private movimentoService: MovimentoService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.movimento = {
      cliente: {
        placa: '',
        descricao: '',
        id: 0
      },
      vaga: {
        id: 0,
        numero: '',
        status: ''
      }
    };

    this.subscriber = this.route.params.subscribe(
      (parametros) => {
        this.movimentoService.getMovimentoAbertoById(parametros.id).subscribe((movimento) => {
          this.movimento = movimento;
          this.valorPermanencia = 'R$ ' + movimento.valorPermanencia.toFixed(2).replace(/./g, (c, i, a) => {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });

          this.qtdHorasExtras = movimento.qtdHorasExtras.toString();

          this.valorHorasExtras = 'R$ ' + movimento.valorHorasExtras.toFixed(2).replace(/./g, (c, i, a) => {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });

          this.valorTotal = 'R$ ' + movimento.valorTotal.toFixed(2).replace(/./g, (c, i, a) => {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });
        },
          (error: HttpErrorResponse) => {
            this.toastr.error('Erro', 'Erro ao estacionar na Vaga: \n' + error.error.message);
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
    this.movimentoService.setPagarTicket(this.movimento).subscribe(
      () => {
        this.toastr.success('Confirmação', 'Estacionamento pago com Sucesso!');
        this.router.navigate(['/operacao']);
      },
      (erro: HttpErrorResponse) => {
        this.toastr.error('Erro', 'Erro ao pagar na Vaga: \n' + erro.error.message);
      }
    );
  }

}
