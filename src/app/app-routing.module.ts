import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OperacaoComponent } from './operacao/operacao.component';
import { SituacaoestacionamentoComponent } from './situacaoestacionamento/situacaoestacionamento.component';
import { MovimentoperiodoComponent } from './movimentoperiodo/movimentoperiodo.component';
import { VagaComponent } from './cadastros/vaga/vaga.component';
import { VagaCrudComponent } from './cadastros/vaga-crud/vaga-crud.component';
import { EstacionarComponent } from './estacionar/estacionar.component';
import { PagarComponent } from './pagar/pagar.component';

const routes: Routes = [
  {
    path: 'cadastros',
    children: [
      {
        path: 'vagas',
        component: VagaComponent
      },
      {
        path: 'vagas_crud',
        component: VagaCrudComponent,
      }
    ]
  }, {
    path: 'operacao',
    component: OperacaoComponent
  }, {
    path: 'estacionar/:id',
    component: EstacionarComponent
  }, {
    path: 'pagar/:id',
    component: PagarComponent
  }, {
    path: 'relatorios',
    children: [
      {
        path: 'situacaoestacionamento',
        component: SituacaoestacionamentoComponent,
      }, {
        path: 'movimentoperiodo',
        component: MovimentoperiodoComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
