import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vaga } from './../../models/vaga';
import { VagaService } from './../../services/vaga.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-vaga-crud',
  templateUrl: './vaga-crud.component.html',
  styleUrls: ['./vaga-crud.component.css']
})
export class VagaCrudComponent implements OnInit, OnDestroy {
  vagaForm: FormGroup;
  subject: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private vagaService: VagaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.vagaForm = this.formBuilder.group({
      numero: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    if (this.subject) {
      this.subject.unsubscribe();
    }
  }

  onSubmitForm() {
    const vaga: Vaga = {
      id: 0,
      numero: ('000' + (this.vagaForm.controls['numero'].value as string)).slice(-3),
      status: 'LIVRE'
    };

    this.subject = this.vagaService.setVagas(vaga).subscribe(
      () => {
        this.toastr.success('Confirmação', 'Vaga salva com Sucesso!');
        this.router.navigate(['/cadastros/vagas']);
      },
      (erro: HttpErrorResponse) => {
        this.toastr.error('Erro', 'Erro ao salvar a Vaga: \n' + erro.error.message);
      }
    );
  }

  voltar() {
    this.router.navigate(['/cadastros/vagas']);
  }

}
