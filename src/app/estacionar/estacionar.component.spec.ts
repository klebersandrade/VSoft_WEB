import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionarComponent } from './estacionar.component';

describe('EstacionarComponent', () => {
  let component: EstacionarComponent;
  let fixture: ComponentFixture<EstacionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
