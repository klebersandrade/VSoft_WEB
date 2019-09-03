import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacaoestacionamentoComponent } from './situacaoestacionamento.component';

describe('SituacaoestacionamentoComponent', () => {
  let component: SituacaoestacionamentoComponent;
  let fixture: ComponentFixture<SituacaoestacionamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituacaoestacionamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacaoestacionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
