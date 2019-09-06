import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';

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
import { VagaCrudComponent } from './cadastros/vaga-crud/vaga-crud.component';
import { VagaService } from './services/vaga.service';
import { NumberDirective } from './directives/only-number.directive';
import { DataTablesModule } from 'angular-datatables';
import { EstacionarComponent } from './estacionar/estacionar.component';
import { PagarComponent } from './pagar/pagar.component';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt-BR', localePtExtra);

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
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    OperacaoComponent,
    SituacaoestacionamentoComponent,
    MovimentoperiodoComponent,
    VagaComponent,
    VagaCrudComponent,
    NumberDirective,
    EstacionarComponent,
    PagarComponent
  ],
  providers: [
    VagaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
