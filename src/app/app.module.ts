import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { adminLteConf } from './admin-lte.conf';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LayoutModule } from 'angular-admin-lte';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { OperacaoComponent } from './operacao/operacao.component';
import { SituacaoestacionamentoComponent } from './situacaoestacionamento/situacaoestacionamento.component';
import { MovimentoperiodoComponent } from './movimentoperiodo/movimentoperiodo.component';

import { InputGroupModule, InputTextModule as mkInputTextModule, BoxInfoModule as MkBoxInfoModule } from 'angular-admin-lte';
import { VagaComponent } from './cadastros/vaga/vaga.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, MaterialBarModule,
    InputGroupModule,
    mkInputTextModule,
    MkBoxInfoModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    OperacaoComponent,
    SituacaoestacionamentoComponent,
    MovimentoperiodoComponent,
    VagaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
