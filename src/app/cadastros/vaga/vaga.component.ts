import { Component, OnInit, OnDestroy } from '@angular/core';
import { VagaService } from './../../services/vaga.service';
import { Vaga } from './../../models/vaga';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  styleUrls: ['./vaga.component.css']
})
export class VagaComponent implements OnInit, OnDestroy {
  vagas: Vaga[];
  subject: Subscription;
  constructor(
    private vagaService: VagaService
  ) { }

  ngOnInit() {
    console.log(1);
    this.subject = this.vagaService.getVagas().subscribe(
      (vagas) => {
        this.vagas = vagas;
      }
    );
  }

  ngOnDestroy() {
    if (this.subject) {
      this.subject.unsubscribe();
    }
  }

}
