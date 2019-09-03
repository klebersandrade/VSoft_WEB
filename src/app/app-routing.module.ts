import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OperacaoComponent } from './operacao/operacao.component';
import { SituacaoestacionamentoComponent } from './situacaoestacionamento/situacaoestacionamento.component';
import { MovimentoperiodoComponent } from './movimentoperiodo/movimentoperiodo.component';
import { VagaComponent } from './cadastros/vaga/vaga.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }, {
    path: 'cadastros',
    children: [
      {
        path: 'vagas',
        component: VagaComponent,
      },
    ]
  }, {
    path: 'operacao',
    component: OperacaoComponent
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
