import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaCrudComponent } from './vaga-crud.component';

describe('VagaCrudComponent', () => {
  let component: VagaCrudComponent;
  let fixture: ComponentFixture<VagaCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagaCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
