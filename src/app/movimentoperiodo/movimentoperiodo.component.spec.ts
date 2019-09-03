import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoperiodoComponent } from './movimentoperiodo.component';

describe('MovimentoperiodoComponent', () => {
  let component: MovimentoperiodoComponent;
  let fixture: ComponentFixture<MovimentoperiodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentoperiodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentoperiodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
